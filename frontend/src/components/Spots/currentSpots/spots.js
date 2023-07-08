import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getSpots } from '../../../store/spots';
import { Link, NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './spots.css'

function Spots() {
    const dispatch = useDispatch()
    const history = useHistory()



    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch]);

    const spots = useSelector(state => {
        return Object.values(state.spots.allSpots)});
        if(!Object.values(spots).length) {return null}

    return (
      <div>

        {/* <Link to= '/spots/current'>Manage Spots</Link> */}
        {/* <Link to = '/spots/new'>Create a New Spot</Link> */}
        {/* <Link to = '/spots/:spotId/edit'>Edit a Spot</Link> */}
        <div className="cards">
        {spots.map((spot) => {

          return (
            <div className="tooltip" onClick={() => { history.push(`/spots/${spot.id}`)}}>
            {/* <Link to={`/spots/${spot.id}`}> */}
              {/* {spot.address} {spot.name} */}
              {/* <div class="tooltip">Hover over me */}
              <span className="tooltiptext">{spot.name}</span>
              <img className='pics'src={spot.previewImage? `${spot.previewImage}`: "https://cdn.pixabay.com/photo/2016/05/31/10/52/not-yet-1426593_1280.png"} />

              <div className="top">
              <p>{`${spot.city}, ${spot.state}`}</p>
              <p><span><i class="fa-solid fa-star"></i></span>{spot.avgRating ? `${spot.avgRating}`: "New"}</p>
              </div>
              <p>{`$${spot.price} per night`}</p>
              </div>
          )

        })}
        </div>
      </div>
    )
  }

  export default Spots;
