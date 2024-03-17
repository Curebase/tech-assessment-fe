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

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`

const NavLinkText = styled.p<{$active?: boolean}>`
  font-family: Lato;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.10000000149011612px;
  text-align: left;
  color: ${props => props.$active ? "#325F64" : "#0C0C0D7A"};
  
`

export default function NavBar () {
  return ( 
    <NavContainer>
      <CurbaseLogoContainer src={curebaseLogo} alt='logo' width='286px' height='80px' />
      <NavLinkContainer>
        <StyledNavLink
          to="/participants"
        >
          {({ isActive }: {isActive: boolean}) => (
            <NavLinkText $active={isActive}>Participants</NavLinkText>
          )}
        </StyledNavLink>
        <StyledNavLink
          to="/trials"
        >
          {({ isActive }: {isActive: boolean}) => (
            <NavLinkText $active={isActive}>Trials</NavLinkText>
          )}
        </StyledNavLink>
      </NavLinkContainer> 
    </NavContainer>
  )
}