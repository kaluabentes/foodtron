import axios from "axios"

const SINCH_PLAN_ID = process.env.SINCH_PLAN_ID!
const SINCH_NUMBER = process.env.SINCH_NUMBER!
const SINCH_API_TOKEN = process.env.SINCH_API_TOKEN!

const sendSMS = (phone: string, message: string) =>
  axios.post(
    `https://us.sms.api.sinch.com/xms/v1/${SINCH_PLAN_ID}/batches`,
    {
      from: SINCH_NUMBER,
      to: [`55${phone}`],
      body: message,
    },
    {
      headers: {
        Authorization: "Bearer " + SINCH_API_TOKEN,
      },
    }
  )

export default sendSMS
