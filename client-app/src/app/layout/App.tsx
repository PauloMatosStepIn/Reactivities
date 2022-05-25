import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import NavBar from './NavBar'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import { observer } from 'mobx-react-lite'
import { Route, Routes, useLocation } from 'react-router-dom'
import HomePage from '../../features/home/HomePage'
import ActivityForm from '../../features/activities/form/ActivityForm'
import ActivityDetails from '../../features/activities/details/ActivityDetails'
import TestErrors from '../../features/errors/TestError'

function App() {
  const location = useLocation()
  console.log(location.pathname)

  return (
    <>
      {location.pathname === '/' ? '' : <NavBar />}
      <Container className="content">
        <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route path="/activities" element={<ActivityDashboard />} />
          <Route path="/activities/:id" element={<ActivityDetails />} />
          <Route path="/createActivity" element={<ActivityForm />} />
          <Route path="/manage/:id" element={<ActivityForm />} />
          <Route path="/errors" element={<TestErrors />} />
        </Routes>
      </Container>
    </>
  )
}

export default observer(App)
