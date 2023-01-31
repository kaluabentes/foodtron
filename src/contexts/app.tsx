import Location from "@/modules/admin/locations/types/Location"
import { merge } from "lodash"
import { useRouter } from "next/router"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

interface AppState {
  address?: {
    street?: string
    number?: string
    location?: Location
  }
}

const DEFAULT_VALUE_STATE = {
  address: {
    street: "",
    number: "",
    location: {
      id: "",
      neighborhood: "",
      tax: "",
      estimatedTime: "",
    },
  },
}

const DEFAULT_ACTION_STATE = {
  setState: (state: AppState) => {},
}

export const AppValueContext = createContext(DEFAULT_VALUE_STATE)
export const AppActionContext = createContext(DEFAULT_ACTION_STATE)

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState(DEFAULT_VALUE_STATE)
  const router = useRouter()
  const { domain } = router.query

  const mutateState = (newState: AppState) => {
    localStorage.setItem(
      `${domain}.gocomet.app`,
      JSON.stringify(merge(state, newState))
    )
    setState((oldState) => merge(oldState, newState))
  }

  useEffect(() => {
    const localState = localStorage.getItem(`${domain}.gocomet.app`)
    console.log(localState)
    if (localState) {
      setState(JSON.parse(localState))
    }
  }, [])

  return (
    <AppValueContext.Provider value={state}>
      <AppActionContext.Provider value={{ setState: mutateState }}>
        {children}
      </AppActionContext.Provider>
    </AppValueContext.Provider>
  )
}

export const useAppContext = () => {
  const { setState } = useContext(AppActionContext)
  const state = useContext(AppValueContext)

  if (!setState || !state) {
    throw new Error("Wrap AppContextProvider in the root component")
  }

  return { setState, state }
}
