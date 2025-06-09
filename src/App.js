// React Router
import React, { Route, Routes } from 'react-router-dom'

// Components
import Header from './components/header.js'
import MainSite from './containers/main-site/main.js'
import Semester from './containers/pick-semester/semester.js'
import Subjects from './containers/subjects/subjects.js'
import Footer from './components/footer.js'
import SubjectsList from './containers/subject-list/subjects-list'
import Login from './containers/login/login'
import ProtectedRoute from './internal/auth/protectedRoute'

// Styles
import './styleSheet/main/app.css'
import './styleSheet/main/main-site/main-site.css'
import './styleSheet/main/components/header/header.css'
import './styleSheet/main/components/footer/footer.css'
import './styleSheet/main/components/nav-bar/nav-bar.css'
import './styleSheet/main/components/subject-descritpion/subject-description.css'
import './styleSheet/main/components/skill-description/skill-description.css'
import './styleSheet/main/components/subject-list-component/subject-list-component.css'
import './styleSheet/main/components/subject-edit/subject-edit.css'
import './styleSheet/main/components/delete-modal/delete-modal.css'
import './styleSheet/main/pick-semester/pick-semester.css'
import './styleSheet/main/subjects/subjects.css'
import './styleSheet/main/subject-list/subject-list.css'
import { useEffect, useState } from 'react'
import { initializeMsal } from './internal/msal'
import { useAuth } from './internal/auth/authProvider'
import { NotificationsProvider } from '@toolpad/core'

function App () {
  const [msalReady, setMsalReady] = useState(false)
  const { login } = useAuth()

  useEffect(() => {
    const initializeAndHandleRedirect = async () => {
      try {
        const msalInstance = await initializeMsal()
        const response = await msalInstance.handleRedirectPromise()

        if (response) {
          if (response.accessToken) {
            login(response.accessToken)
          }
        }
      } catch (error) {
        console.error('Błąd podczas obsługi przekierowania:', error)
      } finally {
        setMsalReady(true)
      }
    }

    initializeAndHandleRedirect()
  }, [login])

  return (
    <div className="App">
          <Header/>
          <Routes>
              <Route path="/" element={<MainSite/>} />
              <Route path="roadmap-enter" element={<Semester/>} />
              <Route path="roadmap-enter/semester/:semesterId" element={<Subjects/>} />
              <Route path="subject-list" element={<ProtectedRoute><NotificationsProvider><SubjectsList/></NotificationsProvider></ProtectedRoute>} />
              <Route path="login" element={(msalReady) ? <Login /> : <div>Loading...</div>} />
          </Routes>
          <Footer/>
    </div>
  )
}

export default App
