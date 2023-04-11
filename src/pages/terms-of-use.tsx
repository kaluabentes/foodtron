import ContentLayout from "@/layouts/ContentLayout/ContentLayout"
import fs from "fs/promises"
import path from "path"
import ReactMarkdown from "react-markdown"

export const getStaticProps = async () => {
  const contentPath = path.join(process.cwd(), "/content/terms-of-use.md")
  const data = await fs.readFile(contentPath, { encoding: "utf8" })

  return {
    props: {
      data,
    },
  }
}

interface TermsOfUseProps {
  data: string
}

const TermsOfUse = ({ data }: TermsOfUseProps) => (
  <ContentLayout>
    <ReactMarkdown>{data}</ReactMarkdown>
  </ContentLayout>
)

export default TermsOfUse
