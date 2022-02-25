import { MdSearch, MdMic } from "react-icons/md";
import { FaYoutube } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { RiVideoAddLine } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";
import { GrApps } from "react-icons/gr";

import React, { useState } from "react";
import { Form, FormControl, Modal,Button,Nav, Navbar } from "react-bootstrap";

const NavBare = ({onc}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Navbar 
        style={{ backgroundColor: "#FFFFFF", position: "fixed", width: "100%" }}
      >
        <Navbar.Brand href="#">
          {" "}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "20px",
            }}
          >
            <FiMenu
              style={{
                marginRight: "20px",
                marginTop: "5px",
                width: "40px",
                height: "20px",
              }}
            />
            <div style={{ display: "flex", height: "20px" }}>
              <FaYoutube
                style={{ width: "30px", height: "30px", color: "red" }}
              />
              <p
                style={{
                  fontFamily: "Roboto, Arial, sans-serif",
                  colorFont: "rgb(33, 33, 33)",
                  fontSize: "20px",
                  fontWeight: 700,
                  letterSpacing: "-1.5px",
                  height: "30px",
                  fontLine: "normal",
                }}
              >
                YouTube
              </p>
              <p
                style={{
                  fontFamily: "Roboto, Arial, sans-serif",
                  colorFont: "rgb(96, 96, 96))",
                  fontSize: "10PX",
                  marginTop: "-2px",
                  fontWeight: 400,
                  fontLine: "normal",
                  marginLeft: "5px",
                }}
              >
                TN
              </p>
            </div>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>
          <Form
            className="d-flex"
            style={{
              marginLeft: "200px",
              height: "36px",
              border: "1px solid lightgrey",
              width: "640px",
            }}
          >
            <FormControl
              type="search"
              className="mr-2"
              placeholder="Rechercher"
            />
            <div
              style={{
                display: " flex",
                backgroundColor: "#fafafa",
                borderLeft: " 1px solid lightgrey",
                borderRight: " 1px solid lightgrey",
                color: "grey",
                width: "65px",
              }}
            >
              <MdSearch
                style={{
                  width: "26px",
                  height: "26px",
                  marginTop: "5px",
                  marginLeft: "15px",
                }}
              />
            </div>
          </Form>
          <div
            style={{
              marginLeft: "15px",
              backgroundColor: "#fafafa",
              borderRadius: 90,
              width: "35px",
              height: "35px",
            }}
          >
            <MdMic
              style={{
                width: "25px",
                height: "25px",
                marginLeft: "4px",
                marginTop: "5px",
              }}
            />
          </div>

          <div
            style={{
              marginLeft: "150px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <RiVideoAddLine
              style={{
                width: "30px",
                backgroundColor: "none",
                height: "20px",
                marginLeft: "30px",
              }}
              onClick={handleShow}
            />
            <GrApps
              style={{ width: "20px", height: "20px", marginLeft: "30px" }}
            />
            <IoIosNotificationsOutline
              style={{ width: "30px", height: "30px", marginLeft: "30px" }}
            />
            <img
              style={{
                width: 35,
                height: 35,
                borderRadius: 90,
                marginLeft: "30px",
              }}
              src="https://yt3.ggpht.com/yti/APfAmoG7rAAZHK3ivvaDC5rgprEcfl2GKSoI464T6g=s88-c-k-c0x00ffffff-no-rj"
              alt=""
            />
          </div>
        </Navbar.Collapse>
      </Navbar>
      </div>
    
  );
};

export default NavBare;
