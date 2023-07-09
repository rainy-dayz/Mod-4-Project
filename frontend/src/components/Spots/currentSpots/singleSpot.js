
import { useState } from "react";
import { useHistory } from 'react-router-dom';
import DeleteModal from '../../Modals/deleteSpotModal';
import "./spots.css"

// import SpotReview from "../../Review/reviewForSpot"
const SingleSpot = ({spot, setCount,count }) =>{
    const [openModal,setOpenModal] = useState(false)
    const history = useHistory()

return (
  <>
<div className="singleSpotcont">
          <div className="tooltip" onClick={() => { history.push(`/spots/${spot.id}`)}}>
          {/* <Link to={`/spots/${spot.id}`}> */}
            {/* {spot.address} {spot.name} */}
            {/* <div class="tooltip">Hover over me */}
            <span className="tooltiptext">{spot.name}</span>
            <img className='pics'src={spot.previewImage? `${spot.previewImage}`: "https://cdn.pixabay.com/photo/2016/05/31/10/52/not-yet-1426593_1280.png"} />
            {/* <i className="fa-regular fa-star"></i> */}
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
