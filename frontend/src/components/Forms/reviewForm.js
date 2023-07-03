import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
// import { createSpot,updateSpot} from "../../store/spots";
import { thunkCreateReview } from "../../store/review";
// import { useSelector } from "react-redux";
const ReviewForm = ({  formType, reviews }) => {
const [review, setReview] = useState(reviews.review)
const [stars, setStars] = useState(reviews.stars)
const [error, setErrors] = useState({});
const dispatch = useDispatch();
const history = useHistory();
const {spotId} =useParams()

const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    reviews = { ...reviews, review,stars};
    console.log('reviews',reviews)
    if (formType === "Create Review") {
        reviews = await dispatch(thunkCreateReview(spotId,reviews));
        // console.log('create spot',spot)

// } else if (formType === "Update Spot") {
//           spot = await dispatch(updateSpot(spot));
//           console.log('update spot',spot)

    }

    if (reviews.error) {
      const err = setErrors(reviews.error);
      console.log(err)
    }else {
        history.push(`/spots/${spotId}`)
    }
    setReview('')
    setStars('')


    // else {
    //     history.push(`/spots/${spot.id}`);
    //   }
  };
//   if (!formType === "Update Spot")
//   const spots =useSelector(state => {
//     console.log(state)
//     return state})
return (
    <form onSubmit={handleSubmit}>
      <h2>{formType}</h2>
      <div className="errors">{error.review}</div>
      <label>
        Review:
        <input
          type="text"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </label>
      <div className="errors">{error.stars}</div>
      <label>
        Stars:
        <input
          type="number"
          value={stars}
          onChange={(e) => setStars(e.target.value)}
        />
      </label>
    <h2>{spotId}</h2>
      <button type="submit">{formType}</button>

    </form>
  );
};

export default ReviewForm;
