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
import Store from "@/modules/stores/types/Store"
import Order from "@/modules/orders/types/Order"
import Address from "@/modules/addresses/types/Address"
import AddressParam from "@/modules/addresses/types/AddressParam"

interface AppState {
  store: Store
  user: {
    id: string
    name: string
    phone: string
    email: string
    token: string
    orders: Order[]
    addresses: Address[]
  }
  address: Address
  order: {
    products: OrderProduct[]
    paymentMethod: {
      name: string
      change: string
    }
  }
  isReady: boolean
}

interface AppStateParam {
  store?: Store
  user?: {
    id?: string
    name?: string
    phone?: string
    email?: string
    token?: string
    orders?: Order[]
    addresses?: AddressParam[]
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

export const DEFAULT_USER = {
  id: "",
  name: "",
  phone: "",
  email: "",
  token: "",
  orders: [],
  addresses: [],
}

export const DEFAULT_ADDRESS = {
  id: "",
  name: "",
  street: "",
  number: "",
  location: {
    id: "",
    neighborhood: "",
    tax: "",
    estimatedTime: "",
  },
}

export const DEFAULT_ORDER = {
  products: [],
  paymentMethod: {
    name: "",
    change: "",
  },
}

const DEFAULT_VALUE_STATE = {
  store: {},
  user: DEFAULT_USER,
  address: DEFAULT_ADDRESS,
  order: DEFAULT_ORDER,
  isReady: false,
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
    setState((oldState) => {
      const newStateMerged = merge(oldState, newState)

      localStorage.setItem(
        `${domain}.gocomet.app`,
        JSON.stringify(newStateMerged)
      )

      return newStateMerged
    })
  }

  const resetState = (newState: AppStateParam) => {
    localStorage.setItem(`${domain}.gocomet.app`, JSON.stringify(newState))
    setState(newState as AppState)
  }

  useEffect(() => {
    const localState = localStorage.getItem(`${domain}.gocomet.app`)

    if (localState) {
      setState({
        ...JSON.parse(localState),
        isReady: true,
      })
    } else {
      setState((prevState) => ({
        ...prevState,
        isReady: true,
      }))
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
