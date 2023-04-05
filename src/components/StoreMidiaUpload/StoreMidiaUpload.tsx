import { CompleteSignInData } from "@/pages/auth/complete-signin"
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Text,
} from "@chakra-ui/react"
import { get } from "lodash"
import Script from "next/script"
import { useEffect, useRef, useState } from "react"
import { FieldErrorsImpl, UseFormRegister } from "react-hook-form"
import { useTranslation } from "react-i18next"
import IconActionButton from "../IconActionButton"
import { BiEdit } from "react-icons/bi"

interface StoreMidiaUploadProps {
  onCoverChange?: (url: string) => void
  onLogoChange?: (url: string) => void
  defaultCover?: string
  defaultLogo?: string
  isEditable?: boolean
}

declare global {
  var cloudinary: any
}

const cloudinaryOptions = {
  cloudName: "optimus-media",
  uploadPreset: "lw2kqdxm",
}

const StoreMidiaUpload = ({
  onCoverChange,
  onLogoChange,
  defaultCover,
  defaultLogo,
  isEditable = true,
}: StoreMidiaUploadProps) => {
  const { t } = useTranslation()
  const [cover, setCover] = useState(defaultCover)
  const [logo, setLogo] = useState(defaultLogo)

  const handleCoverUpload = () => {
    window.cloudinary.openUploadWidget(
      cloudinaryOptions,
      (error: any, result: any) => {
        if (error) {
          console.log("> Cloudinary error: ", error)
        }

        const coverUrl = get(result, "info.files[0].uploadInfo.url")

        if (onCoverChange && coverUrl) {
          onCoverChange(coverUrl.replace("http://", "https://"))
        }

        if (coverUrl) {
          setCover(coverUrl)
        }
      }
    )!
  }

  const handleLogoUpload = () => {
    window.cloudinary.openUploadWidget(
      cloudinaryOptions,
      (error: any, result: any) => {
        if (error) {
          console.log("> Cloudinary error: ", error)
        }

        const logoUrl = get(result, "info.files[0].uploadInfo.url")

        if (onLogoChange && logoUrl) {
          onLogoChange(logoUrl)
        }

        if (logoUrl) {
          setLogo(logoUrl)
        }
      }
    )!
  }

  useEffect(() => {
    setLogo(defaultLogo)
    setCover(defaultCover)
  }, [defaultCover, defaultLogo])

  return (
    <Box>
      <Script src="https://upload-widget.cloudinary.com/global/all.js" />
      <Box
        onClick={handleCoverUpload}
        as="button"
        background="gray.100"
        cursor={isEditable ? "pointer" : "initial"}
        overflow="hidden"
        display="flex"
        height={{ base: "200px" }}
        justifyContent="flex-start"
        alignItems="flex-end"
        width="100%"
        type="button"
        disabled={!isEditable}
        p={!cover ? 2 : 0}
        position="relative"
      >
        {!cover && (
          <Text
            position="absolute"
            left="50%"
            top="50%"
            transform="translate(-50%, -50%)"
            fontWeight="500"
            textTransform="uppercase"
            fontSize="sm"
            color="gray.500"
          >
            Capa
          </Text>
        )}
        {(!cover || onCoverChange) && (
          <Box position="absolute" left={4} bottom={4}>
            <IconActionButton icon={<BiEdit />} />
          </Box>
        )}
        {cover && (
          <Image
            src={cover}
            alt="Cover"
            objectFit="cover"
            height={{ base: "200px" }}
            width="100%"
          />
        )}
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box
          onClick={handleLogoUpload}
          as="button"
          type="button"
          background="gray.100"
          cursor={isEditable ? "pointer" : "initial"}
          display="flex"
          justifyContent="start"
          alignItems="end"
          width="130px"
          height="130px"
          borderRadius="25px"
          margin="-65px 0 0 0"
          outline="3px solid white"
          overflow="hidden"
          disabled={!isEditable}
          p={!logo ? 2 : 0}
          position="relative"
        >
          {!logo && (
            <Text
              position="absolute"
              left="50%"
              top="50%"
              transform="translate(-50%, -50%)"
              fontWeight="500"
              textTransform="uppercase"
              fontSize="sm"
              color="gray.500"
            >
              Logo
            </Text>
          )}
          {(!logo || onLogoChange) && (
            <Box position="absolute" left={4} bottom={4}>
              <IconActionButton icon={<BiEdit />} />
            </Box>
          )}
          {logo && (
            <Image
              src={logo}
              alt="Logo"
              width="130px"
              height="130px"
              objectFit="cover"
            />
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default StoreMidiaUpload
