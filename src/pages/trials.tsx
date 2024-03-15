import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { Trial } from '../../api/src/graphql'
import ListCard from '../components/listCard';
import { PageContainer } from '../components/pageContainer';
import { TitleText } from '../components/titleText';
import { GET_TRIALS_WITH_PARTICIPANTS } from '../queries';


const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 800px;
  margin-bottom: 30px;
  height: 40px;
`

export default function Trials () {
  const { data } = useQuery(GET_TRIALS_WITH_PARTICIPANTS);
  return (
    <PageContainer>
      <TitleContainer>
        <TitleText>Trials</TitleText>
      </TitleContainer>
      {data && <List>
        {data?.trials?.map((trial: Trial) => (
        //@ts-ignore
        <ListCard mainText={`Trial ${trial.id}`} subText={`${trial?.participants?.length} participant${trial?.participants && trial?.participants?.length > 1 ? "s" : ""}`}/>
        ))}
      </List>}
    </PageContainer>
  )
}
