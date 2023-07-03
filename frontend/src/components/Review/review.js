
import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { thunkGetCurrentReviews } from '../../store/review';
import { Link, NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { deleteReview } from '../../store/review';

function CurrentReviews() {
    const dispatch = useDispatch()
    const {reviewId} = useParams()

    // const handleDelete = (e) => {
    //   e.preventDefault();
    //   dispatch(deleteReview(reviewId));
    // };

    useEffect(() => {
        dispatch(thunkGetCurrentReviews());
    }, [dispatch]);

    const reviews = useSelector(state => {
        return Object.values(state.reviews.spot)});
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
            <>
            {/* <NavLink key={review.id} to={`/reviews/${review.id}`}>
              { review.id}
              </NavLink> */}

              <h2>{review.review}</h2>
          {/* <button onClick={handleDelete}>
            Delete
          </button> */}
          </>
          )

          })}
      </main>
    )
  }

  export default CurrentReviews;
