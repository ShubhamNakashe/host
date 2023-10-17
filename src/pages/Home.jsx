import React from "react";
import { Container, Row, Col,Button } from "reactstrap";
import heroimg from "../assets/images/hero-img01.jpg";
import heroImg02 from "../assets/images/hero-img02.jpg";
import heroVideo from "../assets/images/hero-video.mp4";
import pruthvi from '../assets/images/pruthvi.gif';
// import Subtitle from "../shared/Subtitle";
import Subtitle from "./../shared/Subtitle";
import worldImg from "./../assets/images/world.png";
import './../styles/home.css'
import { NavLink, Link } from "react-router-dom";
import Tour from '../pages/Tour';
// import SearchBar from "../shared/SearchBar"; 
const home = () => {
  return (
    <>
      {/* /hero section start */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle subtitle={"Know before you go"} />
                  <img src={pruthvi} alt="" className="rotate-360"/>
                </div>
                <h1>
                  Traveling opens the door to creating{" "}
                  <span className="highlight">memories</span>
                </h1>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                  Accusantium amet sint laudantium possimus veniam maxime
                   deserunt ab, facere fugit assumenda?  </p>
               <Button className="go_To_Tour_btn">
                  <Link to="/Tour">Get Started</Link>
                </Button>
              
              </div>
            </Col>
             <Col lg='2'>
              <div className="hero__img-box">
               <img src={heroimg} alt="" />
              </div>
            </Col>
            <Col lg='2'>
              <div className="hero__img-box mt-4">
               <video src={heroVideo} alt="" controls/>
              </div>
              </Col>
              <Col lg='2'>
              <div className="hero__img-box mt-5">
               <img src={heroImg02} alt="" />
              </div>
             </Col>
             {/* <SearchBar /> */}
          </Row>
        </Container>
      </section>
      {/* Hero section end */}
    </>
  );
};

export default home;