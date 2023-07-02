import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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

  if (!spot) return <>Spot does not exist</>;
// if (spot.error) {
//     const err = setErrors(spot.error);
//     console.log(err)
//   }
if(!spot || !spot.id) return null
  return (
    <>
    <h2>{spot.name}</h2>
    <h3>{spot.address}</h3>
    <h3>{spot.city}</h3>
    <h3>{spot.state}</h3>
    <h3>{spot.description}</h3>
    <h3>{spot.price}</h3>
    <Link to={`/spots/${spotId}/reviews`}>Reviews</Link>
    <button onClick={handleDelete}>
            Delete
          </button>
    </>
  );
};

  export default SpotInfo;
