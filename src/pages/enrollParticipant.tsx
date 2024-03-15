import styled from 'styled-components';
import { useForm } from "react-hook-form"
import { useQuery, useLazyQuery , useMutation } from '@apollo/client';
import { Trial } from '../../api/src/graphql'
import { ErrorMessage } from "@hookform/error-message"
import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { PageContainer } from '../components/pageContainer';
import { TitleText } from '../components/titleText';
import { Label } from '../components/label';
import { Checkbox } from '../components/checkbox';
import { GET_PARTICIPANTS, GET_TRIALS, VALIDATE_PARTICIPANT, CREATE_PARTICIPANT, ENROLL_PARTICIPANT, GET_TRIALS_WITH_PARTICIPANTS } from "../queries";

const NameInput = styled(Input)`
  width: 400px
`

const NumberInput = styled(Input)`
  width: 122px;
`

const SubPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 800px;
`

const Form = styled.form`
  margin-top: 45px;
`

const FromContainer = styled(SubPageContainer)`
  gap: 29px;
`

const VerticalFormRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  column-gap: 7px;
`
const HorizontalFormRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`

const CheckboxRow = styled(VerticalFormRow)`
  gap: 15px;
`



export default function EnrollParticipant() {
  const { data: trials } = useQuery(GET_TRIALS);
  const navigate = useNavigate();
  const [validateParticipant, {}] = useLazyQuery(VALIDATE_PARTICIPANT)
  const [createParticipant, {}] = useMutation(CREATE_PARTICIPANT);
  const [EnrollParticipant, {}] = useMutation(ENROLL_PARTICIPANT);
  const { refetch: refetchParticipants } = useQuery(GET_PARTICIPANTS)
  const { refetch: refetchTrials } = useQuery(GET_TRIALS_WITH_PARTICIPANTS)

  const { register, handleSubmit, formState: { errors } } = useForm()

  const submitForm = async (formData: any) => {
    const newParticipant = await createParticipant({variables: {
        ParticipantInfo: {
        name: formData.name, 
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        hasDiabetes: formData.hasDiabetes,
        hadCovid: formData.hadCovid
      }
    }})
    const participantValid = await validateParticipant({variables: {participantId: newParticipant.data.createParticipant.id}})
    if (participantValid.data.validateParticipant === true) {
      await EnrollParticipant({variables: {participantId: newParticipant.data.createParticipant.id, trialId: formData.trialId}})
      refetchTrials()
    }
    refetchParticipants()
    return navigate(`${participantValid.data.validateParticipant}`)
  }

  return (<PageContainer>
    <SubPageContainer>
      <TitleText>Enroll a participant</TitleText>
      <Form onSubmit = {handleSubmit(submitForm)}>
        <FromContainer>
          <VerticalFormRow>
            <Label>Name</Label>
            <NameInput type="text" {...register('name', {required: true})}/>
            <ErrorMessage errors={errors} name="name" render={({ message }) => <p>{message || 'required'}</p>} />
          </VerticalFormRow>
          <VerticalFormRow>
            <Label>Height (inches)</Label>
            <NumberInput type="number" {...register('height', {required: true})}/>
            <ErrorMessage errors={errors} name="height" render={({ message }) => <p>{message || 'required'}</p>}/>
          </VerticalFormRow>
          <VerticalFormRow>
            <Label>Weight (pounds)</Label>
            <NumberInput type="number" {...register('weight', {required: true})}/>
            <ErrorMessage errors={errors} name="weight" render={({ message }) => <p>{message || 'required'}</p>}/>
          </VerticalFormRow>
          <CheckboxRow>
            <HorizontalFormRow>
              <Checkbox type='checkbox' {...register('hasDiabetes')}/>
              <Label>I have diabetes</Label>
            </HorizontalFormRow>
            <HorizontalFormRow>
              <Checkbox type='checkbox' {...register('hadCovid')}/>
              <Label>I had COVID-19</Label>
            </HorizontalFormRow>
          </CheckboxRow>
          {trials && 
          <VerticalFormRow>
            <Label>Trial</Label>
            <select {...register('trialId', {required: true})}>
              {trials.trials.map((trial: Trial) => (<option value={trial.id}>Trial {trial.id}</option>))}
            </select>
            <ErrorMessage errors={errors} name="trialId" render={({ message }) => <p>{message || 'required'}</p>}/>
          </VerticalFormRow>
          }
          <Button type='submit'>Save</Button>
        </FromContainer>
      </Form>
    </SubPageContainer>
  </PageContainer>)
}