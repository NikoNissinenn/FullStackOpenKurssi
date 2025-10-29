import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getUsers } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.data)
  

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  return (
    <div>
      <h3>Users</h3>
      <table className='w-25 border-top-0 table-bordered my-2'>
        <thead>
          <tr className='border-top-0 border-start-0'>
            <th className='border-top-0 border-start-0'></th>
            <th className='border-1 p-1 ps-3'>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>                
                <td className='p-1'>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </td>                               
                <td className='p-1 ps-3'>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Users