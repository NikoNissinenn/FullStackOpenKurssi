import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAll, createAnecdote, updateAnecdote } from './services/requests'
import './App.css'
import { useNotificationDispatch } from './components/NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    notificationDispatch({
      type: 'SET',
      payload: `Voted "${anecdote.content}"`
    })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    refetchOnWindowFocus: false,
    retry: 1
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  if ( result.isLoading ) {
    return <div>Loading data...</div>
  }

  if ( result.isError ) {
    return <div>Anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm newAnecdoteMutation={newAnecdoteMutation}/>
    
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id} className='anecdote'>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} votes
            <button className='votebutton' onClick={() => handleVote(anecdote)}>Vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
