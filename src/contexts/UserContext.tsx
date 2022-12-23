import { createContext, useState } from 'react'

interface IUser {
  id: number
  nickname: string
  email: string
  lastName: string
  firstName: string
  lastLogin: string
  description: string
  createdAt: string
}

interface IUserContext {
  user: IUser | null
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>
  isCreatingBlog: boolean
  setIsCreatingBlog: React.Dispatch<React.SetStateAction<boolean>>
}

export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
  isCreatingBlog: false,
  setIsCreatingBlog: () => {},
})

const localUser = JSON.parse(localStorage.getItem('user') || '{}')

export const UserProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<IUser | null>(
    localUser.length ? localUser : null
  )
  const [isCreatingBlog, setIsCreatingBlog] = useState(false)

  return (
    <UserContext.Provider
      value={{ user, setUser, isCreatingBlog, setIsCreatingBlog }}
    >
      {children}
    </UserContext.Provider>
  )
}
