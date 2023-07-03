import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SpotReview from "../Review/reviewForSpot";
import { thunkGetSpot, deleteSpot } from "../../store/spots";



const SpotInfo = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState()

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteSpot(spotId));
  };

  useEffect(() => {
    const error = async() => {
        const error = await dispatch(thunkGetSpot(spotId));
        setErrors(error)
    }
    error()
}, [dispatch, spotId]);

const spot = useSelector((state) =>{
    // console.log('state', state)
    return state.spots.spot[spotId]
})
// const spot = Object.values(spotObj)[0][0]
    // if(!Object.values(spot).length) {return null}
// const spotArr = Object.values(spot)
  console.log('spot stuff',spot)

  if (!spot) return <></>;
// if (spot.error) {
//     const err = setErrors(spot.error);
//     console.log(err)
//   }
if(!spot || !spot.id) return null
  return (
    <>
    <p>{spot.name}</p>
    <p>{spot.address}</p>
    <p>{spot.city}</p>
    <p>{spot.state}</p>
    <p>{spot.description}</p>
    <p>{spot.price}</p>
    {/* <Link to={`/spots/${spotId}/reviews`}>Reviews</Link> */}
    <Link to={`/spots/${spotId}/review`}>Create Review</Link>
    <SpotReview spotId={spotId} />
    <button onClick={handleDelete}>
            Delete
          </button>
    </>
  );
};

  export default SpotInfo;
