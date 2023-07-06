import DeleteReviewModal from "../../Modals/deleteReviewModal"
import { useState } from "react";
// import SpotReview from "../../Review/reviewForSpot"
const SingleReview = ({r}) =>{
    const [openModal,setOpenModal] = useState(false)
  if(Object.values(r).length<1) return null
    console.log('this is r',r)
    let str= r.createdAt.split('-')
return (
<>
           <h2>{`${r.User.firstName} `}</h2>
            <hs>{`${str[1]} - ${str[0]}`}</hs>
          <h2>{r.review}</h2>
          <h2>{`stars ${r.stars}`}</h2>
          {/* <h2>{r.id}</h2> */}
          <h2>{`${r.spotId} Spot Id `}</h2>
          <button  onClick={()=>setOpenModal(true)}>
            Delete Review{r.id}
          </button>
          {openModal && <DeleteReviewModal closeDeleteModal = {setOpenModal} reviewId = {r.id}/>}
          </>
)
}
export default SingleReview
