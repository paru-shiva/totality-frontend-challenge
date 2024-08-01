import Header from "../Header";
import { useState, useEffect } from "react";
import "./index.css";
import PropertyCard from "../PropertyCard";

const Home = () => {
  const [propertiesData, changePropertiesData] = useState([]);

  const [location, changeLocation] = useState("");
  const [priceFilter, changePriceFilter] = useState("lowtohigh");

  const [filteredProps, changeFilteredProps] = useState([]);

  console.log(filteredProps);

  const onLocationChange = (e) => {
    let filteredProperties = propertiesData.filter((ep) =>
      ep.location.includes(e.target.value)
    );
    changeLocation(e.target.value);
    changeFilteredProps(filteredProperties);
  };

  const onPriceChange = (e) => {
    changePriceFilter(e.target.value);
    if (e.target.value === "lowtohigh") {
      filteredProps.sort((a, b) => a.price - b.price);
    } else {
      filteredProps.sort((a, b) => b.price - a.price);
    }
  };

  useEffect(() => {
    const fetchPropData = async () => {
      const response = await fetch("http://localhost:3000/properties");
      const result = await response.json();
      changePropertiesData(result);
      changeFilteredProps(result);
      result.sort((a, b) => a.price - b.price);
      console.log(result);
    };
    fetchPropData();
  }, []);

  const renderPropertiesData = () => {
    return filteredProps.map((ep) => <PropertyCard key={ep.id} data={ep} />);
  };

  return (
    <div className="homeComponent">
      <Header />
      <div className="mainHome">
        <div className="filters">
          <p className="filtersPara">Location: </p>
          <select
            class="form-select"
            aria-label="Default select example"
            value={location}
            onChange={onLocationChange}
          >
            <option selected value="">
              All
            </option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Rangareddy">Rangareddy</option>
            <option value="Delhi">Delhi</option>
            <option value="Banglore">Banglore</option>
          </select>

          <p className="filtersPara">Price: </p>
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={onPriceChange}
            value={priceFilter}
          >
            <option value="lowtohigh">Low to High</option>
            <option value="hightolow">High to Low</option>
          </select>
        </div>
        <div className="homeBody">{renderPropertiesData()}</div>
      </div>
    </div>
  );
};
export default Home;
