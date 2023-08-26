import React, { useEffect } from 'react'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { thunkCreateBooking, thunkGetBookings, thunkGetCurrentBookings } from '../../store/bookings';
import DatePicker from 'react-datepicker';
import './createBooking.css'
import 'react-datepicker/dist/react-datepicker.css'


// import Calendar from 'react-calendar';
// import { useSelector } from "react-redux";
const CreateBooking = ({ closeModal,spot }) => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [errors, setErrors] = useState({});
  const [date, setDate] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(thunkGetBookings(spot.id))
  }, [spot.id])

  const bookings = Object.values(useSelector(state => state.bookings.allBookings));

  console.log('thisismybookings',bookings)
  const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors({});
      let data = {startDate,endDate};
      let datas = await dispatch(thunkCreateBooking(spot.id,data));
      //   dispatch(thunkGetCurrentBookings());
      if (datas.errors) {
        setErrors(datas.errors);
      }else{
        setStartDate('')
        setEndDate('')
      }
    };
    console.log('thisisdata',date)
    let today = new Date()
    today.setDate(today.getDate() + 1);
    today=new Date().toISOString().split('T')[0];

// Tomorrow's date
// date2.setDate(date2.getDate() + 1);
//     let currentDate = new Date();
// currentDate.setDate(currentDate.getDate() + 1);
    // document.getElementsByName("setTodaysDate")[0].setAttribute('min', today);
  return (
    // <div className="modals" >
      <form onSubmit={handleSubmit}>
        <div className="errors">{errors.startDate}</div>
         <div className='buttons'>
          {/* <div className="errors">{errors.endDate}</div> */}

        <label> Check-In
          <input

            type="date"
            placeholder="StartDate"
            value={startDate}
            min={today}
            onChange={(e) => setStartDate(e.target.value)}
          />
 {/* <DatePicker
      showIcon
      selected={startDate}
      onChange={(date) => setStartDate(date)}
    /> */}
        </label>
        <label> Check-Out
          <input
            // name="setTodaysDate"
            type="date"
            placeholder="EndDate"
            value={endDate}
            min={today}
            onChange={(e) => setEndDate(e.target.value)}
          />
          {/* <DatePicker
      showIcon
      selected={endDate}
      onChange={(date) => setEndDate(date)}
    /> */}
        </label>
        </div>
          <div className='bttninreviewmodal'>
            {/* <button className="cancelreviewmodal" onClick={()=>
              closeModal(false)
              }>Cancel</button> */}
        <button className="reserve" type="submit" onClick={()=>
          {
          return handleSubmit
          }}>Reserve</button>
          </div>
          {/* </div> */}
       </form>
          // </div>

              );
            };
export default CreateBooking;
