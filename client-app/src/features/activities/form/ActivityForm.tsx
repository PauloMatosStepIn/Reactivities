import { observer } from 'mobx-react-lite'
import React, { ChangeEvent, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { Activity } from '../../../app/models/activity'
import { useStore } from '../../../app/stores/store'

export default observer(function ActivityForm() {
  const { activityStore } = useStore()
  const { selectedActivity, closeForm, createActivity, updateActivity, loading } = activityStore

  const initialState = selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: ''
  }

  const [activity, setActivity] = useState(initialState)

  function handleSubmit() {
    activity.id ? updateActivity(activity) : createActivity(activity)
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target
    setActivity({ ...activity, [name]: value })
  }

  return (
    <>
      <Card>
        <Card.Body>
          <Form
            onSubmit={e => {
              handleSubmit()
              e.preventDefault()
            }}
            autoComplete="off"
          >
            <Form.Group>
              <Form.Control onChange={handleInputChange} className="my-1" placeholder="Title" value={activity.title} name="title" />
              <textarea onChange={handleInputChange} className="my-1 form-control" placeholder="Description" value={activity.description} name="description" />
              <Form.Control onChange={handleInputChange} className="my-1" placeholder="Category" value={activity.category} name="category" />
              <Form.Control type="date" onChange={handleInputChange} className="my-1" placeholder="Date" value={activity.date} name="date" />
              <Form.Control onChange={handleInputChange} className="my-1" placeholder="City" value={activity.city} name="city" />
              <Form.Control onChange={handleInputChange} className="my-1" placeholder="Venue" value={activity.venue} name="venue" />
              <div className="mt-3 btn-group d-flex">
                <Button variant="primary" type="submit">
                  {loading ? <LoadingComponent isButton={true} content="Submitting" /> : 'Submit'}
                </Button>
                <Button onClick={closeForm} variant="secondary" type="button">
                  Cancel
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
})
