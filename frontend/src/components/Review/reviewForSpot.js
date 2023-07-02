import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetSpotReviews } from "../../store/review";
import { deleteSpot } from "../../store/spots";


const SpotReview = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState()

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteSpot(spotId));
  };

  useEffect(() => {
    const error = async() => {
        const error = await dispatch(thunkGetSpotReviews(spotId));
        setErrors(error)
    }
    error()
}, [dispatch, spotId]);

const spotReview =Object.values(useSelector((state) =>{
    // console.log('state', state)
    return state.reviews.spot
}))
// const spot = Object.values(spotObj)[0][0]
    if(!Object.values(spotReview).length) {return <>Spot does not exist</>}
// const spotArr = Object.values(spot)
//   console.log('spot stuff',spot)

//   if (!spotReview.id) {return <>Spot does not exist</>};
// if (spot.error) {
//     const err = setErrors(spot.error);
//     console.log(err)
//   }
// if(!spot || !spot.id) return null
  return (
    <>{spotReview.map((r) => {
        return (
            <>
          <h2>{r.review}</h2>
          <h2>{r.spotId}</h2>
          </>
        )

        })}
    <h1>ch</h1>
    <button onClick={handleDelete}>
            Delete
          </button>
    </>
  );
};

  export default SpotReview;
