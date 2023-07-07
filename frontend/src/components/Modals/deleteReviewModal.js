
import { useDispatch } from "react-redux";
import { deleteReview } from "../../store/review";
import './deleteSpotModal.css'
import { thunkGetSpot } from "../../store/spots";
const DeleteReviewModal = ({reviewId, closeDeleteModal,spotId}) =>{
    const dispatch = useDispatch();
    const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(deleteReview(reviewId))
    .then (()=> dispatch(thunkGetSpot(spotId)))
    closeDeleteModal(false)
  };
    return (
        <div className="modalBackground">
            <div className= "modalCont">
                <h2>Confirm Delete</h2>
                <h4>Are you sure you want to remove this review?</h4>
                <button className="yes"onClick ={handleDelete}>Yes (Delete Review)</button>
                <button className="no"onClick = {() =>closeDeleteModal(false)}>No (Keep Review)</button>
            </div>
        </div>
    )
}

export default DeleteReviewModal
