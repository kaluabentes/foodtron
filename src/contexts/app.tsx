import { merge } from "lodash"
import { useRouter } from "next/router"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

import OrderProduct from "@/modules/admin/orders/types/OrderProduct"
import Store from "@/modules/admin/stores/types/Store"
import Order from "@/modules/admin/orders/types/Order"
import Address from "@/modules/app/addresses/types/Address"
import AddressParam from "@/modules/app/addresses/types/AddressParam"

interface LocalAddress extends Address {
  currentLocation: boolean
}

interface LocalAddressParam extends AddressParam {
  currentLocation?: boolean
}

interface AppState {
  store: Store
  user: {
    id: string
    name: string
    phone: string
    email: string
    token: string
    orders: Order[]
    addresses: LocalAddress[]
    selectedAddressId: string
  }
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
    addresses?: LocalAddressParam[]
    selectedAddressId?: string
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
  selectedAddressId: "",
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
  order: DEFAULT_ORDER,
  isReady: false,
}

const DEFAULT_ACTION_STATE = {
  setState: (state: AppStateParam) => {},
  mutateState: (state: AppStateParam) => {},
}

export const AppValueContext = createContext<AppState>(DEFAULT_VALUE_STATE)
export const AppActionContext = createContext(DEFAULT_ACTION_STATE)

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const { domain } = router.query

  const [state, setState] = useState<AppState>(DEFAULT_VALUE_STATE)

  // Debug app state
  if (process.env.NODE_ENV === "development") {
    console.log("app state", state)
  }

  const mergeState = (newState: AppStateParam) => {
    setState((oldState) => {
      const newStateMerged = merge(oldState, newState)

      localStorage.setItem(
        `${domain}.foodtron.app`,
        JSON.stringify(newStateMerged)
      )

      return newStateMerged
    })
  }

  const mutateState = (newState: AppStateParam) => {
    localStorage.setItem(`${domain}.foodtron.app`, JSON.stringify(newState))
    setState(newState as AppState)
  }

  useEffect(() => {
    const localState = localStorage.getItem(`${domain}.foodtron.app`)

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
      <AppActionContext.Provider value={{ setState: mergeState, mutateState }}>
        {children}
      </AppActionContext.Provider>
    </AppValueContext.Provider>
  )
}

export const useAppContext = (): {
  setState: (state: AppStateParam) => void
  mutateState: (state: AppStateParam) => void
  state: AppState
} => {
  const { setState, mutateState } = useContext(AppActionContext)
  const state = useContext(AppValueContext)

  if (!setState || !state) {
    throw new Error("Wrap AppContextProvider in the root component")
  }

  return { setState, mutateState, state }
}
