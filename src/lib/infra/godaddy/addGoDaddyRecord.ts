import axios from "axios"

const APEX_DOMAIN = process.env.NEXT_PUBLIC_APEX_DOMAIN!
const GODADDY_API_KEY = process.env.GODADDY_API_KEY!
const GODADDY_SECRET = process.env.GODADDY_SECRET!

const addGoDaddyRecord = async (subdomain: string) => {
  const goDaddyApiUrl = `https://api.godaddy.com/v1/domains/${APEX_DOMAIN}/records`
  await axios.patch(
    goDaddyApiUrl,
    [
      {
        type: "CNAME",
        name: subdomain,
        data: "cname.vercel-dns.com.",
      },
    ],
    {
      headers: {
        Authorization: `sso-key ${GODADDY_API_KEY}:${GODADDY_SECRET}`,
      },
    }
  )
}

export default addGoDaddyRecord
