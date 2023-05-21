import React, {useState, useEffect, useContext} from 'react'
import VisualizzaConsiglioModal from '../components/VisualizzaConsigliModal';

import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


const UnauthenticatedIndexPage = () => {

    let [films, setFilms] = useState([])
    let [piattaforme, setPiattaforme] = useState([])

    let [showModalVisualizzaConsigli, setShowModalVisualizzaConsigli] = useState(false)
    let [selectedFilmVisualizza, setSelectedFilmVisualizza] = useState(null);

    let [searchFilm, setSearchFilm] = useState({
        'name': "",
        'piattaforma': "",
        'media': 'false'
    })

    useEffect(() => {
        getPiattaforme()
        fetchFilms()
    }, [])

    let getPiattaforme = async() => {
        const response = await fetch('http://127.0.0.1:8000/api/filmsUnauthenticated/',{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        
        if(response.status === 200){
            setPiattaforme(data.piattaforma)
        }
    }


    let fetchFilms = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/filmsUnauthenticated/',{
            method:'POST',
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchFilm)
          })
        let data = await response.json()
        setFilms(data)
    }

    useEffect(() => {
        fetchFilms()
    }, [searchFilm])


    let handleChangeSearchFilm = (event) => {
        setSearchFilm(prevFormData => {
            return{
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }


    let lunchModalVisualizzaConsigli = (film) => {
        setSelectedFilmVisualizza(film)
        setShowModalVisualizzaConsigli(true)
    }

    return (
        <div>
            <h1 className='workout-title'>Lista dei Film</h1>
            <Card style={{ width: 'max' }} className='card--search--film'>
                <Card.Body>
                <Card.Title>Cerca film</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    Filter by: Name, Piattaforma, Visto/Non visto
                </Card.Subtitle>

                <form>
                    <input 
                    type="text"
                    placeholder='Search for film name'
                    name='name'
                    value={searchFilm.name}
                    onChange={handleChangeSearchFilm}
                    autoFocus
                    style={{width: "320px"}}
                    />

                    <label htmlFor="piattaforma">
                    Piattaforma:
                    <select 
                        id="piattaforma"
                        value={searchFilm.piattaforma}
                        onChange={handleChangeSearchFilm}
                        name="piattaforma"
                    >
                        <option value="">-- Choose --</option>
                        {
                        piattaforme.map((piattaforma, index) =>(
                            <option key={index} value={piattaforma}>{piattaforma}</option>
                        ))
                        }
                    </select>
                    </label>
                    <br />

                    <label htmlFor="media">
                    Ordinati per media dei voti ricevuti:
                    <select 
                        id="media"
                        value={searchFilm.mediaVoti}
                        onChange={handleChangeSearchFilm}
                        name="media"
                    >
                        <option value="false">Falso</option>
                        <option value="true">Vero</option>
                    </select>
                    </label>
                </form>
                </Card.Body>
            </Card>

            {
                films.length > 0
                ?
                <ul className='list--film'>
                    {
                    films.map(film => (
                        <li key={film.id} className='film'>
                            <h4>{film.name} | {film.piattaforma} | {film.media !== 0 ? film.media : "Nessun voto"}{film.media === null  && "Nessun voto"}</h4>
                            <Button variant="success" onClick={() => lunchModalVisualizzaConsigli(film)} >Visualizza consigli</Button>
                            
                            {
                                selectedFilmVisualizza != null 
                                &&
                                <VisualizzaConsiglioModal 
                                    show={showModalVisualizzaConsigli}
                                    onHide={() => setShowModalVisualizzaConsigli(false)}
                                    film={selectedFilmVisualizza}
                                />
                            }
                        </li>
                    ))
                    }
                </ul>
                :
                <div>
                    No film in database!
                </div>
                
            }
        </div>
    )
}

export default UnauthenticatedIndexPage