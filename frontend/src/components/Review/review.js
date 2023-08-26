
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

        if(!reviews) return  <></>
    return (
      <main>

        {reviews.map((review) => {
          return (
            <>
            


              <h2>{review.review}</h2>

          </>
          )

          })}
      </main>
    )
  }

  export default CurrentReviews;
