import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetSpotReviews } from "../../store/review";
// import { deleteSpot } from "../../store/spots";
import { deleteReview } from '../../store/review';
import { useHistory } from "react-router-dom";
import DeleteReviewModal from "../Modals/deleteReviewModal";
import SingleReview from "../Spots/currentSpots/singleReview";





const SpotReview = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState()
  const {reviewId} = useParams()
  const history = useHistory()
  const users= useSelector(state => state.session.user)
  const [openModal,setOpenModal] = useState(false)

  // const handleDelete = (e) => {
  //   e.preventDefault();
  //   dispatch(deleteReview(reviewId));
  // };

  const spotReviews = useSelector((state) =>{
    return state.reviews.spot
  })
  console.log('state', spotReviews)
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
console.log('spot stuff',spotArr)

// if(!Object.values(spotReview).length) {return null}
// if(!spotArr.length){return null}
if(Object.values(spotArr).length<1){return null}
  return (
    <>
     {/* <h3><span><i class="fa-solid fa-star"></i></span>{spotArr.length === 1 ? ` ${spotArr.avgStarRating}·${spotArr.numReviews} review`: spotArr.length === 0 ? "New" :` ${spotArr.avgStarRating} · ${spotArr.numReviews} reviews` }</h3> */}

     {spotArr.toReversed().map((r) =>{
      return( <>
      {console.log('roger',r)}
        <SingleReview r={r} /> </>)
     })}

    </>
  );
};

  export default SpotReview;
