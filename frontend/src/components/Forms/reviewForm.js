import React from 'react'
// import ReviewForm from '../Forms/reviewForm'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
// import { createSpot,updateSpot} from "../../store/spots";
import { thunkCreateReview } from "../../store/review";
import { thunkGetSpot } from '../../store/spots';
import './reviewModal.css'
import StarRatingInput from './starRatingInput';

// import { useSelector } from "react-redux";
const ReviewForm = ({ closeModal, formType, reviews }) => {
  const [review, setReview] = useState('')
  const [stars, setStars] = useState('')
  const [error, setErrors] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const {spotId} =useParams()

  const spot =  useSelector(state=> state.spots.spot[spotId])
  const user= useSelector(state => state.session.user)
  const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors({});
      reviews = {review,stars};
      // if (formType === "Create Review") {
          reviews = await dispatch(thunkCreateReview(spotId,reviews,user));
          await dispatch(thunkGetSpot(spotId))

      if (reviews.error) {
        setErrors(reviews.error);
      }else {
          history.push(`/spots/${spotId}`)
          closeModal(false)
      }
    };
    const onChange = (number) => {
      setStars(parseInt(number));
    };
    let disable=true
    if(review.length >9 && stars >= 1){
       disable=false
    }
  return (
    <div className="modals" >
      <form onSubmit={handleSubmit}>
            <div className="backg" >
        <h2>How was your Stay?</h2>
        <div className="errors">{error.review}</div>
        <label>
          <textarea
          rows="4" cols="50"
            placeholder="Leave your review here ..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </label>
        <div className="errors">{error.stars}</div>
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
          <div className='contforeditreviewbuttons'>
        <button className="bloop" type="submit" disabled={disable}onClick={()=>
          {
          return handleSubmit
          }}>Submit your Review</button>
              <button className="bloop" onClick={()=>
                closeModal(false)
                }>Cancel</button>
          </div>
          </div>
       </form>
          </div>

              );
            };
export default ReviewForm;
