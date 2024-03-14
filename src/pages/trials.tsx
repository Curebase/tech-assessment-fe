import { useQuery, gql } from '@apollo/client';
import { Trial } from '../../api/src/graphql'

const GET_TRIALS = gql`
  {
    trials {
      id
    }
  }
`;

export default function Trials () {
  const { loading, error, data } = useQuery(GET_TRIALS);
  return (
    <div>
    <p>Trials</p>
    {data && <ul>{data?.trials?.map((participant: Trial) => (
      <li>Trial {participant.id}</li>
      ))}</ul>}
  </div>
  )
}
