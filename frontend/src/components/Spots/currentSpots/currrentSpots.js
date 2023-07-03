import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { thunkGetCurrentSpots,deleteSpot } from '../../../store/spots';
import { Link, NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './spots.css'

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

        // if(!Object.values(spots).length) {return}
        // console.log('SPOTS',spots[0].city)

    return (
      <main>
        <h1>Manage Spots</h1>
        <button onClick={() => { history.push(`/spots/new`)}}>Create a New Spot</button>
        {/* <Link to = '/spots/new'>Create a New Spot</Link> */}
        {/* <Link to = '/spots/:spotId/edit'>Edit a Spot</Link> */}
        <div>
        <div className="cards">
        {spots.map((spot) => {
          console.log('SPOTSSSSS',spot)
          return (
            <div>
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
              <p>{`$${spot.price} night`}</p>
              </div>
              <div className="buttons">
          <button onClick={() => { history.push(`/spots/${spot.id}/edit`)}}>Update</button>
          <button onClick={(e) => {
            e.preventDefault()
            return dispatch(deleteSpot(spot.id))}}>Delete</button>
          </div>
          </div>
          )

        })}
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
