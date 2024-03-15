import { useParams, useNavigate } from "react-router-dom";
import successIcon from '../assets/svg/ok.svg'
import failIcon from '../assets/svg/error.svg'

export default function EnrollResult(){
  let { status } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <img src={status === 'true' ? successIcon : failIcon} alt='logo'></img>
      <h1>Participant is {status === 'true' ? "" : 'not'} eligible</h1>
      <p>The participant {status === 'true' ? 'can' : "can't"} participate in this study</p>
      <button onClick={() => {navigate('/participants')}}>Ok</button>
    </div>
  )
}