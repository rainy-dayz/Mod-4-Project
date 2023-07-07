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
    return state.spots.spot[spotId]
})

  if (!spot) return <>No Spot Found </>;


  return (
    <>
<SpotsForm spot={spot} formType="Update Spot" />


    </>
  );
};

export default EditSpotForm;
