import { observer } from 'mobx-react-lite'
import { Fragment, useState } from 'react'
import { useStore } from '../../../app/stores/store'
import ActivityListItem from './ActivityListItem'

export default observer(function ActivityList() {
  const [target, setTarget] = useState('')
  const { activityStore } = useStore()
  const { GroupedActivities } = activityStore

  return (
    <>
      {GroupedActivities.map(([group, activities]) => (
        <Fragment key={group}>
          <h6 className="mt-3">{group}</h6>
          {activities.map(activity => (
            <ActivityListItem key={activity.id} activity={activity} />
          ))}
        </Fragment>
      ))}
    </>
  )
})
