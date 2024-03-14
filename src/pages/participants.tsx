import { useQuery, gql } from '@apollo/client';
import { Participant } from '../../api/src/graphql'

const GET_PARTICIPANTS = gql`
  {
    participants {
      id
      name
      hasCovid
      hasDiabetes
      enrolledDate
    }
  }
`;

export default function Participants () {
  const { loading, error, data } = useQuery(GET_PARTICIPANTS);
  return (
    <div>
      <p>Participants</p>
      {data && <ul>{data?.participants?.map((participant: Participant) => (
        <li>{participant.name}</li>
        ))}</ul>}
    </div>
  )
}