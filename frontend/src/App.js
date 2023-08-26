import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/Spots/currentSpots/spots";
import CreateSpotsForm from "./components/Forms/createSpotsForm";
import EditSpotForm from "./components/Forms/updateSpotForm";
import SpotInfo from "./components/Spot/spot";
import CurrentSpots from "./components/Spots/currentSpots/currrentSpots";
import CurrentReviews from "./components/Review/review";
import SpotReview from "./components/Review/reviewForSpot";
import CreateReviewForm from "./components/Forms/createReviewForm";
import CurrentBookings from "./components/Bookings";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch>
        <Route exact path ='/'>
          <Spots />
        </Route>
        <Route exact path="/spots/new" >
          <CreateSpotsForm />
          </Route>
          <Route exact path='/spots/:spotId/review' >
          <CreateReviewForm />
          </Route>
          <Route exact path="/reviews/current/:reviewId" >
          <CurrentReviews />
          </Route>
          <Route exact path="/spots/current" >
          <CurrentSpots/>
          </Route>
          <Route exact path="/bookings/current" >
          <CurrentBookings/>
          </Route>
          <Route exact path ='/spots/:spotId'>
          <SpotInfo />
        </Route>
        <Route exact path ='/spots/:spotId/reviews'>
          <SpotReview />
        </Route>
        <Route exact path="/spots/:spotId/edit" >
          <EditSpotForm />
        </Route>
        </Switch>}
    </>
  );
}

export default App;
