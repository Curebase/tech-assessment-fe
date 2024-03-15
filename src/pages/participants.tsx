import { useQuery } from '@apollo/client';
import { Participant } from '../../api/src/graphql'
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import { Button } from '../components/button';
import { GET_PARTICIPANTS } from '../queries';


export default function Participants () {
  const { data } = useQuery(GET_PARTICIPANTS);
  const navigate = useNavigate()
  return (
    <div>
      <p>Participants</p>
      <Button onClick={() => {navigate('/participants/enrollParticipant')} }>
        Enroll a participant
      </Button>
      {data && <ul>{data?.participants?.map((participant: Participant) => (
        //@ts-ignore
        <li>{participant.name} - Enrolled in {`${DateTime.fromISO(participant.enrolledDate).toFormat('LLL, d')}`}</li>
        ))}</ul>}
    </div>
  )
}