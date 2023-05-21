import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const LoginPage = () => {
    let {loginUser, alert} = useContext(AuthContext)
  return (
    <div>
      {
        alert
        &&
        <Alert variant='danger'>
          Invalid username and/or password.
        </Alert>
      }
      <Card className='register-card' style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title><h1>Consiglio</h1></Card.Title>
          
          <form onSubmit={loginUser}>
            <input 
                type="text" 
                name="username" 
                placeholder="Enter Username" 
                autoFocus
            />
            <input  
                type="password" 
                name="password" 
                placeholder="Password"
            />
            <Button variant="primary" type="submit">Login</Button>
          </form>
          
          <h6>Don't have an account?</h6>
          <Card.Link href="/register">Register here</Card.Link>
        </Card.Body>
      </Card>
    </div>
  )
}

export default LoginPage