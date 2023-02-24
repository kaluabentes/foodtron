import { merge } from "lodash"
import { useRouter } from "next/router"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

import Location from "@/modules/locations/types/Location"
import OrderProduct from "@/modules/orders/types/OrderProduct"

export interface Address {
  street?: string
  number?: string
  location: Location
}

interface AppState {
  user?: {
    name?: string
    phone?: string
  }
  address: Address
  order: {
    products: OrderProduct[]
    paymentMethod: {
      name: string
      change: string
    }
  }
}

interface AppStateParam {
  user?: {
    name?: string
    phone?: string
  }
  address?: {
    street?: string
    number?: string
    location?: Location
  }
  order?: {
    products?: OrderProduct[]
    paymentMethod?: {
      name?: string
      change?: string
    }
  }
}

const DEFAULT_VALUE_STATE = {
  user: {
    name: "",
    phone: "",
  },
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
  order: {
    products: [],
    paymentMethod: {
      name: "",
      change: "",
    },
  },
}

const DEFAULT_ACTION_STATE = {
  setState: (state: AppStateParam) => {},
  resetState: (state: AppStateParam) => {},
}

export const AppValueContext = createContext<AppState>(DEFAULT_VALUE_STATE)
export const AppActionContext = createContext(DEFAULT_ACTION_STATE)

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const { domain } = router.query

  const [state, setState] = useState<AppState>(DEFAULT_VALUE_STATE)

  const mutateState = (newState: AppStateParam) => {
    localStorage.setItem(
      `${domain}.gocomet.app`,
      JSON.stringify(merge(state, newState))
    )
    setState((oldState) => merge(oldState, newState))
  }

  const resetState = (newState: AppStateParam) => {
    localStorage.setItem(`${domain}.gocomet.app`, JSON.stringify(newState))
    setState(newState as AppState)
  }

  useEffect(() => {
    const localState = localStorage.getItem(`${domain}.gocomet.app`)

    if (localState) {
      setState(JSON.parse(localState))
    }
  }, [])

  return (
    <AppValueContext.Provider value={state}>
      <AppActionContext.Provider value={{ setState: mutateState, resetState }}>
        {children}
      </AppActionContext.Provider>
    </AppValueContext.Provider>
  )
}

export const useAppContext = (): {
  setState: (state: AppStateParam) => void
  resetState: (state: AppStateParam) => void
  state: AppState
} => {
  const { setState, resetState } = useContext(AppActionContext)
  const state = useContext(AppValueContext)

  if (!setState || !state) {
    throw new Error("Wrap AppContextProvider in the root component")
  }

  return { setState, resetState, state }
}
