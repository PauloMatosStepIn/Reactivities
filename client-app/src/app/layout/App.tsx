import React, { useEffect } from 'react'
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
import { ToastContainer } from 'react-toastify'
import NotFound from '../../features/errors/NotFound'
import ServerError from '../../features/errors/ServerError'
import LoginForm from '../../features/users/LoginForm'
import CommonStore from '../stores/commonStore'
import UserStore from '../stores/userStore'
import { useStore } from '../stores/store'
import LoadingComponent from './LoadingComponent'
import ModalContainer from '../common/modals/ModalContainer'

function App() {
  const location = useLocation()
  console.log(location.pathname)

  const { commonStore, userStore } = useStore()

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    } else {
      commonStore.setAppLoaded()
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content="Loading App..." />

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      <ModalContainer />
      {location.pathname === '/' ? '' : <NavBar />}
      <Container className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/activities" element={<ActivityDashboard />} />
          <Route path="/activities/:id" element={<ActivityDetails />} />
          <Route path="/createActivity" element={<ActivityForm />} />
          <Route path="/manage/:id" element={<ActivityForm />} />
          <Route path="/errors" element={<TestErrors />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/server-error" element={<ServerError />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Container>
    </>
  )
}

export default observer(App)
