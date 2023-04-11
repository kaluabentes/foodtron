import axios from "axios"

const PROJECT_ID = process.env.PROJECT_ID_VERCEL!
const VERCEL_BEARER_TOKEN = process.env.VERCEL_BEARER_TOKEN!
const APEX_DOMAIN = process.env.NEXT_PUBLIC_APEX_DOMAIN!

const addVercelSubdomain = async (subdomain: string) => {
  const domainName = `${subdomain}.${APEX_DOMAIN}`
  const domainApiUrl = `https://api.vercel.com/projects/${PROJECT_ID}/domains`
  await axios.post(
    domainApiUrl,
    {
      name: domainName,
    },
    {
      headers: {
        Authorization: `Bearer ${VERCEL_BEARER_TOKEN}`,
      },
    }
  )
}

export default addVercelSubdomain
