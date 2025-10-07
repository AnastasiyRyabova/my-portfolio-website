import { useState } from 'react'

export const useCounter = (initialValue: number) => {
  const [count, setCount] = useState(initialValue || 0)

  const increment = () => setCount(x => x + 1)
  const reset = () => setCount(initialValue || 0)

  return {
    count,
    increment,
    reset,
  }
}