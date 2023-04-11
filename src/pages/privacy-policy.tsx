import ContentLayout from "@/layouts/ContentLayout/ContentLayout"
import readContent from "@/lib/providers/content/readContent"
import ReactMarkdown from "react-markdown"

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
