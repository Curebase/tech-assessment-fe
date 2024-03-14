import { useQuery, gql } from '@apollo/client';

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

function Participants () {
  const { loading, error, data } = useQuery(GET_PARTICIPANTS);
  return (
    <div>
      <p>Participants</p>
      {data && <ul>{data?.participants?.map((participant: any) => (
        <li>{participant.name}</li>
        ))}</ul>}
    </div>
  )
}

export default Participants