import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import AddConsiglioModal from '../components/AddConsiglioModal';
import VisualizzaConsiglioModal from '../components/VisualizzaConsigliModal';

import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


const IndexPage = () => {
    let {authTokens} = useContext(AuthContext)

    let [films, setFilms] = useState([])
    let [piattaforme, setPiattaforme] = useState([])

    let [showModalAddConsiglio, setShowModalAddConsiglio] = useState(false)
    let [selectedFilmAggiungi, setSelectedFilmAggiungi] = useState(null);

    let [showModalVisualizzaConsigli, setShowModalVisualizzaConsigli] = useState(false)
    let [selectedFilmVisualizza, setSelectedFilmVisualizza] = useState(null);

    let [searchFilm, setSearchFilm] = useState({
        'name': "",
        'piattaforma': "",
        'visto': "",
        'media': 'false'
    })

    useEffect(() => {
        getFilms()
    }, [])

    let getFilms = async() => {
        const response = await fetch('http://127.0.0.1:8000/api/films/',{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        const data = await response.json()

        if(response.status === 200){
            setFilms(data.movies)
            setPiattaforme(data.piattaforma)
        }
    }


    let fetchFilms = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/films/',{
            method:'POST',
            headers:{
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + String(authTokens.access)
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

    let watchlist = async (film) => {
        let response = await fetch(`http://127.0.0.1:8000/api/watchlist/`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify(film)
            })
        let data = await response.json()

        // Change the state of the watchlist
        setFilms(films.map(film1 => {
            if(film === film1){
                if(film1["visto"] === true){
                    return{
                        ...film1,
                        visto:false
                    }
                } else {
                    return{
                        ...film1,
                        visto:true
                    }
                }
            } else {
                return film1
            }
        }))
    }

    // Show the modal with the selected film
    let lunchModalAggiungiConsiglio = (film) => {
        setSelectedFilmAggiungi(film)
        setShowModalAddConsiglio(true)
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
                    
                    <label htmlFor="visto">
                    Visti/Non Visti:
                    <select 
                        id="visto"
                        value={searchFilm.visto}
                        onChange={handleChangeSearchFilm}
                        name="visto"
                    >
                        <option value="">-- Choose --</option>
                        <option value="visto">Visti</option>
                        <option value="non-visto">Non visti</option>
                    </select>
                    </label>

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
                            
                            {
                                film.visto === true
                                ?
                                <>
                                <p>Visto:True</p>
                                <Button variant="secondary" onClick={() => watchlist(film)} >Rimuovi da film visti</Button>

                                <Button variant="info" onClick={() => lunchModalAggiungiConsiglio(film)} >Aggiungi consiglio</Button>

                                <Button variant="success" onClick={() => lunchModalVisualizzaConsigli(film)} >Visualizza consigli</Button>
                            </>
                            :
                            <>
                            <p>Visto:False</p>
                            <Button variant="primary" onClick={() => watchlist(film)} >Aggiungi a film visti</Button>

                            <Button variant="info" onClick={() => lunchModalAggiungiConsiglio(film)} >Aggiungi consiglio</Button>

                            <Button variant="success" onClick={() => lunchModalVisualizzaConsigli(film)} >Visualizza consigli</Button>
                            </>
                            
                            }
                            {
                                selectedFilmAggiungi != null 
                                &&
                                <AddConsiglioModal 
                                    show={showModalAddConsiglio}
                                    onHide={() => setShowModalAddConsiglio(false)}
                                    film={selectedFilmAggiungi}
                                />
                            }
                            {
                                selectedFilmVisualizza != null 
                                &&
                                <VisualizzaConsiglioModal 
                                    show={showModalVisualizzaConsigli}
                                    onHide={() => setShowModalVisualizzaConsigli(false)}
                                    film={selectedFilmVisualizza}
                                    setSelectedFilmVisualizza={setSelectedFilmVisualizza}
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

export default IndexPage