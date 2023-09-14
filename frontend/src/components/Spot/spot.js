import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SpotReview from "../Review/reviewForSpot";
import { thunkGetSpot, deleteSpot } from "../../store/spots";
import './spot.css'
import { useHistory } from "react-router-dom";
// import CreateReviewModal from "../Modals/createReviewModal";
import ReviewForm from "../Forms/reviewForm";
import { thunkGetSpotReviews } from "../../store/review";
import CreateBooking from "../CreateBooking";
import { thunkGetBookings } from "../../store/bookings";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from '../OpenModalButton'
import OpenModalButton2 from "../OpenModalButton/index2";



const SpotInfo = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState()
  const [startDate, setStartDate] = useState('')
  const {user} =useState()
  const history= useHistory()
  const [openModal,setOpenModal] = useState(false)
  const users= useSelector(state => state.session.user)
  const reviews= useSelector(state => state.reviews.spot)
  const [date, setDate] = useState(new Date());

  // const [length,setLength] = useState(Object.values(reviews.length))

  useEffect(() => {
    const error = async() => {
        const error = await dispatch(thunkGetSpot(spotId));
        setErrors(error)
    }
    error()
}, [dispatch, spotId]);
// useEffect(() => {
//   dispatch(thunkGetBookings(spotId))
// }, [spotId])
const spot = useSelector((state) =>state.spots.spot[spotId])


if (!spot) return <></>;

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
      return(<div key={spot.id}>
        <img className = "sideImg"src={spot.url? `${spot.url}`: "https://www.betel.uk/wp-content/uploads/property_placeholder.jpg"} />
        {/* {console.log('spot.url',spot.url)} */}

        </div>)
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
  {users ? (spot.Owner.id == users.id ? <div className="emptydiv"> </div> :<CreateBooking spot={spot}/>) :<div>
      {<OpenModalButton2
                  buttonText="Reserve"
                  modalComponent={<LoginFormModal />}
                />}</div>}

    </div>
     </div>
     </div>
     <h3><span><i className="fa-solid fa-star"></i></span>{ spot.numReviews === 1 ? ` ${spot.avgStarRating.toFixed(1)}  ·   ${spot.numReviews} review`: spot.numReviews === 0 ? "New" :` ${spot.avgStarRating.toFixed(1)} · ${spot.numReviews} reviews` }</h3>
    <SpotReview spotId={spotId} />
    {/* {(users ? users.id:Infinity)!== spot.ownerId? <button onClick={()=>setOpenModal(true)}>Create A Review</button>:} */}
    {/* <button onClick={()=>setOpenModal(true)}>Create A Review</button> */}
    </div>
  );
};

  export default SpotInfo;
