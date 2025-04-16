
import { Routes, Route } from "react-router-dom";
import Navbar from './components/NavBar';
import HomePage from './components/HomePage';
import Characters from './components/Characters';
import CharInfo from './components/CharInfo';
import UserForm from "./components/UserForm";
import Delete from "./components/Delete";
import Update from "./components/Update";
import NotFound from './components/NotFound';
import './App.css';


function App() {
  

  return (
    <>
    <h1>Marvel Library</h1>
    <Navbar />
    <Routes>
      <Route path='/' element={ <HomePage/>} />
      <Route path='/characters' element={ <Characters/>} />
      <Route path='/characters/:id' element={ <CharInfo/>} />
      <Route path='/user-form' element={ <UserForm/>} />
      <Route path='/delete' element={ <Delete />} />
      <Route path='/update' element={ <Update />} />
      <Route path='*' element={ <NotFound/>} />
    </Routes>

    
    </>
  )
}

export default App
