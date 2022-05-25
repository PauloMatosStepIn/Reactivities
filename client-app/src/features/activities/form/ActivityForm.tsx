import { observer } from 'mobx-react-lite'
import React, { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { Activity } from '../../../app/models/activity'
import { useStore } from '../../../app/stores/store'
import { v4 as uuid } from 'uuid'

export default observer(function ActivityForm() {
  const navigate = useNavigate()

  const { activityStore } = useStore()
  const { loadActivity, selectedActivity, createActivity, updateActivity, loading, loadingInitial } = activityStore
  const { id } = useParams<{ id: string }>()

  const [activity, setActivity] = useState({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: ''
  })

  useEffect(() => {
    if (id) loadActivity(id).then(activity => setActivity(activity!))
    else {
      setActivity({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
      })
    }
  }, [id, loadActivity])

  function handleSubmit() {
    // activity.id ? updateActivity(activity) : createActivity(activity)
    console.log('handleSubmit')
    if (activity.id.length === 0) {
      let newActivity = { ...activity, id: uuid() }
      createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`))
    } else {
      updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target
    setActivity({ ...activity, [name]: value })
  }

  if (loadingInitial) return <LoadingComponent content="Loading Activity..." />

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
            </Form.Group>
            <Form.Group className="mt-3 btn-group d-flex">
              <Button variant="primary" type="submit">
                {loading ? <LoadingComponent isButton={true} content="Submitting" /> : 'Submit'}
              </Button>
              <Button onClick={() => navigate(`/activities/${activity.id}`)} variant="secondary" type="button">
                Cancel
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
})
