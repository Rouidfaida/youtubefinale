import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { MdPlaylistAdd } from "react-icons/md";
import NavBare from "./NavBare";

const SuggessioVedio = ({ listVedio, addv }) => {
  const [srcve, setSrcve] = useState("");
  const [titleve, settiTleve] = useState("");
  const [dat, setDat] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addv(srcve, titleve, dat);
    setSrcve("");
    settiTleve("");
    setDat("");
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div style={{ marginTop: "80px" }}>
      <MdPlaylistAdd className="btn1" onClick={handleShow}>
        add{" "}
      </MdPlaylistAdd>
      {listVedio.map((el) => (
        <div className="div4">
          <iframe
            style={{ marginBottom: 20 }}
            width="150"
            height="100"
            src={el.srcve}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write;
                encrypted - media; gyroscope; picture - in -picture "
            allowfullscreen
          ></iframe>{" "}
          <div className="div2">
            <p className="pved"> {el.titleve} </p>{" "}
            <div className="div3">
              <p className="pved"> {el.pt} </p>{" "}
              <div className="div1"> {el.ic} </div>{" "}
            </div>{" "}
            <div className="divv">
              <p className="pved"> {el.vu} </p>{" "}
              <p className="pved"> {el.poi} </p>{" "}
              <p className="pved"> {el.dat} </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      ))}{" "}
      {/* {shows.show? */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Add new Vedio </Modal.Title>{" "}
        </Modal.Header>{" "}
        <Form
          style={{ marginLeft: "10px", marginTop: "10px" }}
          onSubmit={handleSubmit}
        >
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              srcv{" "}
            </Form.Label>{" "}
            <Col sm="10">
              <input
                type="url"
                value={srcve}
                placeholder="vedio"
                onChange={(e) => setSrcve(e.target.value)}
              />{" "}
            </Col>{" "}
          </Form.Group>{" "}
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              titlev{" "}
            </Form.Label>{" "}
            <Col sm="10">
              <input
                type="text"
                value={titleve}
                placeholder="title"
                onChange={(e) => settiTleve(e.target.value)}
              />{" "}
            </Col>{" "}
          </Form.Group>{" "}
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              date{" "}
            </Form.Label>{" "}
            <Col sm="10">
              <input
                type="date"
                value={dat}
                placeholder="years"
                onChange={(e) => setDat(e.target.value)}
              />{" "}
            </Col>{" "}
          </Form.Group>{" "}
        </Form>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close{" "}
          </Button>{" "}
          <Button
            variant="primary"
            onClick={handleClose}
            onClick={handleSubmit}
          >
            Save{" "}
          </Button>{" "}
        </Modal.Footer>{" "}
      </Modal>{" "}
      {} <NavBare onc={handleSubmit} />{" "}
    </div>
  );
};

export default SuggessioVedio;
