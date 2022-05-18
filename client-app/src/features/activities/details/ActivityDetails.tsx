import React from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { Activity } from '../../../app/models/activity'

interface Props {
  activity: Activity
  cancelSelectActivity: () => void
  openForm: (id: string) => void
}

export default function ActivityDetails({ activity, cancelSelectActivity, openForm }: Props) {
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
            <Button onClick={cancelSelectActivity} variant="secondary" href="#">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
