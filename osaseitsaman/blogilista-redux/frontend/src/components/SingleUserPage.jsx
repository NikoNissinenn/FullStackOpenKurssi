import { useParams } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react'
import { getUsers } from '../reducers/userReducer'

const SingleUser = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.data)
  const id = useParams().id
  const user = users.find((u) => u.id === String(id))

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  if (!user) {
    return null
  }

  return (
    <div>
      <h2 className='my-4'>{user.username}</h2>
      <h5 className='mb-3'>Added blogs</h5>
      {user.blogs.length > 0 ? (
        <ul>
        {user.blogs.map((b) => {
          return (
            <li key={b.id}>
              {b.title}
            </li>
          )
        })}
      </ul>
      ):(
        <div>No blogs added</div>
      )}
      
    </div>
  )
}

export default SingleUser