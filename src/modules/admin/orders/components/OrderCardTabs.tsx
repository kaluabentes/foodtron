import PageHeader from "@/components/PageHeader"
import {
  Badge,
  Box,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react"
import { ReactNode } from "react"
import { BiFile } from "react-icons/bi"
import Order from "../types/Order"

interface OrderCardTabsProps {
  pendingOrders: Order[]
  doingOrders: Order[]
  deliveryOrders: Order[]
  panels: ReactNode
  onArchiveClick: () => void
}

const OrderCardTabs = ({
  pendingOrders,
  doingOrders,
  deliveryOrders,
  panels,
  onArchiveClick,
}: OrderCardTabsProps) => (
  <Box
    background="white"
    borderRadius="md"
    shadow="md"
    height={{ base: "calc(100vh - 60)", lg: "100vh" }}
    maxWidth={{ base: undefined, lg: "400px" }}
    width="100%"
    overflowY="auto"
  >
    <Box
      p={4}
      pt={0}
      pb={0}
      borderBottom="1px solid transparent"
      borderColor="gray.200"
    >
      <PageHeader
        title="Pedidos"
        actions={
          <Button onClick={onArchiveClick} size="sm" leftIcon={<BiFile />}>
            Arquivo
          </Button>
        }
      />
    </Box>
    <Tabs colorScheme="brand">
      <TabList borderBottomWidth="1px">
        <Tab flex={1} fontWeight="500" fontSize="sm">
          Aguardando{" "}
          {pendingOrders.length ? (
            <Badge
              colorScheme="brand"
              variant="solid"
              borderRadius="md"
              ml={2}
              fontWeight="500"
            >
              {pendingOrders.length}
            </Badge>
          ) : null}
        </Tab>
        <Tab flex={1} fontWeight="500" fontSize="sm">
          Fazendo{" "}
          {doingOrders.length ? (
            <Badge
              colorScheme="brand"
              variant="solid"
              borderRadius="md"
              ml={2}
              fontWeight="500"
            >
              {doingOrders.length}
            </Badge>
          ) : null}
        </Tab>
        <Tab flex={1} fontWeight="500" fontSize="sm">
          Entrega{" "}
          {deliveryOrders.length ? (
            <Badge
              colorScheme="brand"
              variant="solid"
              borderRadius="md"
              ml={2}
              fontWeight="500"
            >
              {deliveryOrders.length}
            </Badge>
          ) : null}
        </Tab>
      </TabList>

      {panels}
    </Tabs>
  </Box>
)

export default OrderCardTabs
