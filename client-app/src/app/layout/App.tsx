import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Navbar, Button, Row, ListGroup } from 'react-bootstrap'
import { Activity } from '../models/activity'
import NavBar from './NavBar'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import { v4 as uuid } from 'uuid'
// import axios from 'axios'
import agent from '../api/agent'
import LoadingComponent from './LoadingComponent'

function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectActivity] = useState<Activity | undefined>(undefined)
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  function HandleSelectActivity(id: string) {
    setSelectActivity(activities.find(x => x.id === id))
  }

  function HandleCancelActivity() {
    setSelectActivity(undefined)
  }

  function HandleFormOpen(id?: string) {
    id ? HandleSelectActivity(id) : HandleCancelActivity()
    setEditMode(true)
  }

  function HandleFormClose() {
    setEditMode(false)
  }

  function HandleCreateOrEditActivity(activity: Activity) {
    setSubmitting(true)
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities, activity])
        setEditMode(false)
        setSelectActivity(activity)
        setSubmitting(false)
      })
    } else {
      activity.id = uuid()
      agent.Activities.create(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity])
        setEditMode(false)
        setSelectActivity(activity)
        setSubmitting(false)
      })
    }
  }

  function HandleDeleteActivity(id: string) {
    setSubmitting(true)
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)])
      setSubmitting(false)
    })
  }

  useEffect(() => {
    // axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
    //   setActivities(response.data)
    // })
    agent.Activities.list().then(response => {
      let activities: Activity[] = []
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0]
      })
      setActivities(response)
      setLoading(false)
    })
  }, [])

  if (loading) return <LoadingComponent content="Loading App" />

  return (
    <>
      <NavBar openForm={HandleFormOpen} />
      <Container className="content">
        <ActivityDashboard activities={activities} selectedActivity={selectedActivity} selectActivity={HandleSelectActivity} cancelSelectActivity={HandleCancelActivity} editMode={editMode} openForm={HandleFormOpen} closeForm={HandleFormClose} createOrEdit={HandleCreateOrEditActivity} deleteActivity={HandleDeleteActivity} submitting={submitting} />
      </Container>
    </>
  )
}

export default App
