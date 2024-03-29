import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSpot,thunkCreateSpotImage,updateSpot, thunkCreateSpotImage2} from "../../store/spots";
import './spotForm.css'


// import { useSelector } from "react-redux";
const SpotsForm = ({ spot, formType,  }) => {
const [address, setAddress] = useState(spot.address)
const [city, setCity] = useState(spot.city)
const [state, setState] = useState(spot.state)
const [country,setCountry] = useState(spot.country)
const [lat, setLat]= useState(22)
const [lng, setLng]= useState(22)
const [name, setName]= useState(spot.name)
const [description, setDescription]= useState(spot.description)
const [price, setPrice]= useState(spot.price)
const [errors, setErrors] = useState({});
const dispatch = useDispatch();
const history = useHistory();
// const [previewImage,setPreviewImage] = useState('')
// const [previewImage3, setPreviewImage3] = useState('')
// const [previewImage2,setPreviewImage2] = useState('')
const [hasSubmitted, setHasSubmitted] = useState(false)
// const [previewImage4,setPreviewImage4] = useState('')
// const [previewImage5,setPreviewImage5] = useState('')
const [images, setImages] = useState([]);

let disabled = true
useEffect(()=>{
  let errors = {};
  setErrors({});
  if(!address) {errors.address = "Address is required"}
  if(!city) {errors.city = "City is required"}
  if(!state) {errors.state = "State is required"}
  if(!country) {errors.country = "Country is required"}
  if(!name) {errors.name = "Name is required"}
  if(!description || description.length<30){errors.description = "Description needs 30 or more characters"}
  if(price < 1) {errors.price = "Price per night is required"}
  if(formType === "Create Spot"){
   if(images.length>5) {errors.images = "Max 5 images"}
  // if(!previewImage.endsWith('.jpg') && !previewImage.endsWith('.jpeg') && !previewImage.endsWith('.png')) {errors.previewImage = "Image is required and must be jpg, jpeg, png"}
  // if(previewImage2 !== ""&& (!previewImage2.endsWith('.jpg') && !previewImage2.endsWith('.jpeg') && !previewImage2.endsWith('.png'))) {errors.previewImage2 = "Image must be jpg, jpeg, png"}

  }
  // if(hasSubmitted){

    setErrors(errors);
  // }
},[address, city, state, country, name, description, price,images]);

const handleSubmit = async (e) => {
  e.preventDefault();
setHasSubmitted(true)
  if(Object.values(errors).length)return
  setErrors({});
  spot = { ...spot, address, city, state,country, lat,lng,name,description, price};
  if (formType === "Update Spot") {
    spot = await dispatch(updateSpot(spot));
        } else if (formType === "Create Spot") {
            spot = await dispatch(createSpot(spot));
              await dispatch (thunkCreateSpotImage(images,spot.id))
            //   await dispatch (thunkCreateSpotImage2(spot.id, previewImage2))
            //    await dispatch (thunkCreateSpotImage2(spot.id, previewImage3))
            //  await dispatch (thunkCreateSpotImage2(spot.id, previewImage4))
            //  await dispatch (thunkCreateSpotImage2(spot.id, previewImage5))
          }
        history.push(`/spots/${spot.id}`)
  };

const updateFiles = e => {
  const files = e.target.files;
  setImages(files);
};
return (
    <form className = "form" onSubmit={handleSubmit}>
      <h2>{formType}</h2>
      <div className = "address-info">
      <div className="header-info">
      <h4>Where's your themepark located?</h4>
      <h5>Guests will only get exact address once they have booked a reservation.</h5>
      </div>
      <div >
      <label>
        Country {hasSubmitted && <div className="errors">{errors.country}</div>}
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
      {hasSubmitted && <div className="errors">{errors.address}</div>}
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
        {hasSubmitted &&<div className="errors">{errors.city}</div>}
        <input
          type="text"
          size="23"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        </label>
      <label>State
      {hasSubmitted &&<div className="errors">{errors.state}</div>}
        <input
          type="text"
          size="22"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          />
          </label>
       </div>

       </div>
      <div className = "address-info">
      <label>
        <div className="info">
        <h4>Describe your thempark to guests</h4>
        <h5>Mention the best features of your themepark!</h5>
        </div>
        <textarea
          type="text"
          rows="8" cols="43"
          placeholder="Please write at least 30 characters"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      {hasSubmitted &&<div className="errors">{errors.description}</div>}
      </label>
       </div>
      <div className = "address-info">
      <label>
        <div className= "info">
      <h4>Themepark Name</h4>
        <h5>Catch guests' attention with your themepark's name!</h5>
        </div>
        <input
          type="text"
          placeholder="Name of your spot"
          size="50"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      {hasSubmitted &&<div className="errors">{errors.name}</div>}
      </label>
       </div>
      <div className = "address-info">
      <label className="price">
      <div className= "price-info">
        <div className= "info">
      <h4>Set a base price for your themepark</h4>
        <h5>Competitive pricing can help your listing stand out and rank higher in search results.</h5>
        </div>
        <div className="price-input-line">
        $
        <input
        className="price-input"
          type="number"
          placeholder="Price per night (USD)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        </div>
      {hasSubmitted &&<div className="errors">{errors.price}</div>}
        </div>
      </label>
       </div>


{hasSubmitted && <div className="errors">{errors.images}</div>}
{formType==="Create Spot" ?
<div className="address-info">
       <div>
      <label>
      <div className= "info">
      <h4>Liven up your themepark with photos</h4>
        <h5>Upload up to 5 photos of your themepark!</h5>
        </div>
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            multiple
            onChange={updateFiles} />
        </label>
         </div>
      </div>:null}
       <div className="btn-cont">
      <button className="submitBtn" type="submit">{formType}</button>
      </div>

    </form>
  );
};

export default SpotsForm;
