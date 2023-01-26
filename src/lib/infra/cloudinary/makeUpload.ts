const makeUpload = () => {
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

export default makeUpload
