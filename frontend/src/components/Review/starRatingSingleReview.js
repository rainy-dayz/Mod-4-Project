import { useEffect, useState } from "react";
import './starRatingSingleReview.css'

const StarRatingSingleReview = ({ stars }) => {
  const [activeRating, setActiveRating] = useState(stars);

  useEffect(() => {
    setActiveRating(stars);
  }, [stars]);

  const starArr= Array(5).fill(0)
  return (


    <div className="rating-input">

      <div
        className={activeRating >= 1 ? "filled" : "empty"}

      >
        <i className="fa-sharp fa-solid fa-star"></i>
      </div>
      <div
        className={activeRating >= 2 ? "filled" : "empty"}

      >
        <i className="fa-sharp fa-solid fa-star"></i>
      </div>
      <div
        className={activeRating >= 3 ? "filled" : "empty"}

      >
       <i className="fa-sharp fa-solid fa-star"></i>
      </div>
      <div
        className={activeRating >= 4 ? "filled" : "empty"}

      >
       <i className="fa-sharp fa-solid fa-star"></i>
      </div>
      <div
        className={activeRating >= 5 ? "filled" : "empty"}

      >
       <i className="fa-sharp fa-solid fa-star"></i>
      </div>
    </div>
  );
};

export default StarRatingSingleReview;
