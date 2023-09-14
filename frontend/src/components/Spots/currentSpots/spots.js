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
            <div className="tooltip" key={spot.id} onClick={() => { history.push(`/spots/${spot.id}`)}}>
              <span className="tooltiptext">{spot.name}</span>
              <img className='pics'src={spot.previewImage? spot.previewImage:"https://www.betel.uk/wp-content/uploads/property_placeholder.jpg"} />

              <div className="top">

              <p>{`${spot.city}, ${spot.state}`}</p>
              <p><span><i className="fa-solid fa-star"></i></span>{(spot.avgRating) ? `${spot.avgRating.toFixed(1)}`: "New"}</p>
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
