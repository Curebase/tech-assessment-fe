import React from 'react';
import NavBar from './components/navBar';
import { Outlet } from "react-router-dom";

function App() {
  return <>
    <NavBar />
    <div id="detail">
        <Outlet />
    </div>
  </>
}

export default App;
