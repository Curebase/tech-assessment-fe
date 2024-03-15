import { useQuery } from '@apollo/client';
import { Trial } from '../../api/src/graphql'
import { GET_TRIALS_WITH_PARTICIPANTS } from '../queries';


export default function Trials () {
  const { data } = useQuery(GET_TRIALS_WITH_PARTICIPANTS);
  return (
    <div>
    <p>Trials</p>
    {data && <ul>{data?.trials?.map((trial: Trial) => (
      <li>Trial {trial.id} - {trial?.participants?.length} participant{trial?.participants && trial?.participants?.length > 1 ? "s" : ""}</li>
      ))}</ul>}
  </div>
  )
}
