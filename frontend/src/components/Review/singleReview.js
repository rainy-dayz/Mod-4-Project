import DeleteReviewModal from "../Modals/deleteReviewModal"
import { useState } from "react";
import { useSelector } from "react-redux";
import './singleReview.css'
import StarRatingSingleReview from "./starRatingSingleReview";
// import SpotReview from "../../Review/reviewForSpot"
const SingleReview = ({r}) =>{
    const [openModal,setOpenModal] = useState(false)
    const user= useSelector(state => state.session.user)

  if(Object.values(r).length<1) return null

    let str= r.createdAt.split('-')
    const months =[ 'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October',
    'November', 'December' ]
    // if(!user) {return null}
return (
<div className="review-box">
  <div className="starName">
        <div >{<StarRatingSingleReview stars={r.stars} />}</div>
           <div className="username">{`  - ${r.User.firstName} `}</div>
           </div>
            <div className="date">{months[new Date(r.createdAt).getMonth()]}, {str[0]}</div>
          <div className="text">{r.review}</div>
          {(user ?user.id : Infinity) === r.userId ? <button  onClick={()=>setOpenModal(true)}>
            Delete Review
          </button> : null
            }
          {openModal && <DeleteReviewModal closeDeleteModal = {setOpenModal} reviewId = {r.id} spotId={r.spotId}/>}
          </div>
)
}
export default SingleReview
