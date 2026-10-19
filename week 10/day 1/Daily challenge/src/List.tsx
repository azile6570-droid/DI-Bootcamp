import type { Key, ReactNode } from 'react'

type ListProps<T> = {
  items: T[]
  renderItem: (item: T, index: number) => ReactNode
  keyExtractor: (item: T) => Key
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul className="book-list">
      {items.map((item, index) => (
        <li className="book-list-item" key={keyExtractor(item)}>
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  )
}

export default List
