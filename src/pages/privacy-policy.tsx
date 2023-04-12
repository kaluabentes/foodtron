import ReactMarkdown from "react-markdown"

import ContentLayout from "@/layouts/ContentLayout"
import readContent from "@/lib/providers/content/readContent"

export const getStaticProps = async () => {
  return {
    props: {
      data: await readContent("/content/privacy-policy.md"),
    },
  }
}

interface PrivacyPolicyProps {
  data: string
}

const PrivacyPolicy = ({ data }: PrivacyPolicyProps) => (
  <ContentLayout>
    <ReactMarkdown>{data}</ReactMarkdown>
  </ContentLayout>
)

export default PrivacyPolicy
