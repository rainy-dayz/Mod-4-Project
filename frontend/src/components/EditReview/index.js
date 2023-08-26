import React, { useEffect } from 'react'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

import StarRatingInput from '../Forms/starRatingInput';


import {thunkGetSpotReviews, updateReview } from '../../store/review';
import { thunkGetSpot } from '../../store/spots';

const EditReview = ({ closeModal,r,rev,star,spotId}) => {
const [review, setReview] = useState(rev)
const [stars, setStars] = useState(star)
  const [error, setErrors] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const user= useSelector(state => state.session.user)

console.log('what is r anyway',r)

  const handleSubmit = async (e) => {
      e.preventDefault();
      // setErrors({});
      const data = {review,stars,userId:r.userId}

      await dispatch(updateReview(r.id,data,spotId));
      dispatch(thunkGetSpot(spotId))


          closeModal(false)

    };
    const onChange = (number) => {
      setStars(number);
    };

    useEffect(() => {
      setReview(r.review)
      setStars(r.stars)
  },[])
    let disable=true
    if(review.length >6 && stars >= 1){
       disable=false
    }

  return (
    <div className="modals" >
      <form onSubmit={handleSubmit}>
            <div className="backg" >
            <h2>How was your Stay?</h2>
        {/* <div className="errors">{error.review}</div> */}
        <label>
          <textarea
          rows="4" cols="50"
            placeholder="Leave your review here ..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </label>
        {/* <div className="errors">{error.stars}</div> */}
        <div className="stars">
        <label className='stars'>
        <StarRatingInput
          disabled={false}
          onChange={onChange}
          stars={stars}
          />
          Stars
        </label>
          </div>
          <div className='bttninreviewmodal'>
              <button className="cancelreviewmodal" onClick={()=>
                closeModal(false)
                }>Cancel</button>
        <button  className="submitreviewmodal"  disabled={disable} type="submit" onClick={handleSubmit}>Submit your Review</button>
          </div>
          </div>
       </form>
          </div>

              );
            };
export default EditReview;
