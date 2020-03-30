import React, { useState, useContext, useCallback, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/site.css";
import { Header } from "./Header";
import { Menu } from "./Menu";
import SpeakerDetail from "./SpeakerDetail.jsx";
import { ConfigContext } from "./App.jsx";
import UseAxiosFetch from "./UseAxiosFetch.jsx";
import axios from "axios";

const Speakers = ({}) => {
  // invoke UseAxiosFetch
  // localhost:4000 server returns json data for dev purposes only
  const {
    data,
    isLoading,
    hasErrored,
    errorMessage,
    updateDataRecord
  } = UseAxiosFetch("http://localhost:4000/speakers", []);

  const [speakingSaturday, setSpeakingSaturday] = useState(true);
  const [speakingSunday, setSpeakingSunday] = useState(true);
  // make reducer more practical and most importantly, more extensible
  // const [speakerList, dispatch] = useReducer(speakersReducer, [])
  // const [isLoading, setIsLoading] = useState(true)

  // reference to context with useContext Hook
  const context = useContext(ConfigContext);

  // useEffect simulates calling an outside service with a 1 second delay
  // on completion, filters and sorts data ready to be rendered
  // useEffect(() => {
  //   setIsLoading(true);
  //   new Promise(function(resolve) {
  //     setTimeout(function() {
  //       resolve();
  //     }, 1000);
  //   }).then(() => {
  //     setIsLoading(false);
  //     const speakerListServerFilter = SpeakerData.filter(({ sat, sun }) => {
  //       return (speakingSaturday && sat) || (speakingSunday && sun);
  //     });
  //   //   setSpeakerList(speakerListServerFilter);
  //   // first param is an object type with the attribute type is setSpeakerList
  //   // data set to array containing all the speakers
  //   // this matches with reducer so when the reducer gets called by dispatch
  //   // method the new state is returned--the data passed in as the data
  //   // attribute to the action object
  //   dispatch({
  //       type: "setSpeakerList",
  //       data: speakerListServerFilter
  //       })
  //   });
  //   return () => {
  //     console.log("cleanup");
  //   };
  // }, []); // [speakingSunday, speakingSaturday]);

  const handleChangeSaturday = () => {
    setSpeakingSaturday(!speakingSaturday);
  };
  const handleChangeSunday = () => {
    setSpeakingSunday(!speakingSunday);
  };
  // replacing setSpeakerList call with a dispatch call that requires an action type
  // memoized heartFavoriteHandler via useCallback so that React won't re-render it
  const heartFavoriteHandler = useCallback((e, speakerRec) => {
    e.preventDefault();
    // utilize ECMA6 spread operator to create speakerRec with
    // favorite boolean value toggled
    const toggledRec = { ...speakerRec, favorite: !speakerRec.favorite };
    // then do an axios PUT of toggledRec to REST server
    // on completion call the method updateDataRecord
    axios
      .put(`http://localhost:4000/speakers/${speakerRec.id}`, toggledRec)
      .then(function (res) {
        updateDataRecord(toggledRec);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const newSpeakerList = useMemo(
    () =>
      data
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
        }),
        [speakingSaturday, speakingSunday, data]
  );

  const speakerListFiltered = isLoading ? [] : newSpeakerList;

  // use hasErrored from UseAxiosFetch
  // if there is an error, don't return an empty array
  // instead render an error message
  // perhaps the cause of the error is that you failed to start json-server
  if (hasErrored) {
    return (
      <div>
        {errorMessage}&nbsp;"Ensure you launched 'npm run json-server' in terminal"
      </div>
    );
  }

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
              ({ id, firstName, lastName, sat, sun, bio, favorite }) => {
                return (
                  <SpeakerDetail
                    key={id}
                    id={id}
                    favorite={favorite}
                    onHeartFavoriteHandler={heartFavoriteHandler}
                    firstName={firstName}
                    lastName={lastName}
                    bio={bio}
                    sat={sat}
                    sun={sun}
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
