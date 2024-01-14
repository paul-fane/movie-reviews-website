import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import React from "react";

const FilmConsigliatiDaUtenteModal = ({ films, ...props }) => {
  return (
    <Modal
      {...props}
      show={props.show}
      centered
      scrollable
      contentClassName="my-modal-visualizza-consigli"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Tutti i film ancora non visti consigliati da {props.utente}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {films.length > 0 ? (
          films.map((film) => (
            <Card key={film.id}>
              <Card.Body>
                <Card.Title>
                  {film.name} | {film.piattaforma}
                </Card.Title>
              </Card.Body>
            </Card>
          ))
        ) : (
          <h4>Nessun Film!</h4>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilmConsigliatiDaUtenteModal;
