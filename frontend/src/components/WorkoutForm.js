import React, { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkout'

function WorkoutForm() {
    const { dispatch } = useWorkoutsContext()
    const[title, setTitle] = useState('')
    const[weight, setWeight] = useState('')
    const[reps, setReps] = useState('')
    const[error, setError] = useState(null)
    const[emptyFields, setEmptyFields] = useState([])


    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = {title, weight, reps}

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setTitle('')
            setReps('')
            setWeight('')
            setError(null)
            setEmptyFields([])
            console.log('new workout added', json)
            dispatch({type: 'CREATE_WORKOUTS', payload: json})
        }
    }
    
  return (
    <form className='create' onSubmit={handleSubmit}>
        <h3> Add a New Workout</h3>

        <label> Exercise Title:</label>
        <input 
          type='text'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes('title') ? 'error' : ''}
          />

          <label> Weight:</label>
          <input 
          type='number'
          onChange={(e) => setWeight(e.target.value)}
          value={weight}
          className={emptyFields.includes('weight') ? 'error' : ''}
          />

          <label> Reps:</label>
          <input 
          type='number'
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          className={emptyFields.includes('reps') ? 'error' : ''}
          />

          <button> Add workout</button>
          {error && <div className='error'> {error}</div>}
    </form>
  )
}

export default WorkoutForm