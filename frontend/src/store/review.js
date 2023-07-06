import { csrfFetch } from "./csrf"
const READ_REVIEWS = "reviews/READ_ALL_REVIEWS"
const RECIEVE_SPOT_REVIEWS = "spots/RECIEVE_SPOT_REVIEWS"
const CREATE_REVIEW = "spots/CREATE_REVIEWS"
const DELETE_REVIEW = "reviews/DELETE_REVIEW"

//actions
const actionReadReviews = (reviews) => ({
    type: READ_REVIEWS,
    reviews
  })

  const actionRecieveSpotReviews = (spots) => ({
    type: RECIEVE_SPOT_REVIEWS,
    spots
  })

  const actionCreateReview = (review) => ({
    type:CREATE_REVIEW,
    review
  })

  const actionDeleteReview = (reviewId) =>({
    type:DELETE_REVIEW,
    reviewId
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

    console.log('spot review thunk', response)
     if(response.ok){
       const spotReview = await response.json()
       dispatch(actionRecieveSpotReviews(spotReview))
     }
     }catch (error){
       const errors = await error.json();
       return errors;
     }
   }

   export const thunkCreateReview = (spotId,data,user) => async (dispatch) => {
    try{
        const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        // console.log('hell',response)
        if(response.ok){
            const review = await response.json();
            review.User=user
            dispatch(actionCreateReview(review));
            return review;
        }
        }catch (error) {
            const errors = await error.json()
            // console.log('errors',errors)
            return errors
        }
   }

//    /api/reviews/:reviewId
export const deleteReview = (reviewId) => async dispatch => {
    try {const response = await csrfFetch(`/api/reviews/${reviewId}`,{
        method:'DELETE'
    });

    if (response.ok) {
        dispatch(actionDeleteReview(reviewId));
    }
    }catch (error){
        const errors = await error.json()
        // console.log('errors',errors)
        return errors
    }
  };

const initialState = {
    // users :{},
    spot: {}
  }

export default function reviewReducer(state = initialState, action) {
  switch (action.type) {
    case READ_REVIEWS: {
        return {...state, spot:{...action.reviews.Reviews}}
        }
        case RECIEVE_SPOT_REVIEWS:{
            let newState = {...state,spot:{...state.spot}}
            action.spots.Reviews.forEach(ele => {
              console.log('element', ele)
                newState.spot[ele.id]= ele
            });
            console.log('newState', newState)
            return {...newState}
        }
        case CREATE_REVIEW:{
            return { ...state, spot:{[action.review.id]: action.review }};
        }
        case DELETE_REVIEW:{
            // const newState= {...state.newState}
            const newState= {...state, spot:{...state.spot}}
            delete newState.spot[action.reviewId]
            console.log('this is my newState', newState)
            console.log('this is my action', action)
            return newState
        }
    default:
        return state;
    }
  }
