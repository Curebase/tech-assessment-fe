import { useQuery } from '@apollo/client';
import { Participant } from '../../api/src/graphql'
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import { GET_PARTICIPANTS } from '../queries';


export default function Participants () {
  const { data } = useQuery(GET_PARTICIPANTS);
  return (
    <div>
      <p>Participants</p>
      <button>
        <Link to='/participants/enrollParticipant'>Enroll a Participant</Link>
      </button>
      {data && <ul>{data?.participants?.map((participant: Participant) => (
        //@ts-ignore
        <li>{participant.name} - Enrolled in {`${DateTime.fromISO(participant.enrolledDate).toFormat('LLL, d')}`}</li>
        ))}</ul>}
    </div>
  )
}