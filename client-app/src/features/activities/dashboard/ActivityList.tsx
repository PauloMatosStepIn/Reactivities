import React, { SyntheticEvent, useState } from 'react'
import { Button } from 'react-bootstrap'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { Activity } from '../../../app/models/activity'

interface Props {
  activities: Activity[]
  selectActivity: (id: string) => void
  deleteActivity: (id: string) => void
  submitting: boolean
}

export default function ActivityList({ activities, selectActivity, deleteActivity, submitting }: Props) {
  const [target, setTarget] = useState('')

  function HandleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    e.preventDefault()
    setTarget(e.currentTarget.name)
    deleteActivity(id)
  }

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
            <Button name={activity.id} onClick={e => HandleActivityDelete(e, activity.id)} className="mx-1 float-end" variant="danger" href="#">
              {submitting && target === activity.id ? <LoadingComponent isButton={true} content="Deleting" /> : <>Delete</>}
            </Button>
          </div>
        </div>
      ))}
    </>
  )
}
