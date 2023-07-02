const READ_SPOTS = "spots/READ_ALL_SPOTS"
const CREATE_SPOT = "spots/CREATE_SPOT"
const DELETE_SPOT = "spots/DELETE_SPOT"

const actionReadSpot = (spots) => ({
    type: READ_SPOTS,
    spots
  })

const actionCreateSpot = (spots) => ({
    type: CREATE_SPOT,
    spots
  })

  const actionDeleteSpot = (spotId) =>({
    type:DELETE_SPOT,
    spotId
  })

  export const getSpots = () => async dispatch => {
    const response = await fetch(`/api/spots`);

    if (response.ok) {
      const spots = await response.json();
      dispatch(actionReadSpot(spots));
    }
  };

  export const deleteSpot = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}`);

    if (response.ok) {
        dispatch(actionDeleteSpot(spotId));
    }
  };

  export const createSpot = (data) => async (dispatch) => {
    const response = await fetch(`/api/spots`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if(response.ok){
    const spots = await response.json();
    dispatch(actionCreateSpot(spots));
    return spots;
    }else{
      const errors = await response.json()
      return errors
    }
};





//   const initialState = {}

export default function spotReducer(state = {}, action) {
  switch (action.type) {
    case READ_SPOTS: {
    return {...state, ...action.spots.Spots}
    }
    case CREATE_SPOT:{
        return {...state, }
    }
    default:
      return state;
  }
}
