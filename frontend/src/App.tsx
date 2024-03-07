import './App.css'
import { useAuthContext } from './AuthProvider'

function App() {
  const { accessToken, logout } = useAuthContext();

  return (
    <div className="App">
      <h1>You are logged in!</h1>

      <h2>Logged in with bearer token:</h2>
      <p>{accessToken}</p>

      <button onClick={logout}>Log out</button>
    </div>
  )
}

export default App
