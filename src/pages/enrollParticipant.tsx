import { useForm } from "react-hook-form"
import { useQuery, gql } from '@apollo/client';
import { Trial } from '../../api/src/graphql'

const GET_TRIALS = gql`
  {
    trials {
      id
    }
  }
`;

export default function EnrollParticipant() {
  const { loading, error, data: trials } = useQuery(GET_TRIALS);
  const { register, handleSubmit } = useForm()
  return <div>
    <p>Enroll a participant</p>
    <form>
      <div>
        <label>Name</label>
        <input type="text" {...register('name', {required: true})}/>
      </div>
      <div>
        <label>Height (inches)</label>
        <input type="number" {...register('height', {required: true})}/>
      </div>
      <div>
        <label>Weight (pounds)</label>
        <input type="number" {...register('weight', {required: true})}/>
      </div>
      <div>
        <input type='checkbox' {...register('hasDiabetes', {required: true})}/>
        <label>I have diabetes</label>
      </div>
      <div>
        <input type='checkbox' {...register('hadCovid', {required: true})}/>
        <label>I had COVID-19</label>
      </div>
      {trials && 
      <div>
        <label>Trial</label>
        <select {...register('trialId', {required: true})}>
        {trials.trials.map((trial: Trial) => (<option value={trial.id}>Trial {trial.id}</option>))}
       </select>
      </div>
      }
      <button type='submit'>Save</button>
    </form>
  </div>
}