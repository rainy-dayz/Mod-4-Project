import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { thunkGetCurrentSpots,deleteSpot } from '../../../store/spots';
import { Link, NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './spots.css'
// import DeleteModal from '../../Modals/deleteSpotModal';
import SingleSpot from './singleSpot';


function CurrentSpots() {
    const dispatch = useDispatch()
    const history = useHistory()

    // const handleDelete = (e) => {
      //   e.preventDefault();
      //   dispatch(deleteSpot(spotId));
    // };


    useEffect(() => {
      dispatch(thunkGetCurrentSpots());
    }, [dispatch]);

    const spots = useSelector(state => {
      return Object.values(state.spots.allSpots)});


        // if(!spots) {return<Link to = '/spots/new'>Create a New Spot</Link>}



    return (
      <main>
        <h1>Manage Spots</h1>
        {!spots.length ?<button onClick={() => { history.push(`/spots/new`)}}>Create a New Spot</button>: null}
        {/* <Link to = '/spots/new'>Create a New Spot</Link> */}
        {/* <Link to = '/spots/:spotId/edit'>Edit a Spot</Link> */}
        <div>
        <div className="cards">
        {spots.map((spot) =>
          // return (
          //   <div>
          //   <div className="tooltip" onClick={() => { history.push(`/spots/${spot.id}`)}}>
          //   {/* <Link to={`/spots/${spot.id}`}> */}
          //     {/* {spot.address} {spot.name} */}
          //     {/* <div class="tooltip">Hover over me */}
          //     <span className="tooltiptext">{spot.name}</span>
          //     <img className='pics'src={spot.previewImage? `${spot.previewImage}`: "https://cdn.pixabay.com/photo/2016/05/31/10/52/not-yet-1426593_1280.png"} />
          //     {/* <i className="fa-regular fa-star"></i> */}
          //     <div className="top">
          //     <p>{`${spot.city}, ${spot.state}`}</p>
          //     <p><span><i class="fa-solid fa-star"></i></span>{spot.avgRating ? `${spot.avgRating.toFixed(1)}`: "New"}</p>
          //     </div>
          //     <p>{`$${spot.price} night`}</p>
          //     </div>
          //     <div className="buttons">
          // <button onClick={() => { history.push(`/spots/${spot.id}/edit`)}}>Update</button>
          // <button  onClick={()=>setOpenModal(true)}>
          //   Delete
          // </button>
          //   {openModal && <DeleteModal closeDeleteModal = {setOpenModal} spot = {spot}/>}
          // {/* <button onClick={(e) => {
          //    e.preventDefault()
          // return dispatch(deleteSpot(spot.id))}}>Delete</button> */}
          // </div>
          // </div>
          // )
          <SingleSpot spot={spot} />
        )}
        </div>
        </div>
        {/* {spots.map((spot) => {
          return (
            <NavLink key={spot.id} to={`/spots/${spot.id}`}>
              {spot.ownerId}
              </NavLink>
          )

          })} */}
      </main>
    )
  }

  export default CurrentSpots;
