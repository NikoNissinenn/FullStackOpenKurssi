import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { StrictMode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './contextfiles/NotificationContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NotificationContextProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </NotificationContextProvider>
  </StrictMode>
)
