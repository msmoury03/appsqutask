import logo from './logo.svg';
import './App.css';
import Weatherapp from './Pages/Weatherapp';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom";
import Loginpage from './Pages/Task2/Pages/Loginpage';
import Signuppage from './Pages/Task2/Pages/Signuppage';
import Dashboardpage from './Pages/Task2/Pages/Dashboardpage';

function App() {

  const token = localStorage.getItem('token')

  return (
    <Router>
      <div className="App">

        <Routes>

          {
            token ? (<>
              <Route Component={Weatherapp} path='/' />
              <Route Component={Weatherapp} path='*' />
              <Route Component={Dashboardpage} path='/login' />
              <Route Component={Dashboardpage} path='/signup' />
              <Route Component={Dashboardpage} path='/dashboard' />
            </>
            ) : (
              <>
                <Route Component={Weatherapp} path='/' />
                <Route Component={Weatherapp} path='*' />
                <Route Component={Loginpage} path='/login' />
                <Route Component={Signuppage} path='/signup' />
              <Route Component={Loginpage} path='/dashboard' />

              </>
            )
          }




        </Routes>
      </div>



    </Router>

  );
}

export default App;
