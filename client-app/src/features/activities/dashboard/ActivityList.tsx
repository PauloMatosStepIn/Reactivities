import React from 'react'
import { Button } from 'react-bootstrap'
import { Activity } from '../../../app/models/activity'

interface Props {
  activities: Activity[]
  selectActivity: (id: string) => void
  deleteActivity: (id: string) => void
}

export default function ActivityList({ activities, selectActivity, deleteActivity }: Props) {
  return (
    <>
      {activities.map(activity => (
        <div className="card" key={activity.id}>
          <div className="card-body">
            <h5 className="card-title">{activity.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{activity.date}</h6>
            <p className="card-text">{activity.description}</p>
            <p className="card-text">{activity.venue}</p>
            <p className="card-text">{activity.category}</p>
            <Button onClick={() => selectActivity(activity.id)} className="mx-1 float-end" variant="primary" href="#">
              View
            </Button>
            <Button onClick={() => deleteActivity(activity.id)} className="mx-1 float-end" variant="danger" href="#">
              Delete
            </Button>
          </div>
        </div>
      ))}
    </>
  )
}
