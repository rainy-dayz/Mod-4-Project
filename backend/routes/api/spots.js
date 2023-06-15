const express = require("express");
const {
  Spot,
  SpotImage,
  User,
  Review,
  ReviewImage,
  Booking,
} = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const router = express.Router();

const validateSpot = (address,city,state,country,lat,lng,name, description, price) => {
  let error = {};
  if (!address) error.address = "Street address is required";
  if (!city) error.city = "City is required";
  if (!state) error.state = "State is required";
  if (!country) error.country = "Country is required";
  if (!Number.isNaN(lat)) error.lat = "Latitude is not valid";
  if (!Number.isNaN(lng)) error.lng = "Longitude is not valid";
  if (!name) error.name = "Name is required";
  if (name.length > 50) error.name = "Name must be less than 50 characters";
  if (!description) error.description = "Price per day is required";
  if (!price) error.price = "Price per day is required";

  if (Object.keys(error).length > 0) {
    return error;
  }
};

router.get("/", async (req, res) => {
  let answer = [];
  let spot = await Spot.findAll({
    include: [{ model: SpotImage }, { model: Review, attributes: ["stars"] }],
  });

  spot.forEach((spot) => {
    let total = 0;
    spot = spot.toJSON();
    const count = spot.Reviews.map((review) => {
      total += review.stars;
    });
    let avgRating = count.length > 0 ? total / count.length : null;
    for (let image of spot.SpotImages) {
        if(image.preview){
            spot.previewImage = image.url
            break;
          }else spot.previewImage = "no preview image"
    }
    delete spot.SpotImages;
    delete spot.Reviews;
    spot.avgRating = avgRating;
    answer.push(spot);
  });
  res.json({ Spots: answer });
});

router.get("/current", requireAuth, async (req, res) => {
  let answer = [];
  let spot = await Spot.findAll({
    where: { ownerId: req.user.dataValues.id },
    include: { model: Review },
    include: [{ model: SpotImage }, { model: Review, attributes: ["stars"] }],
  });
  spot.forEach((spot) => {
    let total = 0;
    spot = spot.toJSON();
    const count = spot.Reviews.map((review) => {
      total += review.stars;
    });
    let avgRating = count.length > 0 ? total / count.length : null;
    for (let image of spot.SpotImages) {
      if(image.preview){
        spot.previewImage = image.url
        break;
      }else spot.previewImage = "no preview image"
    }
    delete spot.SpotImages;
    delete spot.Reviews;
    spot.avgRating = avgRating;
    answer.push(spot);
  });
  res.json({ Spots: answer });
});


router.get("/:spotId/reviews", async (req, res) => {
  let spot = await Spot.findByPk(req.params.spotId, {
    attributes: [],
    include: [
      {
        model: Review,
        attributes: [
          "id",
          "spotId",
          "userId",
          "review",
          "stars",
          "createdAt",
          "updatedAt",
        ],
        include: [
          {
            model: User,
            as: "User",
            attributes: ["id", "firstName", "lastName"],
          },
          { model: ReviewImage, attributes: ["id", "url"] },
        ],
      },
    ],
  });
  if (!spot) {
    res.status(404).json({ message: "Spot couldn't be found" });
  }
  res.json(spot);
});

router.get("/:spotId", async (req, res) => {
  let answer = [];
  let spot = await Spot.findByPk(req.params.spotId, {
    include: [
      { model: SpotImage },
      { model: User, as: "Owner", attributes: ["id", "firstName", "lastName"] },
      { model: Review },
    ],
  });

  if (spot) {
    let total = 0;
    const count = spot.Reviews.map((review) => {
      total += review.stars;
    });
    let avgRating = count.length > 0 ? total / count.length : null;
    let place = spot.toJSON();
    delete place.Reviews;
    place.numReviews = count.length;
    place.avgStarRating = avgRating;
    answer.push(place);
    res.json(answer);
  } else {
    res.status(404);
    return res.json({ message: "Spot couldn't be found" });
  }
});


router.post("/:spotId/images", requireAuth, async (req, res) => {
  const { url, preview } = req.body;
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot || spot.ownerId !== req.user.dataValues.id) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
    });
  }
  const newImage = await spot.createSpotImage({
    url,
    preview,
  });

  return res.json({
    id: newImage.id,
    url: newImage.url,
    preview: newImage.preview,
  });
});


const validateReview = (review, stars) => {
  let error = {};
  if (!review) error.review = "Review text is required";
  if (!stars || stars < 0 || stars > 5)
    error.stars = "Stars must be an integer from 1 to 5";

  if (Object.keys(error).length > 0) {
    return error;
  }
};

router.post("/:spotId/reviews", requireAuth, async (req, res) => {
  const { review, stars, userId } = req.body;
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
    });
  }

  let error = validateReview(review, stars);
  if (error) {
    res.status(400);
    return res.json({ message: "Bad Request", error: error });
  }
  let reviews = await Review.findAll()

  let reviewAuth = reviews.find(review => {
    return review.userId ===req.user.dataValues.id && spot.id === review.spotId
  })
  if (reviewAuth) {
    return res.status(500).json({
      message: "User already has a review for this spot",
    });
  }
  const newImage = await spot.createReview({
    userId: req.user.dataValues.id,
    review,
    stars,
  });
  return res.status(201).json(newImage);
});

router.put("/:spotId", requireAuth, async (req, res, next) => {
  let spot = await Spot.findByPk(req.params.spotId);
  if (!spot || spot.ownerId !== req.user.dataValues.id) {
    res.status(404);
    return res.json({ message: "Spot couldn't be found" });
  }
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  let error = validateSpot(address,city,state,country,lat,lng,name, description, price)
  if (error) {
    res.status(400);
    return res.json({ message: "Bad Request", error: error });
  }
  await spot.update({
    address: address,
    city: city,
    state: state,
    country: country,
    lat: lat,
    lng: lng,
    name: name,
    description: description,
    price: price,
  });

  res.json(spot);
});

router.post("/", requireAuth, async (req, res, next) => {
  const {ownerId,address,city,state,country,lat,lng,name, description, price} = req.body;

  let error = validateSpot(address,city,state,country,lat,lng,name, description, price)
  if (error) {
    res.status(400);
    return res.json({ message: "Bad Request", error: error });
  }
  const newSpot = await Spot.create({
    ownerId: req.user.dataValues.id,address,city,state,country,lat,lng,name, description, price
  });
  res.status(201).json(newSpot);
});

router.delete("/:spotId", requireAuth, async (req, res) => {
  let spot = await Spot.findByPk(req.params.spotId);
  if (!spot || spot.ownerId !== req.user.dataValues.id) {
    res.status(404);
    return res.json({ message: "Spot couldn't be found" });
  }
  await spot.destroy();

  res.json({ message: "Successfully deleted" });
});

module.exports = router;
