import axios, { AxiosResponse } from "axios"

const APPLICATION_KEY = process.env.SINCH_APPLICATION_KEY!
const APPLICATION_SECRET = process.env.SINCH_APPLICATION_SECRET!
const SINCH_URL =
  "https://verification.api.sinch.com/verification/v1/verifications"

const basicAuthentication = APPLICATION_KEY + ":" + APPLICATION_SECRET

const sendVerification = async (phone: string): Promise<any> => {
  const payload = {
    identity: {
      type: "number",
      endpoint: "+55" + phone,
    },
    method: "sms",
  }

  const headers = {
    Authorization:
      "Basic " + Buffer.from(basicAuthentication).toString("base64"),
    "Content-Type": "application/json; charset=utf-8",
  }

  return axios
    .post(SINCH_URL, payload, { headers })
    .then((response: any) => response.data)
    .catch((error: any) => console.error("There was an error!", error))
}

export default sendVerification
