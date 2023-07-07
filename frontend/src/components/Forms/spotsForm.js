import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSpot,thunkCreateSpotImage,updateSpot} from "../../store/spots";
import './spotForm.css'


// import { useSelector } from "react-redux";
const SpotsForm = ({ spot, formType,  }) => {
const [address, setAddress] = useState(spot.address)
const [city, setCity] = useState(spot.city)
const [state, setState] = useState(spot.state)
const [country,setCountry] = useState(spot.country)
const [lat, setLat]= useState(spot.lat)
const [lng, setLng]= useState(spot.lng)
const [name, setName]= useState(spot.name)
const [description, setDescription]= useState(spot.description)
const [price, setPrice]= useState(spot.price)
const [errors, setErrors] = useState({});
const dispatch = useDispatch();
const history = useHistory();
const [previewImage,setPreviewImage] = useState('')
const [previewImageErrors, setPreviewImageErrors] = useState({})
const [previewImageErrors2, setPreviewImageErrors2] = useState({})
const [previewImage2,setPreviewImage2] = useState('')
const [hasSubmitted, setHasSubmitted] = useState(false)
// const [previewImage4,setPreviewImage4] = useState('')
// const [previewImage5,setPreviewImage5] = useState('')
console.log('this is error',errors)
// useEffect(()=>{
// const errors = {}
// if(previewImage.length === 0) errors.previewImage = 'Preview image is required'
// if(!previewImage.endsWith('.jpg'))
// setErrors(errors)
// },[previewImage,previewImage2])
let disabled = true
useEffect(()=>{
  let errors = {};
  setErrors({});
  if(!address) {errors.address = "Must have a valid address"}
  if(!city) {errors.city = "Must have a valid city"}
  if(!state) {errors.state = "Must have a valid state"}
  if(!country) {errors.country = "Must have a valid country"}
  if(!name) {errors.name = "Must have a valid name"}
  if(!description || description.length<30){errors.description = "Must have a valid description"}
  if(price < 1) {errors.price = "Must have a valid price"}
  if(formType === "Create Spot"){
   if(!previewImage) {errors.previewImage = "Must have a valid url"}
  }
  // if(hasSubmitted){

    setErrors(errors);
  // }
},[address, city, state, country, name, description, price, previewImage]);

const handleSubmit = async (e) => {
  e.preventDefault();
// setHasSubmitted(true)
  // if(Object.values(error).length)return

  setErrors({});
  spot = { ...spot, address, city, state,country, lat,lng,name,description, price};
  if (formType === "Update Spot") {
    spot = await dispatch(updateSpot(spot));
        } else if (formType === "Create Spot") {
            spot = await dispatch(createSpot(spot));
              await dispatch (thunkCreateSpotImage(spot.id, previewImage))


            // if (spot.error) {
            //   return setErrors(spot.error)
            // }

            //   // console.log('image',image)
            //   if(image.errors === undefined)return null
            //   if (image.errors) {
            //     console.log('made it here ')
            //     return setErrors(image.errors)
            //   }
            // }else{
            //   setPreviewImageErrors({previewImage:'Preview image is required'})
            // }


            // if(previewImage2.includes('.jpg') || previewImage2.includes('.jpeg') || previewImage2.includes('.png')){
            //   dispatch (thunkCreateSpotImage(spot.id, previewImage2))
            // }else{
            //   setPreviewImageErrors2({previewImage2:'Image must include .png, .jpg, .jpeg'})
            // }
            //  dispatch (thunkCreateSpotImage(spot.id, previewImage3))
            //  dispatch (thunkCreateSpotImage(spot.id, previewImage4))
            //  dispatch (thunkCreateSpotImage(spot.id, previewImage5))
            // setUrl(image.url)
          // if(image.error) setErrors(image.error)
          // if(image === undefined)return null
          }

    // if (spot.error) {
    //   setErrors(spot.error)
      // setPreviewImageErrors(previewImage.previewImageErrors)
    // }else {
        history.push(`/spots/${spot.id}`)

    // }
    // else {
        // history.push(`/spots/${spot.id}`);
    //   }
  };
  // let disable=true
  // if(previewImage!==""){
  //   disable=false
  // }
//   if (!formType === "Update Spot")
//   const spots =useSelector(state => {
//     return state})
// if(image.errors === undefined)return null
return (
    <form className = "form" onSubmit={handleSubmit}>
      <h2>{formType}</h2>
      <div className = "address-info">
      <div className="header-info">
      <h4>Where's your place located?</h4>
      <h5>Guests will only get exact address once they have booked a reservation.</h5>
      </div>
      <div >
      <label>
        Country <div className="errors">{errors.country}</div>
        <input
          type="text"
          size="50"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </label>
      </div>
      <div>
      <label>
        Street Address
      <div className="errors">{errors.address}</div>
        <input
          type="text"
          size="50"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>
      </div>
      <div className="latLng">
      <label>City
        <div className="errors">{errors.city}</div>
        <input
          type="text"
          size="22"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        </label>
      <label>State
      <div className="errors">{errors.state}</div>
        <input
          type="text"
          size="22"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          />
          </label>
       </div>
      <div className="latLng">
      <label>
        Latitude
      <div className="errors">{errors.lat}</div>
        <input
          type="number"
          // min="-90" max="90"
          step="any"
          placeholder="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />
      </label>
      <label>
        Longitude
      <div className="errors">{errors.lng}</div>
        <input
          type="number"
          // min="-180" max="180"
          step="any"
          placeholder="Longitude"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
        />
      </label>
       </div>
       </div>
      <div className = "address-info">
      <label>
        <div className="info">
        <h4>Describe your place to guests</h4>
        <h5>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</h5>
        </div>
        <textarea
          type="text"
          rows="8" cols="43"
          placeholder="Please write at least 30 characters"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      <div className="errors">{errors.description}</div>
      </label>
       </div>
      <div className = "address-info">
      <label>
        <div className= "info">
      <h4>Create a title for your spot</h4>
        <h5>Catch guests' attention with a spot title that highlights what makes your place special</h5>
        </div>
        <input
          type="text"
          placeholder="Name of your spot"
          size="50"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      <div className="errors">{errors.name}</div>
      </label>
       </div>
      <div className = "address-info">
      <label className="price">
      <div className= "price-info">
        <div className= "info">
      <h4>Set a base price for your spot</h4>
        <h5>Competitive pricing can help your listing stand out and rank higher in search results.</h5>
        </div>
        <div className="price-input-line">
        $
        <input
        className="price-input"
          type="number"
          placeHolder="Price per night (USD)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        </div>
      <div className="errors">{errors.price}</div>
        </div>
      </label>
       </div>
       {formType==="Create Spot" ?
       <div className="address-info">
       <div>
      <label>
      <div className= "info">
      <h4>Liven up your spot with photos</h4>
        <h5>Submit a link to at least one photo to publish your spot.</h5>
        </div>
        <input
          type="text"
          size="50"
          placeholder="Preview Image Url"
          value={previewImage}
          onChange={(e) => setPreviewImage(e.target.value)}
        />
       <div className="errors">{errors.previewImage}</div>
      </label>
       </div>
       <div>
      <label>
        <input
          // type="text"
          size="50"
          placeholder="Image URL"
          // value={previewImage2}
          // onChange={(e) => setPreviewImage2(e.target.value)}
        />
      {/* <div className="errors">{previewImageErrors2.previewImage2}</div> */}
      </label>
       </div>
       <div>
      <label>
        <input
          // type="url"
          size="50"
          placeholder="Image URL"
          // value={previewImage3}
          // onChange={(e) => setPreviewImage3(e.target.value)}
        />
      </label>
       </div>
       <div>
      <label>
        <input
          // type="url"
          size="50"
          placeholder="Image URL"
          // value={previewImage4}
          // onChange={(e) => setPreviewImage4(e.target.value)}
        />
      </label>
       </div>
       <div >
      <label>
        <input
          // type="url"
          size="50"
          placeholder="Image URL"
          // value={previewImage5}
          // onChange={(e) => setPreviewImage5(e.target.value)}
        />
      </label>
       </div>
       </div>
       :null}
       <div className="btn-cont">
      <button disabled={Object.values(errors).length}type="submit">{formType}</button>
      </div>

    </form>
  );
};

export default SpotsForm;