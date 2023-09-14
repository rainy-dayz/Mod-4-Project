import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkDeleteBooking, thunkGetCurrentBookings } from '../../store/bookings';
import EditBooking from '../EditBooking';


function CurrentBookings() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [openModal,setOpenModal] = useState(false)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [bookingid, setBookingid] = useState('')
    const [spotid, setSpotid] = useState('')
    const users= useSelector(state => state.session.user)
    const bookings = Object.values(useSelector(state => state.bookings.userBookings));
  // console.log('this is bookings', bookings)
    useEffect(() => {
      // console.log('inside use effect')
      dispatch(thunkGetCurrentBookings());
    }, [dispatch]);
    // if(!bookings)return <></>
    let today=new Date()
    const offset = today.getTimezoneOffset()
today = new Date(today.getTime() - (offset*60*1000))
  today =today.toISOString().split('T')[0]


      return (
        <main>
          <h1>Manage Bookings</h1>
          <div className="cards">
            {bookings.map(booking =>{
              return (<div key ={booking.id}>
                <img className='pics' src={booking?.Spot?.previewImage}/>
                <div>{booking?.Spot?.name}</div>
                <div className = 'dates23'>
                <div>{`${booking.startDate.slice(5,7)}/${booking.startDate.slice(8,10)}/${booking.startDate.slice(0,4)} - ${booking.endDate.slice(5,7)}/${booking.endDate.slice(8,10)}/${booking.endDate.slice(0,4)}`}</div>

                </div>
                {today <=booking.startDate?<button className="openingoftheeditmodal" onClick={()=>
                  {setOpenModal(true)
                  setStartDate(booking.startDate)
                  setEndDate(booking.endDate)
                  setBookingid(booking.id)
                  setSpotid(booking.Spot.id)
                }}>Edit Your Booking</button>:null}
                <button onClick={()=> {
                  dispatch(thunkDeleteBooking(booking.id))
                  .then(()=> dispatch(thunkGetCurrentBookings()))
                }}>Cancel Booking</button>
                </div>
                )
              })}
              {!bookings.length &&<div>No bookings yet</div>}
              </div>
              {openModal &&<EditBooking closeModal ={setOpenModal} bookingId={bookingid} startDay={startDate} endDay={endDate} spotId={spotid}/>}
          </main>
    )
  }

  export default CurrentBookings;
