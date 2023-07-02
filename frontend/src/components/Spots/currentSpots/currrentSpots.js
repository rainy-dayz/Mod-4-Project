import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { thunkGetCurrentSpots } from '../../../store/spots';
import { Link, NavLink } from 'react-router-dom';

function CurrentSpots() {
    const dispatch = useDispatch()

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
        <Link to = '/spots/new'>Create a New Spot</Link>
        <Link to = '/spots/:spotId/edit'>Edit a Spot</Link>
        {spots.map((spot) => {
          return (
            <NavLink key={spot.id} to={`/spots/${spot.id}`}>
              {spot.ownerId}
              </NavLink>
          )

          })}
      </main>
    )
  }

  export default CurrentSpots;
