// import { useParams } from "react-router-dom";
// import { useState } from "react";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { thunkGetSpotReviews } from "../../store/review";
// // import { deleteSpot } from "../../store/spots";
// import { deleteReview } from '../../store/review';
// import { useHistory } from "react-router-dom";
// import SpotReview from "./reviewForSpot";



// const UserReviewData = () => {
//   const { spotId } = useParams();
//   const dispatch = useDispatch();
//   const [errors, setErrors] = useState()
//   const {reviewId} = useParams()
//   const history = useHistory()

//   useEffect(() => {
//     const error = async() => {
//         const error = await dispatch(thunkGetSpotReviews(spotId));
//         setErrors(error)
//     }
//     error()
// }, [dispatch, spotId]);

// const spotReviews =Object.values(useSelector((state) =>{
//     return state.reviews.spot
// }))
// // const spot = Object.values(spotObj)[0][0]
//     if(!Object.values(spotReview).length) {return null }
// // const spotArr = Object.values(spot)
// //   console.log('spot stuff',spotReview)

//   return (
//     <SpotReview spoteReviews={spotReviews}/>
//   );
// };

//   export default UserReviewData;
