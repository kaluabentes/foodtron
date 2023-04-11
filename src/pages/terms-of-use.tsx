import ContentLayout from "@/layouts/ContentLayout/ContentLayout"
import readContent from "@/lib/providers/content/readContent"
import ReactMarkdown from "react-markdown"

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
