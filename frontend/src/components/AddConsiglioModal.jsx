import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";

const AddConsiglioModal = ({ film, setSelectedFilmAggiungi, ...props }) => {
  let { authTokens } = useContext(AuthContext);

  // Empty consiglio
  let [consiglio, setConsiglio] = useState({
    film: film.id,
    vote: "",
    comment: "",
  });

  useEffect(() => {
    setConsiglio({
      film: film.id,
      vote: "",
      comment: "",
    });
  }, [film]);

  let handleChangeConsiglio = (event) => {
    setConsiglio((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  let addConsiglio = async () => {
    const response = await fetch("http://127.0.0.1:8000/reviews/review/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify(consiglio),
    });

    const data = await response.json();
    console.log(data);
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    // Aggiungi il consiglio alla database
    addConsiglio();
    // Exit the Modal
    props.onHide();
  };

  return (
    <Modal {...props} show={props.show} centered>
      <Modal.Header closeButton>
        <Modal.Title>Aggiungi Consiglio al film {film.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <label htmlFor="vote">
            Voto:
            <select
              id="vote"
              value={consiglio.voto}
              onChange={handleChangeConsiglio}
              name="vote"
            >
              <option value="">-- Choose --</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </label>

          <input
            type="text"
            placeholder="Comment"
            name="comment"
            value={consiglio.commento}
            onChange={handleChangeConsiglio}
            style={{ width: "320px" }}
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddConsiglioModal;
