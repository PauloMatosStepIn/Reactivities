import React from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import axios from 'axios'

export default function TestErrors() {
  const baseUrl = 'http://localhost:5000/'

  function handleNotFound() {
    axios.get(baseUrl + 'Buggy/not-found').catch(err => console.log(err.response))
  }

  function handleBadRequest() {
    axios.get(baseUrl + 'Buggy/bad-request').catch(err => console.log(err.response))
  }

  function handleServerError() {
    axios.get(baseUrl + 'Buggy/server-error').catch(err => console.log(err.response))
  }

  function handleUnauthorised() {
    axios.get(baseUrl + 'Buggy/unauthorised').catch(err => console.log(err.response))
  }

  function handleBadGuid() {
    axios.get(baseUrl + 'api/activities/notaguid').catch(err => console.log(err.response))
  }

  function handleValidationError() {
    axios.post(baseUrl + 'api/activities', {}).catch(err => console.log(err.response))
  }

  return (
    <>
      <h1>Test Error component</h1>
      <div>
        <ButtonGroup>
          <Button onClick={handleNotFound} variant="primary">
            Not Found
          </Button>
          <Button onClick={handleBadRequest} variant="primary">
            Bad Request
          </Button>
          <Button onClick={handleValidationError} variant="primary">
            Validation Error
          </Button>
          <Button onClick={handleServerError} variant="primary">
            Server Error
          </Button>
          <Button onClick={handleUnauthorised} variant="primary">
            Unauthorised
          </Button>
          <Button onClick={handleBadGuid} variant="primary">
            Bad Guid
          </Button>
        </ButtonGroup>
      </div>
    </>
  )
}
