import "./index.css";
import { Link } from "react-router-dom";

const PropertyCard = (props) => {
  const { title, description, imageurl, id, price, location } = props.data;
  return (
    <div className="card cardComponent">
      <img src={imageurl} className="card-img-top cardImg" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text cardTxt">{description}</p>
        <b>
          <p>{`Location: ${location}`}</p>
          <p>{`Price: ${price}Lakhs/-`}</p>
        </b>
        <Link to={`/properties/${id}`} className="btn btn-dark">
          Open Property Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
