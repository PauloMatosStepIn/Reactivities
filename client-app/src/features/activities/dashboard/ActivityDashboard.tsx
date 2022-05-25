import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { useStore } from '../../../app/stores/store'
import ActivityFilters from './ActivityFilters'
import ActivityList from './ActivityList'

export default observer(function ActivityDashboard() {
  const { activityStore } = useStore()

  const { loadActivities, loadingInitial, activityRegistry } = activityStore

  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities()
  }, [activityStore])

  if (loadingInitial) return <LoadingComponent content="Loading App" />

  return (
    <div className="row">
      <div className="col-md-9">
        <ActivityList />
      </div>
      <div className="col-md-3">
        <ActivityFilters />
      </div>
    </div>
  )
})
