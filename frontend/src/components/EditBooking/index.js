import React, { useEffect } from 'react'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { thunkCreateBooking, thunkGetBookings, thunkGetCurrentBookings, thunkUpdateBooking } from '../../store/bookings';
import DatePicker from 'react-datepicker';
import { addDays, subDays } from "date-fns";
// import './createBooking.css'

// import Calendar from 'react-calendar';
// import { useSelector } from "react-redux";
const EditBooking = ({ closeModal,bookingId,startDay,endDay,spotId }) => {
  let dateArray = startDay.split("-");
  let year = dateArray[0];
  let month = parseInt(dateArray[1], 10) - 1;
  let date = dateArray[2];
  startDay = new Date(year, month, date);
  let dateArray2 = endDay.split("-");
  let year2 = dateArray2[0];
  let month2 = parseInt(dateArray2[1], 10) - 1;
  let date2 = dateArray2[2];
  endDay = new Date(year2, month2, date2);

  const [startDate1, setStartDate1] = useState(startDay)
  const [endDate1, setEndDate1] = useState(endDay)
  const [errors, setErrors] = useState({});
  // const [date, setDate] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  const bookings = Object.values(useSelector(state => state.bookings.allBookings));
  // const bookings2 = Object.values(useSelector(state => state.bookings.userBookings));

  useEffect(() => {
    dispatch(thunkGetBookings(spotId))
}, [])


  const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors({});
      let data = {startDate:startDate1,endDate:endDate1};
      let datas = await dispatch(thunkUpdateBooking(bookingId,data));
      dispatch(thunkGetCurrentBookings())
      if (datas.errors) {
        setErrors(datas.errors);
      }else {
        closeModal(false)
      }
    };

  //   const filterDates = bookings.filter( (date) => {
  //     return date.startDate !== startDate1 && date.endDate !== endDate1
  // })
  // console.log('filteredDates',filterDates)
    const bookedArr = [];
    for (const booking of bookings) {
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);
      const data = {
        start: subDays(start, 0),
        end: addDays(end, 1),
      };
        bookedArr.push(data);

      }

  return (
    <div className="modals" >
      <form onSubmit={handleSubmit}>
            <div className="backg" >
        <h2>{`Book your stay!`}</h2>
        <div className="errors">{errors.startDate}</div>
          <div className="errors">{errors.endDate}</div>
          <DatePicker
          showIcon={true}
        selected={startDate1}
        onChange={(date) => setStartDate1(date)}
        selectsStart
        startDate={startDate1}
        endDate={endDate1}
        minDate={new Date()}
        excludeDateIntervals={bookedArr}
      />
      <DatePicker
      showIcon={true}
        selected={endDate1 }
        onChange={(date) => setEndDate1(date)}
        selectsEnd
        startDate={startDate1}
        endDate={endDate1}
        minDate={startDate1}
        excludeDateIntervals={bookedArr}
      />
          {/* <label>
          <input
            type="date"
            placeholder="StartDate"
            value={startDate1}
            min={today}
            onChange={(e) => setStartDate1(e.target.value)}
          />
        </label>
        <label>
          <input
            type="date"
            placeholder="EndDate"
            value={endDate1}
            min={startDate1}
            onChange={(e) => setEndDate1(e.target.value)}
          />
        </label> */}
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
