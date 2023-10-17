import React, { useEffect, useRef, useState } from "react";
import "../styles/about.css";
import { Col, Form, FormGroup } from "reactstrap";


function About() {
  const width = 500;
  const queryParamsRef = useRef("");
  const [results, setResults] = useState([]);
  const [geoId, setGeoId] = useState(null);
  const [id, setId] = useState(null);
  const [checkIn, setCheckIn] = useState(""); // State for check-in
  const [checkOut, setCheckOut] = useState(""); // State for check-out
  // const [secondJson, setSecondJson] = useState("");
  const [secondJson, setSecondJson] = useState({ status: false, data: [] });
  const [ThirdJson, setThirdJson] = useState({ status: false, data: [] });

  const openURL = (url) => {
    window.open(url, "_blank");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // First API request
        const queryParams = new URLSearchParams({
          query: queryParamsRef.current.value,
        });

        const url = `https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation?${queryParams.toString()}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "87922d389dmsh9acba9891f40b6cp13fc6cjsncd102cdf06fe",
            "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const json = await response.json();

        // Check if the response contains valid data
        if (!json.data) {
          throw new Error("Invalid data in the response");
        }

        // Set the geoId to the first result's geoId (assuming you want the first result)
        if (json.data.length > 0) {
          setGeoId(json.data[0].geoId);
          console.log("geoId:", json.data[0].geoId);
        }

        // Set the entire results array
        setResults(json.data);

        // Second API request
        const secondUrl = `https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels?geoId=${geoId}&checkIn=${checkIn}&checkOut=${checkOut}`;
        const secondResponse = await fetch(secondUrl, {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "87922d389dmsh9acba9891f40b6cp13fc6cjsncd102cdf06fe",
            "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
          },
        });

        if (!secondResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const secondJson = await secondResponse.json();
        setSecondJson({ status: true, data: secondJson.data.data });


        if (!secondJson.data) {
          throw new Error("Invalid data in the response");
        }
        
        // if (secondJson.data.length > 0) {
        //   setId(secondJson.data[0].id);
        //   console.log("geoId:", secondJson.data[0].id);
        // }
      //   for (var z = 0; z < (secondJson.data.data.length)+1; z++) {
      //   if (secondJson.data && secondJson.data.data && secondJson.data.data[z] && secondJson.data.data[z].id) {
      //     const id = secondJson.data.data[z].id;
      //     const title = secondJson.data.data[z].title;
      //     const URLL = secondJson.data.data[z].commerceInfo.externalUrl;
      //     const provider = secondJson.data.data[z].commerceInfo.provider;
      //     const image = secondJson.data.data[z].cardPhotos[0].sizes.urlTemplate;

      //     console.log("ID:", id,title,URLL,provider,image);
      //   } else {
      //     console.log("ID not found in the JSON data");
      //   }
      // // }
      //   console.log("Second API Response:", secondJson);
      // } catch (error) {
      //   console.log("Error fetching data:", error);
      // }

      const ThirdUrl = `https://tripadvisor16.p.rapidapi.com/api/v1/hotels/getHotelDetails?id=${id}&checkIn=${checkIn}&checkOut=${checkOut}`;
      const ThirdResponse = await fetch(ThirdUrl, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "87922d389dmsh9acba9891f40b6cp13fc6cjsncd102cdf06fe",
          "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
        },
      });

      if (!ThirdResponse.ok) {
        throw new Error("Network response was not ok");
      }

      const ThirdJson = await ThirdResponse.json();
      setThirdJson({ status: true , data: ThirdJson.data});


      if (!ThirdJson.data) {
        throw new Error("Invalid data in the response");
      }
      console.log("Second API Response:", ThirdJson);
    } catch (error) {
      console.log("Error fetching data:", error);
    }

    };

    const handleFormSubmit = (e) => {
      e.preventDefault();
      fetchData();
    };
    
  
    
    const searchIcon = document.querySelector(".search__icon");
    searchIcon.addEventListener("click", handleFormSubmit);

    return () => {
      searchIcon.removeEventListener("click", handleFormSubmit);
    };
  }, [checkIn, checkOut, geoId]); // Include checkIn, checkOut, and geoId in the dependency array

  return (
    <Col lg="12">
      <div className="mainabt-cont">
        <div className="searchabt__bar">
          <Form className="d-block align-items center gap-4">
            <FormGroup className="d-flex gap-3 form_group form_group-fast">
              <span>
                <i className="ri-map-pin-line"></i>
              </span>
              <div>
                <h5>Location</h5>
                {/* Attach the ref to the input element */}
                <input
                  type="text"
                  placeholder="eg:Mumbai,Paris"
                  ref={queryParamsRef}
                />
              </div>
            </FormGroup>

            <FormGroup className="d-flex gap-3 form_group form_group-fast">
              <span>
                <i className="ri-calendar-check-line"></i>
              </span>
              <div>
                <h5>Check-in</h5>
                <input
                  type="text"
                  placeholder="eg:2023-10-14"
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>

              <FormGroup className="d-flex gap-3 form_group form_group-fast">
                <span>
                  <i className="ri-calendar-check-line"></i>
                </span>
                <div>
                  <h5>Check-out</h5>
                  <input
                    type="text"
                    placeholder="eg:2023-10-16"
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>
              </FormGroup>
            </FormGroup>

            <FormGroup className="d-flex gap-3 form_group form_group-fast">
              <span>
                <i className="ri-group-line"></i>
              </span>
              <div>
                <h5>No. of adults</h5>
                <input type="number" placeholder="eg:1,2,3" />
              </div>
              <FormGroup className="d-flex gap-3 form_group form_group-fast">
                <span>
                  <i className="ri-group-line"></i>
                </span>
                <div>
                  <h5>No. of children</h5>
                  <input type="number" placeholder="eg:1,2,3" />
                </div>
              </FormGroup>
            </FormGroup>

            <button
              className="search__icon d-flex gap-3 form_gorup"
              type="submit"
              // onClick={handleFormSubmit}
            >
              <i className="ri-search-2-line"></i>
            </button>
          </Form>

   
        </div>
      </div>
      {secondJson.status ? (
  <div>
    
    <h2>Hotel Results:</h2>
 
    {secondJson.data.map((item, index) => (
      <div key={index} className="result-item">
    
        <h3>{item.title}</h3>
        <p></p>
        <p>Rating: {item.bubbleRating.rating}  
           Review Count: {item.bubbleRating.count}</p>
   
        <p className="linkprovider">Provider: {item.provider}  <button onClick={() => openURL(item.commerceInfo.externalUrl)}>Get More Details!</button></p>
   
        <img
                src={item.cardPhotos[0].sizes.urlTemplate.replace(/\?w=\{width\}&h=\{height\}/, '\?w=500&h=500')}
                alt="Hotel Image"         />
        <img
                src={item.cardPhotos[1].sizes.urlTemplate.replace(/\?w=\{width\}&h=\{height\}/, '\?w=500&h=500')}
                alt="Hotel Image" 
              />
        <img
                src={item.cardPhotos[2].sizes.urlTemplate.replace(/\?w=\{width\}&h=\{height\}/, '\?w=500&h=500')}
                alt="Hotel Image"  
              />
        <img
                src={item.cardPhotos[3].sizes.urlTemplate.replace(/\?w=\{width\}&h=\{height\}/, '\?w=500&h=500')}
                alt="Hotel Image" 
              />
        {/* <p>
          URL:{" "}
          <a
            href={item.commerceInfo.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.commerceInfo.externalUrl}
          </a>
        </p> */}
       
        {/* Add more information you want to display here */}
      </div>
    ))}
      
    
  </div>
) : (
  <div>No results available</div>
)}

    </Col>
  );
}

export default About;