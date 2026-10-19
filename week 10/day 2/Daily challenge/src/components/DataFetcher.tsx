import type { ReactNode } from 'react'
import type { RequestStatus } from '../types/types'

interface DataFetcherProps<T> {
  items: T[]
  status: RequestStatus
  error: string | null
  renderItem: (item: T) => ReactNode
  keyExtractor: (item: T) => string | number
  emptyMessage: string
  onRetry: () => void
}

function DataFetcher<T>({
  items,
  status,
  error,
  renderItem,
  keyExtractor,
  emptyMessage,
  onRetry,
}: DataFetcherProps<T>) {
  if (status === 'loading') {
    return (
      <div className="feedback-card" role="status">
        <span className="loader" aria-hidden="true" />
        <p>Finding something delicious...</p>
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <div className="feedback-card error-card" role="alert">
        <span className="feedback-icon" aria-hidden="true">!</span>
        <p>{error ?? 'Something went wrong while loading recipes.'}</p>
        <button className="retry-button" type="button" onClick={onRetry}>Try again</button>
      </div>
    )
  }

  if (status === 'idle') {
    return (
      <div className="feedback-card setup-card" role="status">
        <span className="feedback-icon" aria-hidden="true">↗</span>
        <p>{emptyMessage}</p>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="feedback-card" role="status">
        <span className="feedback-icon" aria-hidden="true">✳</span>
        <p>No recipes found. Try another search.</p>
      </div>
    )
  }

  return (
    <ul className="recipe-grid">
      {items.map((item) => (
        <li className="recipe-card" key={keyExtractor(item)}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  )
}

export default DataFetcher
