import Category from "@/modules/admin/categories/types/Category"
import {
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { BiMinus, BiSearch, BiX } from "react-icons/bi"

let timeoutRef: NodeJS.Timeout

interface FilterBarProps {
  search: string
  categories?: Category[]
  category: string
  onSearchChange: (search: string) => void
  onCategoryChange: (category: string) => void
}

const FilterBar = ({
  search,
  categories = [],
  category,
  onSearchChange,
  onCategoryChange,
}: FilterBarProps) => {
  const containerRef = useRef<null | HTMLDivElement>(null)
  const scrollTopRef = useRef(0)

  const [isSearchShow, setIsSearchShow] = useState(false)
  const [isFixed, setIsFixed] = useState(false)

  const getElements = () => {
    return {
      mainWrapper: document.getElementById("mainWrapper"),
      nextWrapper: document.getElementById("__next"),
    }
  }

  const clearSearch = () => {
    setIsSearchShow(false)
    onSearchChange("")
  }

  const handleSetIsShow = (scrollTop: number) => {
    const maxOffset = scrollTopRef.current

    if (scrollTop > maxOffset) {
      setIsFixed(true)
    } else {
      setIsFixed(false)
    }
  }

  useEffect(() => {
    if (containerRef.current) {
      scrollTopRef.current = containerRef.current?.offsetTop!
    }
  }, [containerRef])

  useEffect(() => {
    const { nextWrapper, mainWrapper } = getElements()

    const nextWrapperHandler = () => {
      handleSetIsShow(nextWrapper?.scrollTop!)
    }

    const mainHandler = () => {
      handleSetIsShow(mainWrapper?.scrollTop!)
    }

    nextWrapper?.addEventListener("scroll", nextWrapperHandler)
    mainWrapper?.addEventListener("scroll", mainHandler)

    return () => {
      nextWrapper?.removeEventListener("scroll", nextWrapperHandler)
      mainWrapper?.removeEventListener("scroll", mainHandler)
    }
  }, [search, category])

  return (
    <>
      <Flex
        position={isFixed ? "fixed" : "static"}
        ref={containerRef}
        background="white"
        p={{ base: 4, md: 6 }}
        borderRadius="md"
        shadow={isFixed ? "md" : "sm"}
        gap={2}
        mt={!isFixed ? 2 : 0}
        top="0"
        left={{ base: "0", lg: "initial" }}
        alignSelf="stretch"
        flex={1}
        width={{ base: "100%", lg: isFixed ? "calc(100% - 532px)" : "100%" }}
        zIndex="100"
        mb={{ base: 2, lg: 6 }}
      >
        <IconButton
          onClick={
            isSearchShow ? clearSearch : () => setIsSearchShow((prev) => !prev)
          }
          aria-label="Abrir campo de busca"
          icon={isSearchShow ? <BiX size="22px" /> : <BiSearch size="18px" />}
        />
        {isSearchShow ? (
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="O que você procura?"
          />
        ) : (
          <InputGroup>
            <InputLeftAddon>
              <Text fontWeight="500">Categoria</Text>
            </InputLeftAddon>
            <Select
              borderTopLeftRadius={0}
              borderBottomLeftRadius={0}
              width="100%"
              value={category}
              onChange={(event) => onCategoryChange(event.target.value)}
              placeholder="Todos"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </Select>
          </InputGroup>
        )}
      </Flex>
      {isFixed && <Box height="72px" />}
    </>
  )
}

export default FilterBar
