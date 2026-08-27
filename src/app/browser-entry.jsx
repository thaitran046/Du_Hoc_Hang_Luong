import React from 'react'
import ReactDOM from 'react-dom/client'
import '../styles/global.css'
import HomePage from '../routes/index.jsx'
import ThankYouPage from '../routes/cam-on.jsx'

const pathname = window.location.pathname.replace(/\/+$/, '') || '/'
const App = pathname === '/cam-on' ? ThankYouPage : HomePage

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
