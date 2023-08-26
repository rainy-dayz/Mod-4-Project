import { csrfFetch } from "./csrf"
const GET_CURRENT="bookings/GET_CURRENT"
const GET_BOOKINGS="bookings/GET_BOOKINGS"
const CREATE_BOOKING = "bookings/CREATE_BOOKING"
const DELETE_BOOKING = "bookings/DELETE_BOOKING"
const UPDATE_BOOKING="bookings/UPDATE_BOOKING"
//
  const actionGetCurrent = (bookings) => ({
    type: GET_CURRENT,
    bookings
  })
  const actionGetBookings = (bookings) => ({
    type: GET_BOOKINGS,
    bookings
  })
  const actionCreateBookings = (data) => ({
    type: CREATE_BOOKING,
    data
  })
  const actionDeleteBooking = (bookingId) => ({
    type: DELETE_BOOKING,
    bookingId
  })
  const actionUpdateBooking = (bookingId) => ({
    type: UPDATE_BOOKING,
    bookingId
  })
  export const thunkGetCurrentBookings = () => async (dispatch) => {
    try {const response = await csrfFetch(`/api/bookings/current`);

    if(response.ok){
      const bookings = await response.json()
      dispatch(actionGetCurrent(bookings))
    }
    }catch (error){
      const errors = await error.json();
      return errors;
    }
  }
  export const thunkGetBookings = (spotId) => async (dispatch) => {
    try {const response = await csrfFetch(`/api/spots/${spotId}/bookings`);

    if(response.ok){
      const bookings = await response.json()
      dispatch(actionGetBookings(bookings))
    }
    }catch (error){
      const errors = await error.json();
      return errors;
    }
  }
  export const thunkUpdateBooking = (bookingId,data) => async (dispatch) => {
    try {
      const res = await csrfFetch(`/api/bookings/${bookingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
      })

      if (res.ok) {
          const result = await res.json()
          dispatch(actionUpdateBooking(result))
          return result
      }
  } catch (e) {
      const err = await e.json()
      return err
  }
  };
  export const thunkCreateBooking = (spotId,data) => async (dispatch) => {
    try {const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
  })
  if(res.ok){
      const result = await res.json()
      dispatch(actionCreateBookings(result))
      return result
  }} catch (e) {
      const error = e.json()
      return error
  }

};
export const thunkDeleteBooking = (bookingId) => async dispatch => {
  try {const res = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE"
})
if(res.ok){
    const result = await res.json()
    dispatch(actionDeleteBooking(bookingId))
    return result
}} catch (e) {
    const error = e.json()
    return error
}
  };
  const initialState = {
    allBookings :{},
    userBookings: {}
  }
  export default function bookingReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CURRENT:{
          const newState = { ...state, userBookings: {} };
          action.bookings.Bookings.forEach((booking) => {
              newState.userBookings[booking.id] = booking;
          });
          return newState;
        }
        case GET_BOOKINGS:{
            let newState = {...state, allBookings:{}}
            action.bookings.Bookings.forEach(ele => {
              newState.allBookings[ele.id]= ele
            });
            return newState
        }
        case CREATE_BOOKING: {
            const newState = {...state,allBookings:{...state.allBookings}}
            newState.allBookings[action.data.id] = action.data
            return newState
        }
        case DELETE_BOOKING: {
          const newState = { ...state, userBookings: { ...state.userBookings } }
          delete newState.userBookings[action.id]
          return newState
        }
        case UPDATE_BOOKING: {
          return {...state, userBookings: { [action.data.id]: action.data}}
      }
          default:
            return state;
        }
      }
