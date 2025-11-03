const CommentsForm = ({ blog }) => {

  return (
    <div>
      <h4 className='my-4'>Comments:</h4>
      <ul>
        {blog.comments.length > 0 ? (
          (blog.comments.map((comment) => {
            return (
              <li key={comment._id} className='my-1 ps-2'>
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

