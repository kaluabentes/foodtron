import { merge } from "lodash"
import { useRouter } from "next/router"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

import Location from "@/modules/admin/locations/types/Location"
import OrderProduct from "@/modules/admin/orders/types/OrderProduct"
import Store from "@/modules/admin/stores/types/Store"
import Order from "@/modules/admin/orders/types/Order"
import Address from "@/modules/app/addresses/types/Address"
import AddressParam from "@/modules/app/addresses/types/AddressParam"

interface AdminState {
  onboardingDone: boolean
  isReady: boolean
}

interface AdminStateParam {
  onboardingDone?: boolean
  isReady?: boolean
}

const DEFAULT_VALUE_STATE = {
  onboardingDone: false,
  isReady: false,
}

const DEFAULT_ACTION_STATE = {
  setState: (state: AdminStateParam) => {},
  mutateState: (state: AdminStateParam) => {},
}

export const AdminValueContext = createContext<AdminState>(DEFAULT_VALUE_STATE)
export const AdminActionContext = createContext(DEFAULT_ACTION_STATE)

export const AdminContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const { domain } = router.query

  const [state, setState] = useState<AdminState>(DEFAULT_VALUE_STATE)

  // Debug admin state
  if (process.env.NODE_ENV === "development") {
    console.log("admin state", state)
  }

  const mergeState = (newState: AdminStateParam) => {
    setState((oldState) => {
      const newStateMerged = merge(oldState, newState)

      localStorage.setItem(`admin.foodtron.app`, JSON.stringify(newStateMerged))

      return newStateMerged
    })
  }

  const mutateState = (newState: AdminStateParam) => {
    localStorage.setItem(`admin.foodtron.app`, JSON.stringify(newState))
    setState(newState as AdminState)
  }

  useEffect(() => {
    const localState = localStorage.getItem(`admin.foodtron.app`)

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
    <AdminValueContext.Provider value={state}>
      <AdminActionContext.Provider
        value={{ setState: mergeState, mutateState }}
      >
        {children}
      </AdminActionContext.Provider>
    </AdminValueContext.Provider>
  )
}

export const useAdminContext = (): {
  setState: (state: AdminStateParam) => void
  mutateState: (state: AdminStateParam) => void
  state: AdminState
} => {
  const { setState, mutateState } = useContext(AdminActionContext)
  const state = useContext(AdminValueContext)

  if (!setState || !state) {
    throw new Error("Wrap AdminContextProvider in the root component")
  }

  return { setState, mutateState, state }
}
