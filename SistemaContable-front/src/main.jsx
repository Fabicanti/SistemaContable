import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { UserProvider } from './context/UserProvider'
import './styles/index.css'
import { AccountProvider } from './context/AccountProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AccountProvider>
      <UserProvider>
        <Router>
          <App />
        </Router>
      </UserProvider>
    </AccountProvider>
  </StrictMode>,
)
