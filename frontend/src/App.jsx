import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from './utils/PrivateRoutes'
import { AuthProvider } from './context/AuthContext'

import Header from './components/Header'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import IndexPage from './pages/IndexPage';
import AddFilmPage from './pages/AddFilmPage'
import UtentePage from './pages/UtentePage'
import UnauthenticatedIndexPage from './pages/UnauthenticatedIndexPage';

function App() {
  return (
    <div >
      <Router>
        <AuthProvider>
          <Header />
          <div className="App">
            <Routes>
              <Route path="/index" element={<UnauthenticatedIndexPage />} />
              <Route path="/login"  element={<LoginPage />} />
              <Route path="/register"  element={<RegisterPage />} />
              <Route element={<PrivateRoutes/>} >
                <Route exact path="/" element={<IndexPage />} />
                <Route path="/addFilm" element={<AddFilmPage />} />
                <Route path="/utente/:id" element={<UtentePage/>} />
              </Route>
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
