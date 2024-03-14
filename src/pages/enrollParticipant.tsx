import { useForm } from "react-hook-form"
import { useQuery, useLazyQuery , useMutation, gql } from '@apollo/client';
import { Trial } from '../../api/src/graphql'
import { ErrorMessage } from "@hookform/error-message"

const GET_TRIALS = gql`
  {
    trials {
      id
    }
  }
`;

const ENROLL_PARTICIPANT = gql`
  mutation CreateParticipant(
    $trialId: String
    $ParticipantInfo: ParticipantInfo!
  ) {
    createParticipant(
      participantInfo: $ParticipantInfo
      trialId: $trialId,
    ) {
      id
    }
  }
`

const VALIDATE_PARTICIPANT = gql`
  query ValidateParticipant($participantId: Int!) {
    validateParticipant(participantId: $participantId) 
  }
`

export default function EnrollParticipant() {
  const { data: trials } = useQuery(GET_TRIALS);
  const [validateParticipant, {}] = useLazyQuery(VALIDATE_PARTICIPANT)
  const [enrollParticipant, {}] = useMutation(ENROLL_PARTICIPANT);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm()

  const submitForm = async (formData: any) => {
    console.log(formData)
    const newParticipant = await enrollParticipant({variables: {
        ParticipantInfo: {
        name: formData.name, 
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        hasDiabetes: formData.hasDiabetes,
        hadCovid: formData.hadCovid
      },
      trialId: formData.trialId
    }})
    const participantValid = await validateParticipant({variables: {participantId: newParticipant.data.createParticipant.id}})
    console.log(participantValid)
  }

  return <div>
    <p>Enroll a participant</p>
    <form onSubmit = {handleSubmit(submitForm)}>
      <div>
        <label>Name</label>
        <input type="text" {...register('name', {required: true})}/>
        <ErrorMessage errors={errors} name="name" render={({ message }) => <p>{message || 'required'}</p>} />
      </div>
      <div>
        <label>Height (inches)</label>
        <input type="number" {...register('height', {required: true})}/>
        <ErrorMessage errors={errors} name="height" render={({ message }) => <p>{message || 'required'}</p>}/>
      </div>
      <div>
        <label>Weight (pounds)</label>
        <input type="number" {...register('weight', {required: true})}/>
        <ErrorMessage errors={errors} name="weight" render={({ message }) => <p>{message || 'required'}</p>}/>
      </div>
      <div>
        <input type='checkbox' {...register('hasDiabetes')}/>
        <label>I have diabetes</label>
      </div>
      <div>
        <input type='checkbox' {...register('hadCovid')}/>
        <label>I had COVID-19</label>
      </div>
      {trials && 
      <div>
        <label>Trial</label>
        <select {...register('trialId', {required: true})}>
        {trials.trials.map((trial: Trial) => (<option value={trial.id}>Trial {trial.id}</option>))}
       </select>
       <ErrorMessage errors={errors} name="trialId" render={({ message }) => <p>{message || 'required'}</p>}/>
      </div>
      }
      <button type='submit'>Save</button>
    </form>
  </div>
}