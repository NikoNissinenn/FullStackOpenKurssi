import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  
  if (notification !== null) {
    return (
    <div className="notification">
      {notification}
    </div>
    )
  } else {
    return <></>
  }
  
}

export default Notification