import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { Participant } from '../../api/src/graphql'
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import { Button } from '../components/button';
import ListCard from '../components/listCard';
import { PageContainer } from '../components/pageContainer';
import { TitleText } from '../components/titleText';
import { GET_PARTICIPANTS } from '../queries';

const TitleButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 800px;
  height: 40px;
  margin-bottom: 60px;
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export default function Participants () {
  const { data } = useQuery(GET_PARTICIPANTS);
  const navigate = useNavigate()
  return (
    <PageContainer>
      <TitleButtonContainer>
        <TitleText>Participants</TitleText>
        <Button onClick={() => {navigate('/participants/enrollParticipant')} }>
          Enroll a participant
        </Button>
      </TitleButtonContainer>
      {data && <List>
        {data?.participants?.map((participant: Participant) => (
        //@ts-ignore
        <ListCard mainText={participant.name} subText={`Enrolled in ${DateTime.fromISO(participant.enrolledDate).toFormat('LLL, d')}`}/>
        ))}
      </List>}
    </PageContainer>
  )
}