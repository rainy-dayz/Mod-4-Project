import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SpotReview from "../Review/reviewForSpot";
import { thunkGetOneSpot, deleteSpot, thunkGetSpot } from "../../store/spots";
import './spot.css'
import { useHistory } from "react-router-dom";
// import CreateReviewModal from "../Modals/createReviewModal";
import ReviewForm from "../Forms/reviewForm";
import { thunkGetSpotReviews } from "../../store/review";
import CreateBooking from "../CreateBooking";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { thunkCreateABooking, thunkGetBookings, thunkGetSingleSpotBookings } from "../../store/bookings";



const SpotInfo = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(thunkGetSpot(spotId))
}, [dispatch, spotId])

const reviews = useSelector(state => state.reviews.spot)
const user = useSelector(state => state.session.user)
const reviewArr = Object.values(reviews)


// ------------------------handles calander input-----------------
const [startDate, setStartDate] = useState(new Date());
const [endDate, setEndDate] = useState();


useEffect(() => {
    dispatch(thunkGetSingleSpotBookings(spotId))
}, [spotId])

const allDates = Object.values(useSelector(state => state.bookings.spotBookings))
console.log('allDates',allDates)

const dateRanges = allDates.map(date => ({
    start: new Date(date.startDate),
    end: new Date(date.endDate)
}))


const handleClick = () => {
    const dates = {
        startDate,
        endDate
    }
    dispatch(thunkCreateABooking(spotId, dates))
}

const spot = useSelector((state) =>state.spots.spot[spotId])


if (!spot) return <></>;
if (!spot || !Object.values(spot).length) return null

  if(!spot || !spot.id) return null
  if(spot.SpotImages === undefined) {return <></>}
  let endArray= spot.SpotImages.slice(1)

  return (
    <div className="currentBox">
      {/* <h2>{users.firstName}</h2> */}
    <h2>{spot.name}</h2>
    <p>{`${spot.city}, ${spot.state}, ${spot.country}`}</p>
    <div className="allimages-box">
      <div className="img">
    <img className="mainImg" src ={spot.SpotImages[0]? `${spot.SpotImages[0].url}`: "https://www.betel.uk/wp-content/uploads/property_placeholder.jpg"} />
    </div>
    <div className="box-smallImg">
    {endArray.map(spot =>{
      return(
        <img className = "sideImg"src={spot.url? `${spot.url}`: "https://www.betel.uk/wp-content/uploads/property_placeholder.jpg"} />
        // src={ele.previewImage?`${ele.previewImage}`: "https://t3.ftcdn.net/jpg/00/36/94/26/360_F_36942622_9SUXpSuE5JlfxLFKB1jHu5Z07eVIWQ2W.jpg"}
        )
      })}
      </div>
     </div>
     <div className="info-book">
     <div className="info-spot">
     <h2>{`Hosted by ${spot.Owner.firstName} ${spot.Owner.lastName}`}</h2>
    <p>{spot.description}</p>
     </div>
     <div>
    <div className = "reserve-box">

      <div className="top-row-reserve">
    <h3>{`$${spot.price} night`}</h3>

    <h5><span><i className="fa-solid fa-star"></i></span>{spot.numReviews === 1 ? ` ${spot.avgStarRating.toFixed(1)}    ·   ${spot.numReviews} review`: spot.numReviews === 0 ? "New" :` ${spot.avgStarRating.toFixed(1)} · ${spot.numReviews} reviews` }</h5>
    </div>


    <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
         excludeDateIntervals={dateRanges}
      />
      <DatePicker
         selected={endDate || startDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        excludeDateIntervals={dateRanges}
      />
<button className="reserve" onClick={handleClick}>Reserve</button>
    </div>
     </div>
     </div>
     <h3><span><i className="fa-solid fa-star"></i></span>{ spot.numReviews === 1 ? ` ${spot.avgStarRating.toFixed(1)}  ·   ${spot.numReviews} review`: spot.numReviews === 0 ? "New" :` ${spot.avgStarRating.toFixed(1)} · ${spot.numReviews} reviews` }</h3>
    <SpotReview spotId={spotId} />

    </div>
  );
};

  export default SpotInfo;
