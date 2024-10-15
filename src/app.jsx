import './app.css'
import AppRouter from './router/router'
import { AuthProvider } from './AuthContext/AuthContext'

export function App() {

  return (
    <>
    <AuthProvider>
      <AppRouter/>
    </AuthProvider>
    </>
  )
}
