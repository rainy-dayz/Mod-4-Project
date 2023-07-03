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
        // console.log('SPOTS',spots[0].city)
    return (
      <div>

        {/* <Link to= '/spots/current'>Manage Spots</Link> */}
        {/* <Link to = '/spots/new'>Create a New Spot</Link> */}
        {/* <Link to = '/spots/:spotId/edit'>Edit a Spot</Link> */}
        <div className="cards">
        {spots.map((spot) => {
          console.log('SPOTSSSSS',spot)
          return (
            <div className="tooltip" onClick={() => { history.push(`/spots/${spot.id}`)}}>
            {/* <Link to={`/spots/${spot.id}`}> */}
              {/* {spot.address} {spot.name} */}
              {/* <div class="tooltip">Hover over me */}
              <span className="tooltiptext">{spot.name}</span>
              <img className='pics'src={spot.previewImage} />
              <i className="fa-regular fa-star"></i>
              <div className="top">
              <p>{`${spot.city}, ${spot.state}`}</p>
              <p>{`${spot.avgRating}`}</p>
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
