import React, { useEffect, useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Navbar, Button, Row, ListGroup } from 'react-bootstrap'
import { Activity } from '../models/activity'
import NavBar from './NavBar'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import { v4 as uuid } from 'uuid'

function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectActivity] = useState<Activity | undefined>(undefined)
  const [editMode, setEditMode] = useState(false)

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
    activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity]) : setActivities([...activities, { ...activity, id: uuid() }])
    setEditMode(false)
    setSelectActivity(activity)
  }

  function HandleDeleteActivity(id: string) {
    setActivities([...activities.filter(x => x.id !== id)])
  }

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
      setActivities(response.data)
    })
  }, [])

  return (
    <>
      <NavBar openForm={HandleFormOpen} />
      <Container className="content">
        <ActivityDashboard activities={activities} selectedActivity={selectedActivity} selectActivity={HandleSelectActivity} cancelSelectActivity={HandleCancelActivity} editMode={editMode} openForm={HandleFormOpen} closeForm={HandleFormClose} createOrEdit={HandleCreateOrEditActivity} deleteActivity={HandleDeleteActivity} />
      </Container>
    </>
  )
}

export default App
