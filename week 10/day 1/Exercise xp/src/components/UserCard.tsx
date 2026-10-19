interface UserCardProps {
  name?: string
  age?: number
  role?: string
}

function UserCard({
  name = 'New user',
  age = 0,
  role = 'Role not specified',
}: UserCardProps) {
  return (
    <div className="user-card">
      <div className="user-avatar" aria-hidden="true">{name.charAt(0).toUpperCase()}</div>
      <div className="user-details">
        <p className="user-name">{name}</p>
        <p className="user-meta">{age > 0 ? `${age} years old` : 'Age not specified'} <span>·</span> {role}</p>
      </div>
      <span className="user-menu" aria-hidden="true">···</span>
    </div>
  )
}

export default UserCard
