import { useState, useEffect, useMemo } from "react"
import { createComment, getComments } from "../reducers/commentReducer"
import { notificationChange } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'


const CommentsForm = ({ blog }) => {
  const [content, setContent] = useState('')  

  const dispatch = useDispatch()

  const allComments = useSelector(state => state.comments.data)

  const comments = useMemo(
    () => allComments.filter(c => c.blog.id === blog.id || c.blog === blog.id),
    [allComments, blog.id]
  )

  useEffect(() => {
    dispatch(getComments(blog.id))
  }, [dispatch, blog.id])

  const handleNewComment = async () => {
    let createdComment = {
      content: content,
      blog: blog.id
    }
    try {
      if (createdComment.content === '') {
        dispatch(notificationChange({
          message:
            'Comment cannot be empty string',
          notificationtype: 'error',
        }))
        return
      }
      dispatch(createComment({id: createdComment.blog, comment: createdComment }))
      setContent('')
      dispatch(
        notificationChange({
          message: `New comment added`,
          notificationtype: 'success',
        })
      )
    } catch (error) {
      dispatch(
        notificationChange({
          message:
            `Something went wrong when creating new comment: ${error, error.message}`,
          notificationtype: 'error',
        })
      )
    }
  }

  return (
    <div>
      <h4 className='my-4'>Comments:</h4>
      <div className="my-4">
        <input
          id="contentfield"
          type="text"
          value={content}
          onChange={({ target }) => setContent(target.value)}
          className='col'
        />
        <button className="ms-3 btn btn-primary" onClick={() => handleNewComment()}>Add comment</button>
        <button className="ms-3 btn btn-primary" onClick={() => setContent('')}>Reset</button>
      </div>
      <ul className="list-group">
        {comments.length > 0 ? (
          (comments.map((comment) => {
            return (
              <li key={comment.id} className='list-group-item my-1 ps-2'>
                {comment.content}
              </li>)
          })
        )) : (
          <li>No comments have been added</li>
        )
      }
      </ul>
    </div>
  )
}

export default CommentsForm