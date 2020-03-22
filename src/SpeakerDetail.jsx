import ImageToggleOnScroll from './ImageToggleOnScroll.jsx';
// when useEffect completes in Speaker.jsx and the data is ready to be rendered, each object is rendered with another component
const SpeakerDetail = ({
    id,
    firstName,
    lastName,
    favorite,
    bio,
    onHeartFavoriteHandler
}) => {
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
                    <button 
                        data-sessionid={id}
                        className={`${favorite ? "heartbutton" : "heartdarkbutton"}`}
                        onClick={e => {
                            onHeartFavoriteHandler(e, !favorite)
                        }} 
                    />
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
};

export default SpeakerDetail;