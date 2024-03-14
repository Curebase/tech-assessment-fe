import { NavLink } from "react-router-dom";
import curebaseLogo from '../assets/svg/curebase-logo.svg'

export default function NavBar () {
  return ( 
    <nav>
      <img src={curebaseLogo} alt='logo'></img>
      <NavLink
        to="/participants"
      >
        Participants
      </NavLink>
      <NavLink
        to="/trials"
      >
        Trials
      </NavLink>
    </nav>
  )
}