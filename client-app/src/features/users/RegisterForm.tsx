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
import { Console } from 'console'

export default observer(function RegisterForm() {
  const { userStore } = useStore()
  const navigate = useNavigate()

  return (
    <Formik
      validationSchema={Yup.object().shape({
        displayName: Yup.string().required('Display Name is required'),
        username: Yup.string().required('User Name is required'),
        email: Yup.string().email('Email is invalid').required('Email is required'),
        password: Yup.string().required('Password is required')
      })}
      initialValues={{ displayName: '', username: '', email: '', password: '', error: null }}
      onSubmit={(values, { setErrors }) => userStore.register(values).catch(error => console.log({ error }))}
    >
      {({ handleSubmit, isSubmitting, errors, status, touched }) => (
        <Form
          onSubmit={e => {
            handleSubmit()
            e.preventDefault()
            console.log(errors)
          }}
          autoComplete="off"
          className='error'
        >
          <h3 style={{ textAlign: 'center' }}>Register to Reactivities</h3>
          <MyTextInput name="displayName" placeholder="Display Name" label="Display Name" />
          <MyTextInput name="username" placeholder="User Name" label="User Name" />
          <MyTextInput name="email" placeholder="Email" label="EMAIL" />
          <MyTextInput name="password" placeholder="Password" label="PASSWORD" type="password" />

          {/* <Row className="p-2 sm">{!!errors.error && <span className="btn btn-danger btn-sm ">Registo com Erros</span>}</Row> */}

          {/* <ErrorMessage name="error" render={() => <ValidationErrors errors={errors.error} />} /> */}

          {!!errors.error && <ValidationErrors errors={errors.error} />}

          <div className="mt-3 btn-group d-flex">
            <Button disabled={isSubmitting} variant="primary" type="submit">
              {isSubmitting ? <LoadingComponent isButton={true} /> : 'Register'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
})
