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




const SpotInfo = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState()
  const {user} =useState()
  const history= useHistory()
  const [openModal,setOpenModal] = useState(false)
  const users= useSelector(state => state.session.user)
  const reviews= useSelector(state => state.reviews.spot)

  // const [length,setLength] = useState(Object.values(reviews.length))

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteSpot(spotId));
  };

  useEffect(() => {
    const error = async() => {
        const error = await dispatch(thunkGetSpot(spotId));
        setErrors(error)
    }
    error()
}, [dispatch, spotId]);

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
    <img className="mainImg" src ={spot.SpotImages[0].url? `${spot.SpotImages[0].url}`: "https://cdn.pixabay.com/photo/2016/05/31/10/52/not-yet-1426593_1280.png"} />
    <div className="box-smallImg">
    {endArray.map(spot =>{
      return(
        <img className = "sideImg"src={spot.url? `${spot.url}`: "https://cdn.pixabay.com/photo/2016/05/31/10/52/not-yet-1426593_1280.png"} />
        // src={ele.previewImage?`${ele.previewImage}`: "https://t3.ftcdn.net/jpg/00/36/94/26/360_F_36942622_9SUXpSuE5JlfxLFKB1jHu5Z07eVIWQ2W.jpg"}
        )
      })}
      </div>
     </div>
     <div className="info-book">
     <div className="info-spot">
     <p>{`Hosted by ${spot.Owner.firstName}, ${spot.Owner.lastName}`}</p>
    <p>{spot.description}</p>
     </div>
     <div>
    <div className = "reserve-box">

      <div className="top-row-reserve">
    <h3>{`$${spot.price} night`}</h3>

    <h5><span><i className="fa-solid fa-star"></i></span>{spot.numReviews === 1 ? ` ${spot.avgStarRating.toFixed(1)}    ·   ${spot.numReviews} review`: spot.numReviews === 0 ? "New" :` ${spot.avgStarRating} · ${spot.numReviews} reviews` }</h5>
    </div>
    <button onClick={()=>alert("Feature Coming Soon")} className="reserve">Reserve</button>
    </div>
     </div>
     </div>
     <h3><span><i className="fa-solid fa-star"></i></span>{ spot.numReviews === 1 ? ` ${spot.avgStarRating.toFixed(1)}·${spot.numReviews} review`: spot.numReviews === 0 ? "New" :` ${spot.avgStarRating} · ${spot.numReviews} reviews` }</h3>
    {/* <Link to={`/spots/${spotId}/reviews`}>Reviews</Link> */}
    {/* <Link to={`/spots/${spotId}/review`}>Create Review</Link> */}
    {/* <div>{spots.session.user.firstName}</div> */}
    <SpotReview spotId={spotId} />
    {/* {(users ? users.id:Infinity)!== spot.ownerId? <button onClick={()=>setOpenModal(true)}>Create A Review</button>:} */}
    {/* <button onClick={()=>setOpenModal(true)}>Create A Review</button> */}
    </div>
  );
};

  export default SpotInfo;
