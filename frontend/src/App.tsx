import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage'
import SingleSessionPage from './components/SingleSessionPage'
import MultiSessionPage from './components/MultiSessionPage'
import FourOhFour from './components/FourOhFour';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={LandingPage}/>
        <Route path='/single' Component={SingleSessionPage}/>
        <Route path='/multi' Component={MultiSessionPage}/>
        <Route path='*' Component={FourOhFour} />
      </Routes>
    </ Router>
  )
}

export default App
