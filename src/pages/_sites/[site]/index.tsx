import { GetStaticProps } from "next"
import React from "react"

interface IndexProps {
  site: string
}

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          site: "kalux",
        },
      },
    ],
    fallback: true,
  }
}

export const getStaticProps = async ({ params }: any) => {
  console.log(params)
  return {
    props: {
      site: params.site,
    },
  }
}

const Index = ({ site }: IndexProps) => <h1>Sites index {site}</h1>

export default Index
