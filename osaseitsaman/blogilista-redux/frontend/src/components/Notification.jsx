import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification.notificationtype === null) {
    return null
  }

  if (notification.notificationtype === 'error') {
    return (
      <div className={notification.notificationtype}>
        {notification.message}
      </div>
    )
  }

  if (notification.notificationtype === 'success') {
    return (
      <div className={notification.notificationtype}>
        {notification.message}
      </div>
    )
  }
}

export default Notification
