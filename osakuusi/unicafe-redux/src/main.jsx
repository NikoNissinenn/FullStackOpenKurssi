import React from 'react'
import ReactDOM from 'react-dom/client'

import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer'

const store = configureStore({ reducer })

const App = () => {
  
  const counterDispatch = (action) => {
    store.dispatch({
      type: action
    })
  }

  return (
    <div>
      <button className='reducer-btn' onClick={() => counterDispatch('GOOD')}>Good</button> 
      <button className='reducer-btn' onClick={() => counterDispatch('OK')}>Ok</button> 
      <button className='reducer-btn' onClick={() => counterDispatch('BAD')}>Bad</button>
      <button className='reducer-btn' onClick={() => counterDispatch('ZERO')}>Reset stats</button>
      <div className='stat-line'>Good {store.getState().good}</div>
      <div className='stat-line'>Ok {store.getState().ok}</div>
      <div className='stat-line'>Bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
