import { useForm } from "react-hook-form"

export default function EnrollParticipant() {
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
    </form>
  </div>
}