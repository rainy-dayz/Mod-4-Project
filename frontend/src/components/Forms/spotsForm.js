import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSpot,updateSpot} from "../../store/spots";
// import { useSelector } from "react-redux";
const SpotsForm = ({ spot, formType }) => {
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

const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    spot = { ...spot, address, city, state,country, lat,lng,name,description, price };
    if (formType === "Update Spot") {
          spot = await dispatch(updateSpot(spot));
          console.log('update spot',spot)

        } else if (formType === "Create Spot") {
            spot = await dispatch(createSpot(spot));
            console.log('create spot',spot)

    }

    if (spot.error) {
      const err = setErrors(spot.error);
      console.log(err)
    }else {
        history.push(`/spots/${spot.id}`)
    }
    setAddress('')
    setCity('')
    setState('')
    setCountry('')
    setLat('')
    setLng('')
    setName('')
    setDescription('')
    setPrice('')

    // else {
    //     history.push(`/spots/${spot.id}`);
    //   }
  };
//   if (!formType === "Update Spot")
//   const spots =useSelector(state => {
//     console.log(state)
//     return state})
return (
    <form onSubmit={handleSubmit}>
      <h2>{formType}</h2>
      <div className="errors">{error.address}</div>
      <label>
        Address:
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>
      <div className="errors">{error.city}</div>
      <label>
        City:
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </label>
      <div className="errors">{error.state}</div>
      <label>
        State:
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </label>
      <div className="errors">{error.country}</div>
      <label>
        Country:
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </label>
      <div className="errors">{error.lat}</div>
      <label>
        Lat:
        <input
          type="number"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />
      </label>
      <div className="errors">{error.lng}</div>
      <label>
        Lng:
        <input
          type="number"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
        />
      </label>
      <div className="errors">{error.name}</div>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <div className="errors">{error.description}</div>
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <div className="errors">{error.price}</div>
      <label>
        Price:
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <button type="submit">{formType}</button>

    </form>
  );
};

export default SpotsForm;
