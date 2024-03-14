import { useQuery, gql } from '@apollo/client';
import { Trial } from '../../api/src/graphql'

const GET_TRIALS = gql`
  {
    trials {
      id
      participants {
        id
      }
    }
  }
`;

export default function Trials () {
  const { loading, error, data } = useQuery(GET_TRIALS);
  return (
    <div>
    <p>Trials</p>
    {data && <ul>{data?.trials?.map((trial: Trial) => (
      <li>Trial {trial.id} - {trial?.participants?.length} participant{trial?.participants && trial?.participants?.length > 1 ? "s" : ""}</li>
      ))}</ul>}
  </div>
  )
}