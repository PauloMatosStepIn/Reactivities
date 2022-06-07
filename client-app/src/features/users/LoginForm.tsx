import React from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Row } from 'react-bootstrap'
import MyTextInput from '../../app/common/form/MyTextInput'
import { useStore } from '../../app/stores/store'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import LoadingComponent from '../../app/layout/LoadingComponent'
import { useNavigate } from 'react-router-dom'
import ValidationErrors from '../errors/ValidationErrors'
import * as Yup from 'yup'

export default observer(function LoginForm() {
  const { userStore } = useStore()
  const navigate = useNavigate()

  return (
    <Formik
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Email is invalid').required('Email is required'),
        password: Yup.string().required('Password is required')
      })}
      initialValues={{ email: '', password: '', error: null }}
      onSubmit={(values, { setErrors }) => userStore.login(values).catch(error => setErrors({ error: 'Invalid UserName/Password' }))}
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form
          onSubmit={e => {
            handleSubmit()
            e.preventDefault()
          }}
          autoComplete="off"
        >
          <h3 style={{ textAlign: 'center' }}>Login to Reactivities</h3>
          <MyTextInput name="email" placeholder="Email" label="EMAIL" />
          <MyTextInput name="password" placeholder="Password" label="PASSWORD" type="password" />
          <Row className="p-2 sm">{!!errors.error && <span className="btn btn-danger btn-sm ">{errors.error}</span>}</Row>
          <div className="mt-3 btn-group d-flex">
            <Button disabled={isSubmitting} variant="primary" type="submit">
              {isSubmitting ? <LoadingComponent isButton={true} /> : 'Login'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
})
