import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const dotenv = require("dotenv");
// const chatroutes = require("./Routes/chatroutes");


// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// dotenv.config()

// app.use("/",chatroutes);
// const port = process.env.port || 1010;

// app.listen(port,()=>{
//     console.log(`Server ${port}`);
// })