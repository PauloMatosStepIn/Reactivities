import React, { SyntheticEvent, useState } from 'react'
import { Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { Activity } from '../../../app/models/activity'
import { useStore } from '../../../app/stores/store'

interface Props {
  activity: Activity
}

export default function ActivityListItem({ activity }: Props) {
  const [target, setTarget] = useState('')
  const { activityStore } = useStore()
  const { activitiesByDate, deleteActivity, editMode, loading } = activityStore

  function HandleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    e.preventDefault()
    setTarget(e.currentTarget.name)
    deleteActivity(id)
  }

  return (
    <div className="card" key={activity.id}>
      <div className="card-body">
        <h5 className="card-title">{activity.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{activity.date}</h6>
        <p className="card-text">{activity.description}</p>
        <p className="card-text">{activity.venue}</p>
        <p className="card-text">{activity.category}</p>
        <Button as={NavLink as any} to={`/activities/${activity.id}`} className="mx-1 float-end" variant="primary">
          Submit
        </Button>
        <Button name={activity.id} onClick={e => HandleActivityDelete(e, activity.id)} className="mx-1 float-end" variant="danger" href="#">
          {loading && target === activity.id ? <LoadingComponent isButton={true} content="Deleting" /> : <>Delete</>}
        </Button>
      </div>
    </div>
  )
}
