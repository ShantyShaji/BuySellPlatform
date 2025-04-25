import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext';
import { ProfileProvider } from './context/ProfileContext';
import {AdProvider} from './context/AdContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ProfileProvider>
          <AdProvider>
            <App />
          </AdProvider>
      </ProfileProvider>
    </AuthProvider>
  </StrictMode>,
)
