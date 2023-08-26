import React, { useEffect } from 'react'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { thunkGetUsersBookings, thunkEditASingleBooking } from '../../store/bookings';
import DatePicker from 'react-datepicker';
// import './createBooking.css'

// import Calendar from 'react-calendar';
// import { useSelector } from "react-redux";
const EditBooking = ({ closeModal,bookingId,startDay,endDay,spotId }) => {

  const [startDate, setStartDate] = useState(startDay)
  const [endDate, setEndDate] = useState(endDay)
  const [errors, setErrors] = useState({});
  const [date, setDate] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  const bookings = Object.values(useSelector(state => state.bookings.spotBookings));
  // console.log('thisismybookings',bookings)
  useEffect(() => {
    dispatch(thunkGetUsersBookings())
}, [])
let today = new Date()
    today.setDate(today.getDate() + 1);
    today=new Date().toISOString().split('T')[0];

  const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors({});
      let data = {startDate,endDate};
      let datas = await dispatch(thunkEditASingleBooking(bookingId,data));
      dispatch(thunkGetUsersBookings())
      if (datas.errors) {
        setErrors(datas.errors);
      }else {
        closeModal(false)
      }
    };


  return (
    <div className="modals" >
      <form onSubmit={handleSubmit}>
            <div className="backg" >
      <div>TESTETTSTETTSETETTESTSETSET</div>
        <h2>{`Book your stay!`}</h2>
        <div className="errors">{errors.startDate}</div>
          <div className="errors">{errors.endDate}</div>
          <label>
          <input
            type="date"
            placeholder="StartDate"
            value={startDate}
            min={today}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          <input
            type="date"
            placeholder="EndDate"
            value={endDate}
            min={today}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
          <div className='bttninreviewmodal'>
            <button className="cancelreviewmodal" onClick={()=>
              closeModal(false)
              }>Cancel</button>
        <button className="submitreviewmodal" type="submit" onClick={()=>
          {
          return handleSubmit
          }}>Book</button>
          </div>
          </div>
       </form>
          </div>

              );
            };
export default EditBooking;
