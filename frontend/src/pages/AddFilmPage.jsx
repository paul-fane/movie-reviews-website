import React, {useState, useContext} from 'react'
import AuthContext from '../context/AuthContext'

import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const RegisterPage = () => {

    let {authTokens} = useContext(AuthContext)

    let [film, setFilm] = useState({
        "name": "",
        "piattaforma": ""
    })
    let [alertMessage, setAlertMessage] = useState(null)
    
    let addFilm = async() =>{
        const response = await fetch('http://127.0.0.1:8000/api/addFilm/',{
          method:'POST',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + String(authTokens.access)
          },
          body: JSON.stringify(film)
        })
        const data = await response.json()
        
        if (data === "Film added successfully!"){
            setAlertMessage({
                "message": data,
                "variant": 'success'
            })
            setFilm({
                "name": "",
                "piattaforma": ""
            })
        } else {
            setAlertMessage({
                "message": "Something went vrong!",
                "variant": 'danger'
            })
        }
    }

    let handleChange = (event) => {
        setFilm(prevFormData => {
            return{
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
      }

    let handleSubmit = (event) => {
        event.preventDefault()
        
        addFilm()
    }

    

  return (
    <div>
        {
        alertMessage !== null
        &&
        <Alert variant={alertMessage.variant}>
          {alertMessage.message}
        </Alert>
        }
        <h1>Aggiungi un nuovo film alla piattaforma</h1>
        <Card style={{ width: 'max' }}>
            <Card.Body>
                
                <form>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Name" 
                        value={film.name}
                        onChange={handleChange}
                        autoFocus
                    />

                    <input  
                        type="text" 
                        name="piattaforma" 
                        placeholder="Piattaforma"
                        value={film.piattaforma}
                        onChange={handleChange}
                    />
                    <Button variant="primary" onClick={handleSubmit}>Aggiungi</Button>
                </form>
            </Card.Body>
        </Card>
    </div>
  )
}

export default RegisterPage