const BlogCreationForm = ( props ) => {
  return (
    <div>
      <h2>Create new blog</h2>

      <form onSubmit={props.handleNewBlog}>
        <div>
          <label>
            Title:
            <input
              id='titlefield'
              type="text"
              value={props.title}
              onChange={({ target }) => props.setTitle(target.value)}
            />
          </label>
        </div>

        <div>
          <label>            
            Author:
            <input
              id='authorfield'
              type="text"
              value={props.author}
              onChange={({ target }) => props.setAuthor(target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Url:
            <input
              id='urlfield'
              type="text"
              value={props.url}
              onChange={({ target }) => props.setUrl(target.value)}
            />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogCreationForm