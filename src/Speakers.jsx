import React, { useState, useEffect, useContext, useReducer, useCallback, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/site.css";
import { Header } from "../src/Header";
import { Menu } from "../src/Menu";
import SpeakerData from "./SpeakerData.js";
import SpeakerDetail from "./SpeakerDetail.jsx";
import { ConfigContext } from './App.jsx';

// four useState calls
const Speakers = ({}) => {
  const [speakingSaturday, setSpeakingSaturday] = useState(true);
  const [speakingSunday, setSpeakingSunday] = useState(true);

// const [speakerList, setSpeakerList] = useState([]);
// create a switch statement based on the passed in action type 
// if action type is setSpeakerList, then the reducer returns action.data
// as the new state
// else, by default, have the reducer return the current state of whatever was passed in
const speakersReducer = (state, action) => {
    const updateFavorite = (favoriteValue) => {
        return state.map((item, index) => {
            if(item.id === action.sessionId) {
                item.favorite = favoriteValue
                return item
            }
            return item
        })
    }
    switch (action.type) {
        case "setSpeakerList": {
            return action.data
        }
        // making a common function above in speakerReducer to call below (updateFavorite)
        case "favorite": {
            return updateFavorite(true)
        }
        case "unfavorite": {
            return updateFavorite(false)
        }
        default:
            return state
    }
};

// make reducer more practical and most importantly, more extensible 
  const [speakerList, dispatch] = useReducer(speakersReducer, [])
  const [isLoading, setIsLoading] = useState(true)

  // reference to context with useContext Hook
  const context = useContext(ConfigContext);


  // useEffect simulates calling an outside service with a 1 second delay
  // on completion, filters and sorts data ready to be rendered
  useEffect(() => {
    setIsLoading(true);
    new Promise(function(resolve) {
      setTimeout(function() {
        resolve();
      }, 1000);
    }).then(() => {
      setIsLoading(false);
      const speakerListServerFilter = SpeakerData.filter(({ sat, sun }) => {
        return (speakingSaturday && sat) || (speakingSunday && sun);
      });
    //   setSpeakerList(speakerListServerFilter);
    // first param is an object type with the attribute type is setSpeakerList
    // data set to array containing all the speakers 
    // this matches with reducer so when the reducer gets called by dispatch
    // method the new state is returned--the data passed in as the data 
    // attribute to the action object 
    dispatch({
        type: "setSpeakerList",
        data: speakerListServerFilter
        })
    });
    return () => {
      console.log("cleanup");
    };
  }, []); // [speakingSunday, speakingSaturday]);

  const handleChangeSaturday = () => {
    setSpeakingSaturday(!speakingSaturday);
  };

  const newSpeakerList = useMemo(() => speakerList
    .filter(
        ({ sat, sun }) => (speakingSaturday && sat) || (speakingSunday && sun)
    )
    .sort(function(a, b) {
        if (a.firstName < b.firstName) {
          return -1;
        }
        if (a.firstName > b.firstName) {
          return 1;
        }
        return 0;
      })
    
    )

  const speakerListFiltered = isLoading
    ? []
    : newSpeakerList;

  const handleChangeSunday = () => {
    setSpeakingSunday(!speakingSunday);
  };
// replacing setSpeakerList call with a dispatch call that requires an action type 
// memoized heartFavoriteHandler via useCallback so that React won't re-render it
  const heartFavoriteHandler = useCallback((e, favoriteValue) => {
    e.preventDefault();
    const sessionId = parseInt(e.target.attributes["data-sessionid"].value);
    // adding a dispatch invocation to heartFavoriteHandler
    dispatch({
        type: favoriteValue === true ? "favorite" : "unfavorite",
        sessionId
        });
    }, []);

    // setSpeakerList(speakerList.map(item => {
    //   if (item.id === sessionId) {
    //     item.favorite = favoriteValue;
    //     return item;
    //   }
    //   return item;
    // }));
    //console.log("changing session favorte to " + favoriteValue);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <Menu />
      <div className="container">
        <div className="btn-toolbar  margintopbottom5 checkbox-bigger">
          {context.showSpeakerSpeakingDays === false ? null : (
          <div className="hide">
            <div className="form-check-inline">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  className="form-check-input"
                  onChange={handleChangeSaturday}
                  checked={speakingSaturday}
                />
                Saturday Speakers
              </label>
            </div>
            <div className="form-check-inline">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  className="form-check-input"
                  onChange={handleChangeSunday}
                  checked={speakingSunday}
                />
                Sunday Speakers
              </label>
            </div>
          </div>
          )}
        </div>
        <div className="row">
          <div className="card-deck">
            {speakerListFiltered.map(
              ({ id, firstName, lastName, bio, favorite }) => {
                return (
                  <SpeakerDetail
                    key={id}
                    id={id}
                    favorite={favorite}
                    onHeartFavoriteHandler={heartFavoriteHandler}
                    firstName={firstName}
                    lastName={lastName}
                    bio={bio}
                  />
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Speakers;
