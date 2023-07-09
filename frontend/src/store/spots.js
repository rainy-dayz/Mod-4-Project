import { csrfFetch } from "./csrf"

const READ_SPOTS = "spots/READ_ALL_SPOTS"
const CREATE_SPOT = "spots/CREATE_SPOT"
const DELETE_SPOT = "spots/DELETE_SPOT"
const UPDATE_SPOT = "spots/UPDATE_SPOT"
const RECIEVE_SPOT = "spots/RECIEVE_SPOT"
const CREATE_SPOTIMG = "spots/CREATE_SPOTIMG"
const UPDATE_SPOTIMG= "spots/UPDATE_SPOTIMG"
const GET_CURRENT="spots/GET_CURRENT"


const actionReadSpot = (spots) => ({
    type: READ_SPOTS,
    spots
  })

  const actionGetCurrent = (spots) => ({
    type: GET_CURRENT,
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

  const actionCreateSpotImage = (spot) => ({
    type: CREATE_SPOTIMG,
    spot
  })



  export const thunkCreateSpotImage = (spotId, data) => async (dispatch) => {

    try {const response = await csrfFetch(`/api/spots/${spotId}/images`,{
      method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({url:data,preview:`true`}),
    });


    if(response.ok){
      const images = await response.json()
      dispatch(actionCreateSpotImage(images))
    }
    }catch (error){
      const errors = await error.json();
      return errors;
    }
  }

  export const thunkCreateSpotImage2 = (spotId, data) => async (dispatch) => {

    try {const response = await csrfFetch(`/api/spots/${spotId}/images`,{
      method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({url:data,preview:`false`}),
    });


    if(response.ok){
      const images = await response.json()
      dispatch(actionCreateSpotImage(images))
    }
    }catch (error){
      const errors = await error.json();
      return errors;
    }
  }
  
  export const thunkGetCurrentSpots = (spots) => async (dispatch) => {
    try {const response = await csrfFetch(`/api/spots/current`);

    if(response.ok){
      const spots = await response.json()
      dispatch(actionGetCurrent(spots))
    }
    }catch (error){
      const errors = await error.json();
      return errors;
    }
  }

  export const thunkGetSpot = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`);

    if(response.ok){
      const spot = await response.json()
      dispatch(actionRecieveSpot(spot))
    }
    // }catch (error){
    //   const errors = await error.json();
    //   return errors;
    // }
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


    if(response.ok){
        const spots = await response.json();
        dispatch(actionCreateSpot(spots));
        return spots;
    }
    }catch (error) {
        const errors = await error.json()

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
      let newState = {...state}
      action.spots.Spots.forEach(ele => {
        newState.allSpots[ele.id]= ele
      });

      return {...newState}
      // return newState


    }
    case GET_CURRENT:{
      let newState = {...state, allSpots:{}}
      action.spots.Spots.forEach(ele => {
        newState.allSpots[ele.id]= ele
      });

      return newState
    }
    // return {...state, allSpots: {...action.spots.Spots}}
    case RECIEVE_SPOT:{
        // return {...state, ...action.spots}
        let newState = {...state,spot:{}}
        for(let spot of action.spots){
            newState.spot[spot.id]=spot
        }
        return newState
    }
    case CREATE_SPOTIMG:{
      return {...state, spot:action.spot}
    }
    case UPDATE_SPOT:
      return {...state, spot:{[action.spots.id]: action.spots }};
      case DELETE_SPOT:
        const newState = {...state, allSpots:{...state.allSpots}}
        delete newState.allSpots[action.spotId]
        return newState

        //     const newState = { ...state, spot:{} };
        //   delete newState.allSpots[action.spotId];
        //   return newState;
    // const newState= {...state, spot:{...state.spot}}
    //         delete newState.spot[action.reviewId]

    //         return newState
    default:
      return state;
  }
}
