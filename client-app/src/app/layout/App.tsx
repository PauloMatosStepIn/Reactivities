import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Navbar, Button, Row, ListGroup } from 'react-bootstrap'
import { Activity } from '../models/activity'
import NavBar from './NavBar'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import LoadingComponent from './LoadingComponent'
import { useStore } from '../stores/store'
import { observer } from 'mobx-react-lite'

function App() {
  const { activityStore } = useStore()

  useEffect(() => {
    activityStore.loadActivities()
  }, [])

  if (activityStore.loadingInitial) return <LoadingComponent content="Loading App" />

  return (
    <>
      <NavBar />
      <Container className="content">
        <ActivityDashboard />
      </Container>
    </>
  )
}

export default observer(App)
