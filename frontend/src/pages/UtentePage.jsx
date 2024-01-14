import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import FilmConsigliatiDaUtenteModal from "../components/FilmConsigliatiDaUtenteModal";

import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";

const UtentePage = () => {
  let { authTokens, user } = useContext(AuthContext);

  // Parameters of the current URL
  let params = useParams();

  let [utente, setUtente] = useState(null);
  let [platformList, setPlatformList] = useState([]);
  let [searchConsiglio, setSearchConsiglio] = useState({
    piattaforma: "",
    vote: "",
    visto: "false",
  });
  let [consigli, setConsigli] = useState([]);
  let [filmConsigliatiDaUtente, setFilmConsigliatiDaUtente] = useState([]);
  let [showModalFilmConsigliati, setShowModalFilmConsigliati] = useState(false);

  useEffect(() => {
    let getPlatformList = async () => {
      const response = await fetch("http://127.0.0.1:8000/movies/platform/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.status === 200) {
        setPlatformList(data);
      }
    };
    getPlatformList();
  }, []);

  useEffect(() => {
    let fetchConsigli = async () => {
      let response = await fetch(
        `http://127.0.0.1:8000/reviews/review?user=${params.id}&piattaforma=${searchConsiglio.piattaforma}&vote=${searchConsiglio.vote}&visto=${searchConsiglio.visto}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
        }
      );
      let data = await response.json();
      setConsigli(data);
    };
    fetchConsigli();
  }, [params.id, searchConsiglio]);

  let handleChangeSearchConsiglio = (event) => {
    setSearchConsiglio((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  let fetchFilmConsigliatiDaUtente = async (utente) => {
    let response = await fetch(
      `http://127.0.0.1:8000/api/filmConsigliatiDaUtente/${utente.id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );
    let data = await response.json();

    setFilmConsigliatiDaUtente(data);
    setShowModalFilmConsigliati(true);
  };

  return (
    <div>
      {utente != null && (
        <>
          <Card>
            <Card.Body>
              <Card.Title>{/* {utente.username}  */}</Card.Title>
              Totale consigli:
              {/* {numeroConsigli} */}
            </Card.Body>
          </Card>
          {/* {
              user.user_id != utente.id
              &&
              <Button variant="primary" onClick={() => fetchFilmConsigliatiDaUtente(utente)} >Lista Film che non ho visto consigliati da "{utente.username}"</Button>
            } */}
          <FilmConsigliatiDaUtenteModal
            show={showModalFilmConsigliati}
            onHide={() => setShowModalFilmConsigliati(false)}
            films={filmConsigliatiDaUtente}
            utente={utente.username}
          />
        </>
      )}

      <Card style={{ width: "max" }} className="card--search--film">
        <Card.Body>
          <Card.Title>Cerca consiglio</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Filter by: Piattaforma, Voto
          </Card.Subtitle>

          <form>
            <label htmlFor="vote">
              Visualizza solo i consigli con il voto:
              <select
                id="vote"
                value={searchConsiglio.vote}
                onChange={handleChangeSearchConsiglio}
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

            <label htmlFor="piattaforma">
              Piattaforma:
              <select
                id="piattaforma"
                value={searchConsiglio.piattaforma}
                onChange={handleChangeSearchConsiglio}
                name="piattaforma"
              >
                <option value="">-- Choose --</option>
                {platformList.map((piattaforma, index) => (
                  <option key={index} value={piattaforma}>
                    {piattaforma}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="visto">
              Solo film che non ho visto:
              <select
                id="visto"
                value={searchConsiglio.visto}
                onChange={handleChangeSearchConsiglio}
                name="visto"
              >
                <option value="false">False</option>
                <option value="true">True</option>
              </select>
            </label>
          </form>
        </Card.Body>
      </Card>

      {consigli.length > 0 ? (
        consigli.map((consiglio) => (
          <Card key={consiglio.id}>
            <Card.Body>
              <Card.Link
                onClick={() => history(`/utente/${consiglio.user.id}`)}
              >
                <h4>{consiglio.user.username}</h4>
              </Card.Link>
              <Card.Title>
                {consiglio.film.name} | {consiglio.film.piattaforma}
              </Card.Title>
              <div>Voto:{consiglio.vote}</div>
              <div>Commento: {consiglio.comment}</div>
            </Card.Body>
          </Card>
        ))
      ) : (
        <h4>Nessun consiglio!</h4>
      )}
    </div>
  );
};

export default UtentePage;
