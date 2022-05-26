import { observer } from 'mobx-react-lite'
import { useStore } from '../../app/stores/store'

export default observer(function ServerError() {
  const { commonStore } = useStore()

  const { error } = commonStore

  return (
    <>
      <h1>Server Error</h1>
      <h5>{error?.message}</h5>
      <h6>{error?.details}</h6>
    </>
  )
})
