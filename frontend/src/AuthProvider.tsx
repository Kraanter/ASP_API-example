import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { sendLoginRequest } from './api/authentication';

interface IAuthContext {
  accessToken: string;
  isLoggedIn: boolean;
  login: () => Promise<void>;
  logout: () => void;
}

const initalAuthContext: IAuthContext = {
  accessToken: "",
  isLoggedIn: false,
  login: async () => { },
  logout: () => { },
}

const AuthContext = createContext<IAuthContext>(initalAuthContext);

const TOKENKEY = "token"

const AuthProvider = ({ children }: { children: React.ReactElement }) => {
  const [accessToken, setAccessToken] = useState(sessionStorage.getItem("token") ?? "")
  const isLoggedIn = useMemo(() => !!accessToken, [accessToken])

  useEffect(() => {
    if (accessToken)
      sessionStorage.setItem(TOKENKEY, accessToken)
    else
      sessionStorage.removeItem(TOKENKEY)
  }, [accessToken])

  async function login() {
    const [resp, err] = await sendLoginRequest({
      email: "admin@admin.com",
      password: "@dm1nKaas"
    })

    if (err)
      throw new Error(err.title);

    setAccessToken(resp?.accessToken ?? "");
  }

  function logout() {
    setAccessToken("");
  }

  return (
    <AuthContext.Provider value={{ login, logout, accessToken, isLoggedIn }}>
      {children}
    </AuthContext.Provider >
  )
}

export function useAuthContext() {
  return useContext(AuthContext);
}

export default AuthProvider
