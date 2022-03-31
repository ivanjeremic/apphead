import { createContext, useContext } from 'react'
import { useResizeDetector } from 'react-resize-detector'

const ContextProvider = createContext({})

/**
 *
 * @param {*} param0
 * @returns
 */
export default function Context ({ children }) {
  const { width, height, ref } = useResizeDetector()

  return (
    <ContextProvider.Provider value={{ width, height, ref }}>
      {children}
    </ContextProvider.Provider>
  )
}

export const useAppContext = () => useContext(ContextProvider)
