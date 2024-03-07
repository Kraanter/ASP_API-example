import React, { useEffect, useState } from 'react'
import { useAuthContext } from './AuthProvider'

type Props = {
  children: React.ReactElement
}

const AuthWrapper = ({ children }: Props) => {
  const { isLoggedIn, login } = useAuthContext();
  const [error, setError] = useState("");

  useEffect(() => {
    if (error)
      setTimeout(() => setError(""), 2000)
  }, [error])

  async function loginClick() {
    try { await login() } catch (err) { setError("Make sure the credentials are registered on the server") }
  }

  if (!isLoggedIn)
    return (<>
      <h1>Not logged in!</h1>
      <button onClick={loginClick}>Click to login!</button>
      <p className='error'>{error}</p>
    </>)

  return (
    <>
      {children}
    </>
  )
}

export default AuthWrapper
