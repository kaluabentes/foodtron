import ReactMarkdown from "react-markdown"

import ContentLayout from "@/layouts/ContentLayout"
import readContent from "@/lib/providers/content/readContent"
import LandpageLayout from "@/layouts/LandpageLayout"

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
  <LandpageLayout>
    <ContentLayout>
      <ReactMarkdown>{data}</ReactMarkdown>
    </ContentLayout>
  </LandpageLayout>
)

export default PrivacyPolicy
