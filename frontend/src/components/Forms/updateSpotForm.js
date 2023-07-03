import { useParams } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { thunkGetSpot } from "../../store/spots";

import SpotsForm from "./spotsForm";

const EditSpotForm = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetSpot(spotId));
}, [dispatch, spotId]);

const spot = useSelector((state) =>{
    // console.log('state', state)
    return state.spots.spot[spotId]
})
console.log('spot for update',spot)
// const spot = Object.values(spotObj)[0][0]
    // if(!Object.values(spot).length) {return null}
// const spotArr = Object.values(spot)
  // console.log('spot stuff',spot)

  if (!spot) return <>No Spot Found </>;


  return (
    <>
<SpotsForm spot={spot} formType="Update Spot" />


    </>
  );
};

export default EditSpotForm;
