import { csrfFetch } from "./csrf"


const CREATE_A_BOOKING = 'booking/CREATE_BOOKING'
const GET_USERS_BOOKING = 'booking/USERS_BOOKINGS'
const DELETE_BOOKING = 'booking/DELETE_BOOKING'
const GET_SINGLE_SPOT_BOOKINGS = 'booking/FOR_SPOT'
const EDIT_SINGLE_BOOKING = 'booking/EDIT_BOOKINGS'


const actionCreateBooking = (data) => ({
    type: CREATE_A_BOOKING,
    data
})

const actionGetUsersBooking = (data) => ({
    type: GET_USERS_BOOKING,
    data
})


const actionDeleteBooking = (id) => ({
    type: DELETE_BOOKING,
    id
})


const getSpotBookings = (data) => ({
    type: GET_SINGLE_SPOT_BOOKINGS,
    data
})


const actionEditABooking = (data) => ({
    type: EDIT_SINGLE_BOOKING,
    data
})





export const thunkEditASingleBooking = (bookingId, dates) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/bookings/${bookingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dates)
        })

        if (res.ok) {
            const result = await res.json()
            dispatch(actionEditABooking(result))
            return result
        }
    } catch (e) {
        const err = await e.json()
        console.log(err, '---------')
        return err
    }
}




export const thunkGetSingleSpotBookings = (spotId) => async (dispatch) => {
    try {const res = await csrfFetch(`/api/spots/${spotId}/bookings`)
    if(res.ok){
        const result = await res.json()
        dispatch(getSpotBookings(result))
        return result
    }} catch (e) {
        const error = await e.json()
        return error
    }
}






export const thunkDeleteSingleBooking = (bookingId) => async(dispatch) => {
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
}



export const thunkGetUsersBookings = () => async (dispatch) => {
    try {const res = await csrfFetch(`/api/bookings/current`)
    if(res.ok){
        const result = await res.json()
        dispatch(actionGetUsersBooking(result))
        return result
    }} catch (e) {
        const error = e.json()
        return error
    }
}



export const thunkCreateABooking = (spotId, dates) => async (dispatch) => {
    try {const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(dates)
    })
    if(res.ok){
        const result = await res.json()
        dispatch(actionCreateBooking(result))
        return result
    }} catch (e) {
        const error = e.json()
        return error
    }
}



const initialState = { spotBookings: {}, userBookings: {}}

export default function reviewsReducer (state = initialState, action){
    switch (action.type){
        case CREATE_A_BOOKING: {
            const newState = {...state, spotBookings:{...state.spotBookings}}
            newState.spotBookings[action.data.id] = action.data
            return newState
        }
        case GET_USERS_BOOKING: {
            const newState = { ...state, userBookings: {} };
            action.data.Bookings.forEach((booking) => {
                newState.userBookings[booking.id] = booking;
            });
            return newState;
        }
        case DELETE_BOOKING: {
            const newState = { ...state, userBookings: { ...state.userBookings } }
            delete newState.userBookings[action.id]
            return newState
        }
        case GET_SINGLE_SPOT_BOOKINGS: {
            const newState = { ...state};
            action.data.Bookings.forEach((booking) => {
                newState.spotBookings[booking.spotId] = booking;
            });
            return newState;
        }
        case EDIT_SINGLE_BOOKING: {
            return {...state, userBookings: { [action.data.id]: action.data}}
        }
        default:
            return state
    }
}
