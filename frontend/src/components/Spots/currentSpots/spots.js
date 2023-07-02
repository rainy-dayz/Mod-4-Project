import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getSpots } from '../../../store/spots';
import { Link, NavLink } from 'react-router-dom';

function Spots() {
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch]);

    const spots = useSelector(state => {
        return Object.values(state.spots.allSpots)});
        if(!Object.values(spots).length) {return null}
        // console.log('SPOTS',spots[0].city)
    return (
      <main>
        <Link to= '/spots/current'>Manage Spots</Link>
        <Link to = '/spots/new'>Create a New Spot</Link>
        <Link to = '/spots/:spotId/edit'>Edit a Spot</Link>
        {spots.map((spot) => {
          return (
            <NavLink key={spot.id} to={`/spots/${spot.id}`}>
              {spot.address}
              </NavLink>
          )

          })}
      </main>
    )
  }

  export default Spots;
