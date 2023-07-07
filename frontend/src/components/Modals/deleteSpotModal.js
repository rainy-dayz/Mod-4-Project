
import { useDispatch } from "react-redux";

import { deleteSpot } from "../../store/spots";
import './deleteSpotModal.css'
const DeleteModal = ({spot, closeDeleteModal}) =>{
    const dispatch = useDispatch();
    const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(deleteSpot(spot.id))
    closeDeleteModal(false)

  };
    return (
        <div className="modalBackground">
            <div className= "modalCont">
                <h2>Confirm Delete</h2>
                <h4>Are you sure you want to remove this spot?</h4>
                <button className="yes" onClick ={handleDelete}>Yes (Delete Spot)</button>
                <button className="no" onClick = {() =>closeDeleteModal(false)}>No (Keep Spot)</button>
            </div>
        </div>
    )
}

export default DeleteModal
