import React from "react";
import './Footer.css'
import logo from '../../assets/images/logo.png';
import {Container,Row,Col,ListGroup,ListGroupItem} from 'reactstrap';
import {Link} from 'react-router-dom'; 


const quick__links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/tours",
    display: "Tours",
  },
];

const quick__links2 = [
  {
    path: "/gallery",
    display: "Gallery",
  },
  {
    path: "/login",
    display: "Login",
  },
  {
    path: "/register",
    display: "Register",
  },
];
const footer = () => {
  // return <div>footer</div>;
  return <footer className="footer">
    <Container>
      <Row>
        <Col lg='3'>
        <div className="logo">
              <img src={logo} alt="" />
            </div>
            <img src="{logo}" alt="" />
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, adipisci voluptates iure sunt cum expedita?</p>
            <div className="social__links d-flex align-items-center gap-4">
              <span>
                <Link to='#'><i className="ri-youtube-line"></i></Link>
              </span>
              <span>
                <Link to='#'><i className="ri-instagram-line"></i></Link>
              </span>
              <span>
                <Link to='#'><i className="ri-twitter-fill"></i></Link>
              </span>
              <span>
                <Link to='#'><i className="ri-facebook-fill"></i></Link>
              </span>
            </div>
        </Col>
        <Col lg='3'>
          <h5 className="footer__link-title">Discover</h5>

          <ListGroup className="footer__quick-links">
            {
              quick__links.map((item,index)=>(
                <ListGroupItem key={index} className="p-0 border-0 ">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))
            }
          </ListGroup>
        </Col>
        <Col lg='3'>
          <h5 className="footer__link-title">Quick Links</h5>

          <ListGroup className="footer__quick-links2">
            {
              quick__links2.map((item,index)=>(
                <ListGroupItem key={index} className="p-0 border-0">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))
            }
            </ListGroup>
        </Col>
        <Col lg='3'>
        <h5 className="footer__link-title">Get the App</h5>

        <ListGroup className="footer__quick-links">
          {
            
              <ListGroupItem className="p-0 border-0 d-flex align-items-center gap-3">
              
              <h6 className="mb-0 d-flex align-items-center gap-2">
                <span>
                  <Link to='#'><i className="ri-store-3-line"></i></Link>
                  AppleStore
                </span>
              </h6>
              </ListGroupItem>
            
          }
          {
            
            <ListGroupItem className="p-0 border-0 d-flex align-items-center gap-3">
            
            <h6 className="mb-0 d-flex align-items-center gap-2">
              <span>
                <Link to='#'><i className="ri-store-3-line"></i></Link>
                PlayStore
              </span>
            </h6>
            </ListGroupItem>
          
        }
  </ListGroup>
        </Col>
        <div className="row1">
         Copyright &copy; TravelWORLD.com
        </div>
      </Row>
    </Container>
  </footer>
};

export default footer;
