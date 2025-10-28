import { useNotificationValue } from '../contextfiles/NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  if (notification === '') {
    return null
  }

  if (notification.includes('Error:')) {
    return (
      <div style={style} className="error">
        {notification}
      </div>
    )
  }

  return (
    <div style={style} className="success">
      {notification}
    </div>
  )
}

export default Notification
