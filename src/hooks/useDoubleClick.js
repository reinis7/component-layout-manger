import React from 'react'

export default function useDoubleClick(callback) {
  /** callback ref Pattern **/
  const [elem, setElem] = React.useState(null)
  const callbackRef = React.useCallback(node => {
    setElem(node)
    callbackRef.current = node
  }, [])
  const countRef = React.useRef(0)
  /** Refs for the timer **/
  const timerRef = React.useRef(null)
  /**Input callback Ref for callback passed **/
  const inputCallbackRef = React.useRef(null)

  React.useEffect(() => {
    inputCallbackRef.current = callback
  })
  return [callbackRef, elem]
}