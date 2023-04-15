import ReactMarkdown from "react-markdown"

import ContentLayout from "@/layouts/ContentLayout"
import readContent from "@/lib/providers/content/readContent"
import LandpageLayout from "@/layouts/LandpageLayout"

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
  <LandpageLayout>
    <ContentLayout>
      <ReactMarkdown>{data}</ReactMarkdown>
    </ContentLayout>
  </LandpageLayout>
)

export default TermsOfUse
