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
import StarRatingSingleReview from "./starRatingSingleReview";
import EditReview from "../EditReview";





const SpotReview = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState()
  const {reviewId} = useParams()
  // const [openModal,setOpenModal] = useState(false)
  const history = useHistory()
  // const users= useSelector(state => state.session.user)
  const [openModal,setOpenModal] = useState(false)
  const [openModal1,setOpenModal1] = useState(false)
  const [openModal2,setOpenModal2] = useState(false)
  const user= useSelector(state => state.session)
  const spot= useSelector(state=> state.spots.spot[spotId])
  let spot1=Object.values(spot)


  const spotReviews = useSelector((state) =>{
    return state.reviews.spot
  })
  useEffect(() => {
    const error = async() => {
        const error = await dispatch(thunkGetSpotReviews(spotId));
        setErrors(error)
    }
    error()
}, [spotId]);

const spotArr = Object.values(spotReviews)
let createReviewButton = false
  spotArr.map((review)=> {

      return (
       !user.user || review.userId === user.user.id || user.user.id === spot.ownerId  ? createReviewButton = false : createReviewButton= true
      )
  })
  let str
  const months =[ 'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October',
    'November', 'December' ]
  return (
    <>
    {openModal && <ReviewForm closeModal ={setOpenModal}/>}

     {createReviewButton && <button onClick={()=>setOpenModal(true)}>Post Your Review</button>}
     {user.user && !spotArr.length && user.user.id !== spot.ownerId ? <div className="post-review"><button onClick={()=>setOpenModal(true)}>Post Your Review</button>Be the first to post a review!</div> : null}
     {spotArr.toReversed().map((r) =>{
  // {console.log('chickensss',r)}
      return( <div key ={r.id}>
        <div className="review-box">
  <div className="starName">
        <div >{<StarRatingSingleReview stars={r.stars} />}</div>
           {r.User ?<div className="username">{`  - ${r.User?.firstName} `}</div>:null}
           </div>
           <script>
            { str= r.createdAt?.split('-')}
           </script>
           <div className="date">{`${months[new Date(r.createdAt).getMonth()]}, ${r?.createdAt.slice(0,4)}`}</div>
          <div className="text">{r.review}</div>
          {openModal1 && user.user && user.user.id == r.userId &&<EditReview closeModal = {setOpenModal1} r={r} rev={r.review} star={r.stars} spotId={spotId}/>}
          <div className='contforeditreviewbuttons'>
          {(user.user ?user.user.id : Infinity) === r.userId ? <button  onClick={()=>setOpenModal1(true)}>
            Edit Review
          </button> : null
            }
          {(user.user ?user.user.id : Infinity) === r.userId ? <button  onClick={()=>setOpenModal2(true)}>
            Delete Review
          </button> : null
            }</div>
          {openModal2 && user.user && user.user.id == r.userId &&<DeleteReviewModal closeDeleteModal = {setOpenModal2} reviewId = {r.id} spotId={r.spotId}/>}
          </div>
        </div>)
     })}

    </>
  );
};

  export default SpotReview;
