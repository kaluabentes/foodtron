const axios = require("axios")

const APPLICATION_KEY = process.env.SINCH_APPLICATION_KEY!
const APPLICATION_SECRET = process.env.SINCH_APPLICATION_SECRET!

const verifyCode = async (phone: string, code: string) => {
  const basicAuthentication = APPLICATION_KEY + ":" + APPLICATION_SECRET

  const payload = {
    method: "sms",
    sms: {
      code,
    },
  }

  const headers = {
    Authorization:
      "Basic " + Buffer.from(basicAuthentication).toString("base64"),
    "Content-Type": "application/json; charset=utf-8",
  }

  const SINCH_URL = `https://verification.api.sinch.com/verification/v1/verifications/number/+55${phone}`

  return axios.put(SINCH_URL, payload, { headers })
}

export default verifyCode
