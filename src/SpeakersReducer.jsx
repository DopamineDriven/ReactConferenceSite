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
export default speakersReducer;