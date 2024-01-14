import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CloseButton from "react-bootstrap/CloseButton";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VisualizzaConsiglioModal = ({
  film,
  setSelectedFilmVisualizza,
  ...props
}) => {
  const history = useNavigate();

  let [consigli, setConsigli] = useState([]);
  let [vote, setVote] = useState({
    vote: "",
  });

  useEffect(() => {
    let fetchConsigli = async () => {
      const response = await fetch(
        `http://127.0.0.1:8000/reviews/review?film=${film.id}&vote=${vote.vote}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);
      setConsigli(data);
    };
    fetchConsigli();
  }, [film, vote]);

  let handleChangeConsiglio = (event) => {
    setVote((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  let closeModal = (event) => {
    setConsigli([]);
    setVote({
      vote: "",
    });
    setSelectedFilmVisualizza(null);
    props.onHide();
  };

  return (
    <Modal
      {...props}
      show={props.show}
      centered
      scrollable
      contentClassName="my-modal-visualizza-consigli"
    >
      <Modal.Header>
        <Modal.Title>Film: {film.name}</Modal.Title>
        <CloseButton onClick={closeModal} />
      </Modal.Header>

      <Modal.Body>
        <form>
          <label htmlFor="vote">
            Visualizza solo i consigli con il vote:
            <select
              id="vote"
              value={vote.vote}
              onChange={handleChangeConsiglio}
              name="vote"
            >
              <option value="">-- Tutti --</option>
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
        </form>
        <hr></hr>

        <Card.Subtitle className="mb-2 text-muted">
          Visualizza Consigli
        </Card.Subtitle>
        {consigli.length > 0 ? (
          consigli.map((consiglio) => (
            <Card key={consiglio.id}>
              <Card.Body>
                <Card.Link
                  onClick={() => history(`/utente/${consiglio.user.id}`)}
                >
                  <h4>{consiglio.user.username}</h4>
                </Card.Link>
                <Card.Title>Vote:{consiglio.vote}</Card.Title>
                <Card.Text>
                  {consiglio.comment && <>Commento: {consiglio.comment}</>}
                </Card.Text>
              </Card.Body>
            </Card>
          ))
        ) : (
          <h4>Nessun consiglio!</h4>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VisualizzaConsiglioModal;
