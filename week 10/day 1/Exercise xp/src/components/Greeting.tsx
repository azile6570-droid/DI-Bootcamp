interface GreetingProps {
  name: string
  messageCount: number
}

function Greeting({ name, messageCount }: GreetingProps) {
  return (
    <div className="greeting">
      <span className="greeting-emoji" aria-hidden="true">✳</span>
      <div>
        <p className="greeting-title">Hey, {name}!</p>
        <p className="greeting-subtitle">You have {messageCount} new messages</p>
      </div>
      <span className="message-badge">{messageCount}</span>
    </div>
  )
}

export default Greeting
