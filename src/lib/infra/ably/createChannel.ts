import Ably from "ably"

const NEXT_PUBLIC_ABLY_SUBSCRIBE_KEY =
  process.env.NEXT_PUBLIC_ABLY_SUBSCRIBE_KEY!
const ABLY_KEY = process.env.ABLY_KEY!

const createChannel = async (channelName: string, env?: string) => {
  const ably = new Ably.Realtime.Promise(
    env === "server" ? ABLY_KEY : NEXT_PUBLIC_ABLY_SUBSCRIBE_KEY
  )
  await ably.connection.once("connected")

  const channel = ably.channels.get(channelName)

  return channel
}

export default createChannel
