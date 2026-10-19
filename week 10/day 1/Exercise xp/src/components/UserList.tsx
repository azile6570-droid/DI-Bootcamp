import { useEffect, useState } from 'react'

interface User {
  id: number
  name: string
  email: string
  username: string
}

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchUsers() {
      try {
        const response = await fetch(USERS_URL, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data: User[] = await response.json()
        setUsers(data)
      } catch (fetchError: unknown) {
        if (controller.signal.aborted) {
          return
        }

        setError(
          fetchError instanceof Error
            ? fetchError.message
            : 'An unexpected error occurred while loading users.',
        )
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void fetchUsers()

    return () => controller.abort()
  }, [])

  if (isLoading) {
    return <p className="users-message"><span className="loading-spinner" /> Loading users…</p>
  }

  if (error) {
    return <p className="users-message users-error" role="alert">{error}</p>
  }

  if (users.length === 0) {
    return <p className="users-message">No users found.</p>
  }

  return (
    <ul className="users-list">
      {users.slice(0, 3).map((user) => (
        <li className="api-user" key={user.id}>
          <span className="api-avatar" aria-hidden="true">{user.name.charAt(0)}</span>
          <span className="api-user-info">
            <span className="api-user-name">{user.name}</span>
            <span className="api-user-email">{user.email}</span>
          </span>
          <span className="api-username">@{user.username}</span>
        </li>
      ))}
      {users.length > 3 && (
        <li className="more-users">+ {users.length - 3} more users fetched</li>
      )}
    </ul>
  )
}

export default UserList
