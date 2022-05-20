import React from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { useStore } from '../../../app/stores/store'

export default function ActivityDetails() {
  const { activityStore } = useStore()

  const { selectedActivity: activity, openForm, cancelSelectedActivity } = activityStore

  if (!activity) return <LoadingComponent />

  return (
    <>
      <div className="card fluid" key={activity.id}>
        <div className="card-body">
          <img src={`/assets/categoryImages/${activity.category}.jpg`} className="card-img-top" />

          <h5 className="card-title">{activity.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{activity.date}</h6>
          <p className="card-text">{activity.description}</p>
          <p className="card-text">{activity.venue}</p>

          <div className="btn-group d-flex">
            <Button onClick={() => openForm(activity.id)} variant="primary" href="#">
              Edit
            </Button>
            <Button onClick={cancelSelectedActivity} variant="secondary" href="#">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
