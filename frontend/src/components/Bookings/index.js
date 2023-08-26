import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkDeleteBooking, thunkDeleteSingleBooking, thunkGetUsersBookings } from '../../store/bookings';
import EditBooking from '../EditBooking';


function CurrentBookings() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [openModal,setOpenModal] = useState(false)
    const bookings = Object.values(useSelector(state => state.bookings.userBookings));
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [bookingid, setBookingid] = useState('')
    // console.log(bookings)

    useEffect(() => {
        dispatch(thunkGetUsersBookings());
    }, [dispatch]);
    if(!bookings)return <></>

      return (
        <main>
          <h1>Manage Bookings</h1>
            {bookings.map(booking =>{
                return (<div key ={booking.id}>
                <div>{booking?.Spot?.name}</div>
                <div>{booking.startDate}</div>
                <div>{booking.endDate}</div>
                {/* {console.log('thisisstart',booking.startDate)}
                {console.log('thisisend',booking.endDate)} */}
                {booking.id&&<button className="openingoftheeditmodal" onClick={()=>
                  {setOpenModal(true)
                  setStartDate(booking.startDate)
                  setEndDate(booking.endDate)
                  setBookingid(booking.id)
                  }}>Edit Your Booking</button>}
                <button onClick={()=> {
                  dispatch(thunkDeleteSingleBooking(booking.id))
                  .then(()=> dispatch(thunkGetUsersBookings()))
                }}>Cancel Booking</button>
                </div>
                )
              })}
              {openModal &&<EditBooking closeModal ={setOpenModal} bookingId={bookingid} startDay={startDate} endDay={endDate}/>}
          </main>
    )
  }

  export default CurrentBookings;
