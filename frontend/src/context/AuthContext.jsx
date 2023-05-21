import { createContext, useState, useEffect } from "react";
import jwt_decode from 'jwt-decode'
import {useNavigate} from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {
    // If there are tokens in local storage set it
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    // If there are tokens in local stoarage, decode the user using "jwt_decoder" function
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    // The page are loading
    let [loading, setLoading] = useState(true)
    // Log in user alert
    let [alert, setAlert] = useState(false)

    const history = useNavigate()

    let loginUser = async (e )=> {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })
        let data = await response.json()

        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            history('/')
        }else{
            //alert('Something went wrong!')
            setAlert(true)
        }
    }

    let logoutUser = () =>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        history('/login')
    }

    let updateToken = async () => {
        console.log('Updated token!')
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'refresh': authTokens?.refresh})
        })
        let data = await response.json()

        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }//else{
        //    logoutUser()
        //}

        // After the first load of the page set the loading to false
        if(loading){
            setLoading(false)
        }
    }

    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
        alert:alert,
    }

    useEffect(()=> {
        // Refresh the tokens on the first load
        if(loading){
            updateToken()
        }

        // Update token every 29 minutes
        let time = 1000 * 60 * 29
        let interval = setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, time)
        return ()=> clearInterval(interval)

    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData}>
            {
                // If loading is true then the token shuld be update
                loading ? null : children
            }
        </AuthContext.Provider>
    )
}