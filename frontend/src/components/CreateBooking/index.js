import React, { useEffect } from 'react'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { thunkCreateBooking, thunkGetBookings, thunkGetCurrentBookings } from '../../store/bookings';
import DatePicker from 'react-datepicker';
import './createBooking.css'
import 'react-datepicker/dist/react-datepicker.css'
import { addDays, subDays } from "date-fns";


// import Calendar from 'react-calendar';
// import { useSelector } from "react-redux";
const CreateBooking = ({ closeModal,spot }) => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState()
  const [errors, setErrors] = useState({});
  // const [date, setDate] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(thunkGetBookings(spot.id))
  }, [spot.id])

  const bookings = Object.values(useSelector(state => state.bookings.allBookings));

  const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors({});
      let data = {startDate,endDate};
      let datas = await dispatch(thunkCreateBooking(spot.id,data));
        // dispatch(thunkGetCurrentBookings());
      if (datas.errors) {
        setErrors(datas.errors);
        setStartDate(new Date())
        setEndDate(new Date())
      }else{
        history.push('/bookings/current')
      }
    };

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
      // console.log('date',alreadyBookedDates)

  return (
    // <div className="modals" >
      <form onSubmit={handleSubmit}>
        <div className="errors">{errors.startDate}</div>
          <div className="errors">{errors.endDate}</div>
         <div className='buttons'>

<DatePicker
                                showIcon={true}
                                selected={startDate}
                                minDate={new Date()}
                                selectsStart
                                onChange={(date) => setStartDate(date)}
                                startDate={startDate}
                                endDate={endDate}
                                excludeDateIntervals={bookedArr}
                            />
                            <DatePicker
                                showIcon={true}
                                selected={endDate || startDate}
                                minDate={startDate ? addDays(startDate, 1) :new Date()}
                                selectsEnd
                                onChange={(date) => setEndDate(date)}
                                startDate={startDate}
                                endDate={endDate}
                                excludeDateIntervals={bookedArr}
                            />
        </div>
          <div className='bttninreviewmodal'>
            {/* <button className="cancelreviewmodal" onClick={()=>
              closeModal(false)
              }>Cancel</button> */}
        <button className="reserve"  type="submit" onClick={()=>
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
