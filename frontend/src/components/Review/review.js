
import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { thunkGetCurrentReviews } from '../../store/review';
import { Link, NavLink } from 'react-router-dom';

function CurrentReviews() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkGetCurrentReviews());
    }, [dispatch]);

    const reviews = useSelector(state => {
        return Object.values(state.reviews.users)});
        if(!Object.values(reviews).length) {return null}
        // console.log('SPOTS',spots[0].city)

        if(!reviews) return  <></>
    return (
      <main>
        {/* <h1>Manage Spots</h1>
        <Link to = '/spots/new'>Create a New Spot</Link>
        <Link to = '/spots/:spotId/edit'>Edit a Spot</Link> */}
        {reviews.map((review) => {
          return (
            <NavLink key={review.id} to={`/reviews/${review.id}`}>
              {review.userId}
              </NavLink>
          )

          })}
      </main>
    )
  }

  export default CurrentReviews;
