import { NavLink } from "react-router-dom";
import curebaseLogo from '../assets/svg/curebase-logo.svg'
import styled from 'styled-components';

const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #F5F5F5;
  height: 148px;
`

const NavLinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  margin-right: 60px;
`

const CurbaseLogoContainer = styled.img`
  margin-left: 60px
`

export default function NavBar () {
  return ( 
    <NavContainer>
      <CurbaseLogoContainer src={curebaseLogo} alt='logo' width='286px' height='80px' />
      <NavLinkContainer>
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
      </NavLinkContainer> 
    </NavContainer>
  )
}