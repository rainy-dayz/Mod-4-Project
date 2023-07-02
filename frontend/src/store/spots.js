import { csrfFetch } from "./csrf"

const READ_SPOTS = "spots/READ_ALL_SPOTS"
const CREATE_SPOT = "spots/CREATE_SPOT"
const DELETE_SPOT = "spots/DELETE_SPOT"
const UPDATE_SPOT = "spots/UPDATE_SPOT"
const RECIEVE_SPOT = "spots/RECIEVE_SPOT"



const actionReadSpot = (spots) => ({
    type: READ_SPOTS,
    spots
  })


  const actionDeleteSpot = (spotId) =>({
    type:DELETE_SPOT,
    spotId
  })

  const actionEditSpot = (spots) => ({
    type: UPDATE_SPOT,
    spots
  })

  const actionCreateSpot = (spots) => ({
    type: CREATE_SPOT,
    spots
  })

  const actionRecieveSpot = (spots) => ({
    type: RECIEVE_SPOT,
    spots
  })

  export const thunkGetCurrentSpots = (spots) => async (dispatch) => {
    try {const response = await csrfFetch(`/api/spots/current`);

    if(response.ok){
      const spots = await response.json()
      dispatch(actionReadSpot(spots))
    }
    }catch (error){
      const errors = await error.json();
      return errors;
    }
  }

  export const thunkGetSpot = (spotId) => async (dispatch) => {
    try {const response = await csrfFetch(`/api/spots/${spotId}`);

    if(response.ok){
      const spot = await response.json()
      dispatch(actionRecieveSpot(spot))
    }
    }catch (error){
      const errors = await error.json();
      return errors;
    }
  }

  export const updateSpot = (spots) => async (dispatch) => {
    try {const res = await csrfFetch(`/api/spots/${spots.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(spots),
    });

    if (res.ok) {
      const newSpot = await res.json();
      dispatch(actionEditSpot(newSpot));
      return newSpot;
    }
      } catch (error){
      const errors = await error.json();
      return errors;
    }
  };

  export const getSpots = () => async dispatch => {
    const response = await fetch(`/api/spots`);

    if (response.ok) {
      const spots = await response.json();
      dispatch(actionReadSpot(spots));
    }
  };

  export const deleteSpot = (spotId) => async dispatch => {
    try {const response = await csrfFetch(`/api/spots/${spotId}`,{
        method:'DELETE'
    });

    if (response.ok) {
        dispatch(actionDeleteSpot(spotId));
    }
    }catch (error){
        const errors = await error.json()
        // console.log('errors',errors)
        return errors
    }
  };

  export const createSpot = (data) => async (dispatch) => {
    try{
    const response = await csrfFetch(`/api/spots`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // console.log('hell',response)
    if(response.ok){
        const spots = await response.json();
        dispatch(actionCreateSpot(spots));
        return spots;
    }
    }catch (error) {
        const errors = await error.json()
        // console.log('errors',errors)
        return errors
    }

};



  const initialState = {
    allSpots :{},
    spot: {}
  }

export default function spotReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_SPOT: {
        return { ...state, spot:{[action.spots.id]: action.spots }};
    }
    case READ_SPOTS: {
    return {...state, allSpots:{...action.spots.Spots}}
    }
    case RECIEVE_SPOT:{
        // return {...state, ...action.spots}
        let newState = {...state,spot:{}}
        for(let spot of action.spots){
            newState.spot[spot.id]=spot
        }
        return newState
    }
    case UPDATE_SPOT:
      return {...state, spot:{[action.spots.id]: action.spots }};
      case DELETE_SPOT:
    //     const newState = { ...state, spot:{} };
    //   delete newState.allSpots[action.spotId];
    //   return newState;
    const allSpots = {...state.allSpots}
    delete allSpots[action.spotId]
    return {allSpots, spot:{} }
    default:
      return state;
  }
}
