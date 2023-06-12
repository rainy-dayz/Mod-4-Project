const express = require('express');
const { Spot,SpotImage,User,Review } = require('../../db/models');
// const { requireAuth} = require("../../utils/validation");

const router = express.Router();

const validateSpot = (address,city,state,country,lat,lng,name, description, price) => {

    let error = {}
    if(!address) error.address="Street address is required"
    if(!city) error.city="City is required"
    if(!state) error.state="State is required"
    if(!country) error.country="Country is required"
    if(Number.isNaN(lat)) error.lat="Latitude is not valid"
    if(Number.isNaN(lng)) error.lng="Longitude is not valid"
    if(!name) error.name="Name is required"
    if(name.length > 50) error.name="Name must be less than 50 characters"
    if(!description) error.description="Price per day is required"
    if(!price) error.price="Price per day is required"

    if (Object.keys(error).length > 0){
        return error
    }
}


router.post('/', async(req, res, next) => {
    const {ownerId,address,city,state,country,lat,lng,name, description, price}=req.body

let error = validateSpot(address,city,state,country,lat,lng,name, description, price)
if(error){
    res.status(400)
    return res.json(error)
}
    const newSpot = await Spot.create({
        ownerId,address,city,state,country,lat,lng,name, description, price
    })
    res.json(newSpot)
})


module.exports = router;
