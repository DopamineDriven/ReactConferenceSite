import ImageToggleOnScroll from './ImageToggleOnScroll.jsx';
import React, { useContext } from 'react';
import { ConfigContext } from './App.jsx';
// when useEffect completes in Speaker.jsx and the data is ready to be rendered, each object is rendered with another component
// need to memoize what speakerdetail page is returning
// use the React.memo call, not to be confused with the hook, useMemo
// this returns a cached, or memoized, form of speakerdetail to the calling component in speakers
const SpeakerDetail = React.memo(({
    id,
    firstName,
    lastName,
    sat,
    sun,
    favorite,
    bio,
    onHeartFavoriteHandler
}) => {
    const context = useContext(ConfigContext)
    console.log(`SpeakerDetail:${id} ${firstName} ${lastName} ${favorite}`);
    return (
        <div className="card col-4 cardmin">
            <ImageToggleOnScroll  
                className="card-img-top"
                primaryImg={`/static/speakers/bw/Speaker-${id}.jpg`}
                secondaryImg={`/static/speakers/Speaker-${id}.jpg`}
                alt={`${firstName} ${lastName}`}
            />
            <div className="card-body">
                <h4 className="card-title">
                    {context.loggedInUserEmail ? (
                    <button 
                        data-sessionid={id}
                        className={favorite ? "heartredbutton" : "heartdarkbutton"}
                        onClick={e => {
                            onHeartFavoriteHandler(e, {
                                id,
                                firstName,
                                lastName,
                                favorite,
                                bio,
                                sat,
                                sun
                            })
                        }} 
                    />
                    ) : null}
                    <span>
                        {firstName} {lastName}
                    </span>
                </h4>
                <span>
                    {bio}
                </span>
            </div>
        </div>
    )
});

export default SpeakerDetail;