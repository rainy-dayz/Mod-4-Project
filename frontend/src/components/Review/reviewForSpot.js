import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetSpotReviews } from "../../store/review";
// import { deleteSpot } from "../../store/spots";
import { deleteReview } from '../../store/review';
import { useHistory } from "react-router-dom";
import DeleteReviewModal from "../Modals/deleteReviewModal";
import SingleReview from "./singleReview";
import ReviewForm from "../Forms/reviewForm";
import './singleReview.css'




const SpotReview = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState()
  const {reviewId} = useParams()
  // const [openModal,setOpenModal] = useState(false)
  const history = useHistory()
  // const users= useSelector(state => state.session.user)
  const [openModal,setOpenModal] = useState(false)
  const user= useSelector(state => state.session)
  const spot= useSelector(state=> state.spots.spot[spotId])
  let spot1=Object.values(spot)
  // const handleDelete = (e) => {
  //   e.preventDefault();
  //   dispatch(deleteReview(reviewId));
  // };

  const spotReviews = useSelector((state) =>{
    return state.reviews.spot
  })
  useEffect(() => {
    const error = async() => {
        const error = await dispatch(thunkGetSpotReviews(spotId));
        setErrors(error)
    }
    error()
}, [dispatch]);

// const spot = Object.values(spotObj)[0][0]
const spotArr = Object.values(spotReviews)
// const spotArr1 = Object.values(spotArr)


// if(!Object.values(spotReview).length) {return null}
// if(!spotArr.length){return null}
// if(Object.values(spotArr).length<1){return null}
let createReviewButton = false
  spotArr.map((review)=> {

      return (
       !user.user || review.userId === user.user.id || user.user.id === spot.ownerId  ? createReviewButton = false : createReviewButton= true
      )
  })
  return (
    <>
    {openModal && <ReviewForm closeModal ={setOpenModal}/>}
     {/* <h3><span><i class="fa-solid fa-star"></i></span>{spotArr.length === 1 ? ` ${spotArr.avgStarRating}·${spotArr.numReviews} review`: spotArr.length === 0 ? "New" :` ${spotArr.avgStarRating} · ${spotArr.numReviews} reviews` }</h3> */}
     {/* <h3><span><i class="fa-solid fa-star"></i></span>{spotArr.length === 1 ? ` ${spot.avgStarRating.toFixed(1)}·${spot.numReviews} review`: spot.numReviews === 0 ? "New" :` ${spot.avgStarRating} · ${spot.numReviews} reviews` }</h3> */}
     {createReviewButton && <button onClick={()=>setOpenModal(true)}>Post Your Review</button>}
     {user.user && !spotArr.length && user.user.id !== spot.ownerId ? <div className="post-review"><button onClick={()=>setOpenModal(true)}>Post Your Review</button>Be the first to post a review!</div> : null}
     {spotArr.toReversed().map((r) =>{
      return( <>
        <SingleReview r={r} /> </>)
     })}

    </>
  );
};

  export default SpotReview;
