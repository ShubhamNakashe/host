import React, { useRef, useState, useEffect } from "react";
import "./../shared/search-bar.css";
import { Col, Form, FormGroup } from "reactstrap";

function SearchBar() {
  // Define a ref for the input element
  const queryParamsRef = useRef();
  const daysRef = useRef();
  const maxPeopleRef = useRef();
  const attRef = useRef();
  const cuisineRef  =useRef();
  const foodRef  =useRef();
  const budgetRef = useRef();
  const [generatedPlan, setGeneratedPlan] = useState(""); // State to store the generated plan

 
const fetchData = async () => {
  try {
   
    const queryParams = queryParamsRef.current.value;
    const days = daysRef.current.value;
    const maxPeople = maxPeopleRef.current.value;
    const attractions = attRef.current.value;
    const foodTypes = foodRef.current.value;
    const cuisineType = cuisineRef.current.value;
    const budget = budgetRef.current.value;

   
    const userInputMessage = `Generate a Travel Plan to visit ${queryParams} with a budget of ${budget} for ${days} days having ${maxPeople} people . 
      It should include ${attractions} kind of places. Suggest restaurants for each day having ${foodTypes} food types and ${cuisineType} type of cuisine.`;

    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: userInputMessage,
        },
      ],
      temperature: 1,
      max_tokens: 3800,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    };

    const url = "https://api.openai.com/v1/chat/completions";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer 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", // Replace with your OpenAI API key
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const jsonResponse = await response.json();

    if (!jsonResponse.choices || jsonResponse.choices.length === 0) {
      throw new Error("Invalid response data from OpenAI");
    }

    // Get the generated content from OpenAI response
    const generatedContent = jsonResponse.choices[0].message.content;
    setGeneratedPlan(generatedContent);
    console.log(generatedPlan);
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

  const handleSearchClick = () => {
    fetchData();
  };

  return (
    <Col lg="12">
      <div className="main-cont  ">
        <div className="search__bar ">
          <Form className="d-flex align-items center gap-0.2">
            <FormGroup className="d-flex gap-2 form_group form_group-fast">
              <span>
                <i className="ri-map-pin-line"></i>
              </span>
              <div>
                <h5>Where to</h5>
                <input type="text" placeholder="eg: Mumbai, Paris" ref={queryParamsRef} />
              </div>
            </FormGroup>
             
            <FormGroup className="d-flex gap-2 form_group form_group-fast">
              <span>
                <i className="ri-calendar-check-line"></i>
              </span>
              <div>
                <h5>No of Days</h5>
                <input type="number" placeholder="eg: 1, 2, 3" ref={daysRef} />
              </div>
            </FormGroup>

            <FormGroup className="d-flex gap-2 form_group form_group-fast">
              <span>
              <i class="ri-wallet-3-line"></i>
              </span>
              <div>
                <h5>Budget</h5>
                <input type="text" placeholder="eg: 1, 2, 3" ref={budgetRef} />
              </div>
            </FormGroup>

            <FormGroup className="d-flex gap-2 form_group form_group-fast">
              <span>
                <i className="ri-group-line"></i>
              </span>
              <div>
                <h5>Max People</h5>
                <input type="number" placeholder="eg: 1, 2, 3" ref={maxPeopleRef} />
              </div>
            </FormGroup>


            <FormGroup className="d-flex gap-2 form_group form_group-fast">
                <span>
                  <i className="ri-group-line"></i>
                </span>
                <div>
                  <h5> Food </h5>
                  <select  ref={foodRef}>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="non-vegetarian">Non-vegetarian</option>
                    <option value="vegan">Vegan</option>
                    
                  </select>
                </div>
            </FormGroup>
            
            <FormGroup className="d-flex gap-2 form_group form_group-fast">
                <span>
                  <i className="ri-group-line"></i>
                </span>
                <div>
                  <h5> Attractions </h5>
                  <select ref={attRef}>
                    <option value="historical">Historical</option>
                    <option value="adventure">Adventorous</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="nature">Nature</option>
                    <option value="sports">Sports</option>
                    <option value="architecture">Architecture</option>
                    <option value="literature">Literature</option>
                  </select>
                </div>
            </FormGroup>

          

            <FormGroup className="d-flex gap-2 form_group form_group-fast">
                <span>
                  <i className="ri-group-line"></i>
                </span>
                <div>
                  <h5> Cuisine </h5>
                  <select ref={cuisineRef}>
                    <option value="indian">Indian</option>
                    <option value="japanese">Japanese</option>
                    <option value="italian">Italian</option>
                    <option value="mexican">Mexican</option>
                    <option value="thai">Thai</option>
                    <option value="french">French</option>
                    <option value="korean">Korean</option>
                  </select>
                </div>
            </FormGroup>

              
            <button className="search__icon gap-2 " type="button" onClick={handleSearchClick}>
            <i className="ri-search-2-line"></i>
          </button>
        </Form>
        </div>
        </div>
      <div className="descrip">
      <h2>Generated Travel Plan</h2>
{/*       
  {generatedPlan.split('\n').map((line, index) => (
    <p key={index}>{line}</p> */}
  {/* ))} */}
        <p><strong>{generatedPlan.split('\n')[0]}</strong></p>
        {generatedPlan.split('\n').slice(1).map((line, index) => {
          if (line.startsWith("Day")) {
            return (
              <React.Fragment key={index}>
                <p><strong>{line}</strong></p>
              </React.Fragment>
            );
          } else {
            return (
              <p key={index}>{line}</p>
            );
          }
        })}
      </div>

      {/* </div> */}
    </Col>
  );
}

export default SearchBar;