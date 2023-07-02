import { csrfFetch } from "./csrf"
const READ_REVIEWS = "reviews/READ_ALL_REVIEWS"
const RECIEVE_SPOT_REVIEWS = "spots/RECIEVE_SPOT_REVIEWS"
const CREATE_REVIEW = "spots/CREATE_REVIEWS"

//actions
const actionReadReviews = (reviews) => ({
    type: READ_REVIEWS,
    reviews
  })

  const actionRecieveSpotReviews = (spots) => ({
    type: RECIEVE_SPOT_REVIEWS,
    spots
  })

  const actionCreateReview = (spots) => ({
    type:CREATE_REVIEW,
    spots
  })

  // thunks
  export const thunkGetCurrentReviews = (spots) => async (dispatch) => {
    try {const response = await csrfFetch(`/api/reviews/current`);

    if(response.ok){
      const reviews = await response.json()
      dispatch(actionReadReviews(reviews))
    }
    }catch (error){
      const errors = await error.json();
      return errors;
    }
  }

  export const thunkGetSpotReviews = (spotId) => async (dispatch) => {
    try{const response = await fetch(`/api/spots/${spotId}/reviews`);

     if(response.ok){
       const spotReview = await response.json()
       dispatch(actionRecieveSpotReviews(spotReview))
     }
     }catch (error){
       const errors = await error.json();
       return errors;
     }
   }


const initialState = {
    users :{},
    spot: {}
  }

export default function reviewReducer(state = initialState, action) {
  switch (action.type) {
    case READ_REVIEWS: {
        return {...state, users:{...action.reviews.Reviews}}
        }
        case RECIEVE_SPOT_REVIEWS:{
            return {...state, spot:{...action.spots.Reviews}}
        }
    default:
        return state;
    }
  }
