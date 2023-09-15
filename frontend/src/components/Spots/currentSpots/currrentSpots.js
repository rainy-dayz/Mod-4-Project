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

    useEffect(() => {
      dispatch(thunkGetCurrentSpots());
    }, [dispatch]);

    const spots = useSelector(state => {
      return Object.values(state.spots.allSpots)});


        // if(!spots) {return<Link to = '/spots/new'>Create a New Spot</Link>}



    return (
      <main>
        <h1>Manage Spots</h1>
        {!spots.length ?<button className="bloop" onClick={() => { history.push(`/spots/new`)}}>Create a New Spot</button>: null}
        {/* <Link to = '/spots/new'>Create a New Spot</Link> */}
        {/* <Link to = '/spots/:spotId/edit'>Edit a Spot</Link> */}
        <div>
        <div className="cards">
        {spots.map((spot) =>
          <SingleSpot spot={spot} />
        )}
        </div>
        </div>
      </main>
    )
  }

  export default CurrentSpots;
