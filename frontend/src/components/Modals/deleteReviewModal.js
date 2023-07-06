
import { useDispatch } from "react-redux";
import { deleteReview } from "../../store/review";
import './deleteSpotModal.css'
const DeleteReviewModal = ({reviewId, closeDeleteModal}) =>{
    const dispatch = useDispatch();
    const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(deleteReview(reviewId))
    closeDeleteModal(false)
  };
    return (
        <div className="modalBackground">
            <div className= "modalCont">
                <h2>Confirm Delete</h2>
                <h4>Are you sure you want to remove this spot?</h4>
                <button onClick ={handleDelete}>Yes (Delete Review)</button>
                <button onClick = {() =>closeDeleteModal(false)}>No (Keep Review)</button>
            </div>
        </div>
    )
}

export default DeleteReviewModal
