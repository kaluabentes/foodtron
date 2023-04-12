import ReactMarkdown from "react-markdown"

import ContentLayout from "@/layouts/ContentLayout"
import readContent from "@/lib/providers/content/readContent"

export const getStaticProps = async () => {
  return {
    props: {
      data: await readContent("/content/terms-of-use.md"),
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
