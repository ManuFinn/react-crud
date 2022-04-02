import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from './MainPage';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';

export default function App() {
	return (
	  <Router>
		<Routes>
			<Route  path='/' element={<MainPage/>} />
			<Route  path='/create' element={<CreateUser/>} />
			<Route  path='/update/:id' element={<UpdateUser/>} />
        </Routes>
	  </Router>
	);
}