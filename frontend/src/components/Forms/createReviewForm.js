import ReviewForm from "./reviewForm";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useEffect } from "react";

const CreateReviewForm = () => {

  const reviews = {
    review:'',
    stars:''
  };


  return (
    <ReviewForm
      reviews={reviews}
      formType="Create Review"
    />
  );
};

export default CreateReviewForm;
