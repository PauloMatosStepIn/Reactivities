import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Navbar, Button, Row, ListGroup } from 'react-bootstrap'

function App() {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities').then(response => {
      console.log(response)
      setActivities(response.data)
    })
  }, [])

  return (
    <div className="App">
      <Row>
        <Button variant="primary">Primary</Button>
      </Row>

      <br />
      <img src={logo} className="App-logo" alt="logo" />
      <Row>
        <ListGroup>
          {activities.map((activity: any) => (
            <ListGroup.Item key={activity.id}>{activity.title}</ListGroup.Item>
          ))}
        </ListGroup>
      </Row>
    </div>
  )
}

export default App
