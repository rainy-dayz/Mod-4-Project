
import { useState } from "react";
import { useHistory } from 'react-router-dom';
import DeleteModal from '../../Modals/deleteSpotModal';
import "./spots.css"
import { useSelector } from "react-redux";

// import SpotReview from "../../Review/reviewForSpot"
const SingleSpot = ({spot }) =>{
    const [openModal,setOpenModal] = useState(false)
    const history = useHistory()
    const spotImg = useSelector(state => state.spots.spot)
  console.log('this is spotImg',spotImg)
return (
  <>
<div className="singleSpotcont">
          <div className="tooltip" onClick={() => { history.push(`/spots/${spot.id}`)}}>

            <span className="tooltiptext">{spot.name}</span>
            <img className='pics'src={spot.previewImage} />
            {console.log('this is a spot',spot)}
            <div className="top">
            <p>{`${spot.city}, ${spot.state}`}</p>
            <p><span><i className="fa-solid fa-star"></i></span>{spot.avgRating ? `${spot.avgRating.toFixed(1)}`: "New"}</p>
            </div>
            <p>{`$${spot.price} night`}</p>
            </div>
            <div className="buttons">
        <button onClick={() => { history.push(`/spots/${spot.id}/edit`)}}>Update</button>
        <button  onClick={()=>setOpenModal(true)}>
          Delete
        </button>
          {openModal && <DeleteModal closeDeleteModal = {setOpenModal} spot = {spot} />}
        {/* <button onClick={(e) => {
           e.preventDefault()
        return dispatch(deleteSpot(spot.id))}}>Delete</button> */}
        </div>
         </div>
        </>

  )
}

export default SingleSpot;
