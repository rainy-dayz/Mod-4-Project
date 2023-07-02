import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getSpots } from '../store/spots';

function Spots() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch]);

    const spots = useSelector(state => {
        console.log('infoish',state.spots)
        return Object.values(state.spots)});
    // if(!Object.values(spots).length) {return null}
    // const welp = Object.values(spots)
        // console.log(welp)
    return (
      <div>
        {spots.map(spot => {
            return<h2 key = {spot.id}>{`${spot.city}`}</h2>
        })}
        {/* {`${spots}`} */}
      </div>
    )
  }

  export default Spots;
