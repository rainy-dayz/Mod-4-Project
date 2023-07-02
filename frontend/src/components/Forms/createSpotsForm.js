import SpotsForm from "./spotsForm";

const CreateSpotsForm = () => {
  const spot = {
    address:'',
    city:'',
    state:'',
    country:'',
    lat:'',
    lng:'',
    name:'',
    description:'',
    price:''
  };


  return (
    <SpotsForm
      spot={spot}
      formType="Create Spot"
    />
  );
};

export default CreateSpotsForm;
