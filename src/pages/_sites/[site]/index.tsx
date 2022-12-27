import { GetStaticProps } from "next"
import React from "react"

import prisma from "@/lib/prisma"

interface IndexProps {
  site: string
}

export const getStaticPaths = async () => {
  const stores = await prisma.store.findMany()

  return {
    paths: stores.map((store) => ({
      params: {
        site: store.subdomain,
      },
    })),
    fallback: true,
  }
}

export const getStaticProps = async ({ params }: any) => {
  return {
    props: {
      site: params.site,
    },
  }
}

const Index = ({ site }: IndexProps) => <h1>Sites index {site}</h1>

export default Index
