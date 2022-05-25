import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { useStore } from '../../../app/stores/store'

export default observer(function ActivityDetails() {
  const { activityStore } = useStore()
  const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore
  let { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (activity === undefined && id) {
      loadActivity(id)
    }
  }, [id, loadActivity])

  if (loadingInitial || !activity) return <LoadingComponent />

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
            <Button as={Link as any} to={`/manage/${activity.id}`} variant="primary" href="#">
              Edit
            </Button>
            <Button as={Link as any} to="/activities" variant="secondary" href="#">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  )
})
