import { observer } from 'mobx-react-lite'
import React, { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { Activity } from '../../../app/models/activity'
import { useStore } from '../../../app/stores/store'
import { v4 as uuid } from 'uuid'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import MyTextInput from '../../../app/common/form/MyTextInput'
import MyTextArea from '../../../app/common/form/MyTextArea'
import MySelectInput from '../../../app/common/form/MySelectInput'
import { categoryOptions } from '../../../app/common/options/categoryOptions'
import MyDateInput from '../../../app/common/form/MyDateInput'

export default observer(function ActivityForm() {
  const navigate = useNavigate()

  const { activityStore } = useStore()
  const { loadActivity, selectedActivity, createActivity, updateActivity, loading, loadingInitial } = activityStore
  const { id } = useParams<{ id: string }>()

  const [activity, setActivity] = useState<Activity>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: null,
    city: '',
    venue: ''
  })

  const validationSchema = Yup.object({
    title: Yup.string().required('Titulo de Actividade Obrigatório'),
    category: Yup.string().required('Categoria de Actividade Obrigatória'),
    description: Yup.string().required('Descrição de Actividade Obrigatória'),
    date: Yup.string().required('Data de Actividade Obrigatória').nullable(),
    city: Yup.string().required('Cidade de Actividade Obrigatória'),
    venue: Yup.string().required('Local de Actividade Obrigatório')
  })

  useEffect(() => {
    if (id) loadActivity(id).then(activity => setActivity(activity!))
    else {
      setActivity({
        id: '',
        title: '',
        category: '',
        description: '',
        date: null,
        city: '',
        venue: ''
      })
    }
  }, [id, loadActivity])

  function handleFormSubmit(activity: Activity) {
    // activity.id ? updateActivity(activity) : createActivity(activity)
    console.log('handleSubmit')
    if (activity.id.length === 0) {
      let newActivity = { ...activity, id: uuid() }
      createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`))
    } else {
      updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
    }
  }

  if (loadingInitial) return <LoadingComponent content="Loading Activity..." />

  return (
    <>
      <Card>
        <Card.Body>
          <Formik validationSchema={validationSchema} enableReinitialize initialValues={activity} onSubmit={values => handleFormSubmit(values)}>
            {({ errors, touched, handleSubmit, isValid, isSubmitting, dirty }) => (
              <Form
                onSubmit={e => {
                  handleSubmit()
                  e.preventDefault()
                }}
                autoComplete="off"
              >
                <MyTextInput label="TÍTULO" name="title" placeholder="Title" />
                <MyTextArea rows={3} label="DESCRIÇÃO" placeholder="Description" name="description" />
                <MySelectInput options={categoryOptions} placeholder="Category" name="category" />
                <MyDateInput placeholderText="Date" name="date" showTimeSelect timeCaption="time" dateFormat={'MMMM d, yyyy h:mm aa'} />
                <MyTextInput label="CIDADE" name="city" placeholder="City" />
                <MyTextInput label="LOCAL" name="venue" placeholder="Venue" />

                <div className="mt-3 btn-group d-flex">
                  <Button disabled={isSubmitting || !isValid || !dirty} variant="primary" type="submit">
                    {loading ? <LoadingComponent isButton={true} content="Submitting" /> : 'Submit'}
                  </Button>
                  <Button onClick={() => navigate(`/activities/${activity.id}`)} variant="secondary" type="button">
                    Cancel
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </>
  )
})
