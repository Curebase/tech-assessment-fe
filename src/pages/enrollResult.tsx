import styled from 'styled-components';
import { useParams, useNavigate } from "react-router-dom";
import successIcon from '../assets/svg/ok.svg'
import failIcon from '../assets/svg/error.svg'
import { PageContainer } from "../components/pageContainer";
import { TitleText } from "../components/titleText";
import { Button } from "../components/button";

const ResultPageContainer = styled(PageContainer)`
  gap: 30px;
  margin-top: 150px;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  margin-top: 0px
`

const SubText = styled.p`
  font-family: Lato;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.5px;
  text-align: left;
  color: #000000;
  margin: 0px;
`

export default function EnrollResult(){
  let { status } = useParams();
  const navigate = useNavigate();
  return (
    <ResultPageContainer>
      <img src={status === 'true' ? successIcon : failIcon} alt='logo'></img>
      <TextContainer>
        <TitleText>Participant is {status === 'true' ? "" : 'not'} eligible</TitleText>
        <SubText>The participant {status === 'true' ? 'can' : "can't"} participate in this study</SubText>
      </TextContainer>
      <Button onClick={() => {navigate('/participants')}}>OK</Button>
    </ResultPageContainer>
  )
}