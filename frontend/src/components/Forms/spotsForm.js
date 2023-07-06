import { useState } from "react";
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
const [error, setErrors] = useState({});
const dispatch = useDispatch();
const history = useHistory();
const [previewImage,setPreviewImage] = useState('')
const [previewImageErrors, setPreviewImageErrors] = useState({})
const [previewImageErrors2, setPreviewImageErrors2] = useState({})
const [previewImage2,setPreviewImage2] = useState('')
// const [previewImage3,setPreviewImage3] = useState('')
// const [previewImage4,setPreviewImage4] = useState('')
// const [previewImage5,setPreviewImage5] = useState('')
// console.log('previewImage',spot.SpotImages[0])

const handleSubmit = async (e) => {
  e.preventDefault();
  setErrors({});
  spot = { ...spot, address, city, state,country, lat,lng,name,description, price,previewImage};
  if (formType === "Update Spot") {
    spot = await dispatch(updateSpot(spot));
    // console.log('create image',previewImage)
    // let image = await dispatch (thunkCreateSpotImage(spot.id))
    // console.log('update spot',spot)

        } else if (formType === "Create Spot") {
          console.log('test')
            spot = await dispatch(createSpot(spot));
            if(previewImage){
              await dispatch (thunkCreateSpotImage(spot.id, previewImage))
            }else{
              setPreviewImageErrors({previewImage:'Preview image is required'})
            }


            if(previewImage2.includes('.jpg') || previewImage2.includes('.jpeg') || previewImage2.includes('.png')){
              dispatch (thunkCreateSpotImage(spot.id, previewImage2))
            }else{
              setPreviewImageErrors2({previewImage2:'Image must include .png, .jpg, .jpeg'})
            }
            //  dispatch (thunkCreateSpotImage(spot.id, previewImage3))
            //  dispatch (thunkCreateSpotImage(spot.id, previewImage4))
            //  dispatch (thunkCreateSpotImage(spot.id, previewImage5))
            // setUrl(image.url)
          // if(image.error) setErrors(image.error)
          }
    if (spot.error) {
      setErrors(spot.error);
      // console.log(err)
    }else {
        history.push(`/spots/${spot.id}`)
    }
    // else {
    //     history.push(`/spots/${spot.id}`);
    //   }
  };
//   if (!formType === "Update Spot")
//   const spots =useSelector(state => {
//     console.log(state)
//     return state})
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
        Country <div className="errors">{error.country}</div>
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
      <div className="errors">{error.address}</div>
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
        <div className="errors">{error.city}</div>
        <input
          type="text"
          size="22"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        </label>
      <label>State
      <div className="errors">{error.state}</div>
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
      <div className="errors">{error.lat}</div>
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
      <div className="errors">{error.lng}</div>
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
        <h5>Mention the best features of your amusement park!</h5>
        </div>
        <textarea
          type="text"
          rows="8" cols="43"
          placeholder="Please write at least 30 characters"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      <div className="errors">{error.description}</div>
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
      <div className="errors">{error.name}</div>
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
        </div>
      <div className="errors">{error.price}</div>
      </label>
       </div>
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
       <div className="errors">{previewImageErrors.previewImage}</div>
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
      <div className="errors">{previewImageErrors2.previewImage2}</div>
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
       <div className="btn-cont">
      <button type="submit">{formType}</button>
      </div>

    </form>
  );
};

export default SpotsForm;
