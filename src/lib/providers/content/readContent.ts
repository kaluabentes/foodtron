import fs from "fs/promises"
import path from "path"

const readContent = (filePath: string) => {
  const contentPath = path.join(process.cwd(), filePath)
  return fs.readFile(contentPath, { encoding: "utf8" })
}

export default readContent
