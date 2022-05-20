import { observer } from 'mobx-react-lite'
import React, { SyntheticEvent, useState } from 'react'
import { Button } from 'react-bootstrap'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { useStore } from '../../../app/stores/store'

export default observer(function ActivityList() {
  const [target, setTarget] = useState('')
  const { activityStore } = useStore()
  const { selectActivity, activitiesByDate, deleteActivity, editMode, loading, openDetail } = activityStore

  function HandleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    e.preventDefault()
    setTarget(e.currentTarget.name)
    deleteActivity(id)
  }

  function HandleActivityDetail(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    //e.preventDefault()
    setTarget(e.currentTarget.name)
    openDetail(id)
  }

  return (
    <>
      {activitiesByDate.map(activity => (
        <div className="card" key={activity.id}>
          <div className="card-body">
            <h5 className="card-title">{activity.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{activity.date}</h6>
            <p className="card-text">{activity.description}</p>
            <p className="card-text">{activity.venue}</p>
            <p className="card-text">{activity.category}</p>
            <Button onClick={e => HandleActivityDetail(e, activity.id)} className="mx-1 float-end" variant="primary" href="#">
              View
            </Button>
            <Button name={activity.id} onClick={e => HandleActivityDelete(e, activity.id)} className="mx-1 float-end" variant="danger" href="#">
              {loading && target === activity.id ? <LoadingComponent isButton={true} content="Deleting" /> : <>Delete</>}
            </Button>
          </div>
        </div>
      ))}
    </>
  )
})
