import { observer } from 'mobx-react-lite'
import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { Activity } from '../../../app/models/activity'
import { useStore } from '../../../app/stores/store'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'

export default observer(function ActivityDashboard() {
  const { activityStore } = useStore()

  const { selectedActivity, editMode } = activityStore

  return (
    <div className="row">
      <div className="col-md-9">
        <ActivityList />
      </div>
      <div className="col-md-3">
        {selectedActivity && !editMode && <ActivityDetails />}
        {editMode && <ActivityForm />}
      </div>
    </div>
  )
})
