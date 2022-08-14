import axios from "axios"
import { parseCookies } from "nookies"
import { BASE_SERVER_URL } from "../constants"

export const createTrack = async (data: any) => {
    const access_token = parseCookies().access_token
    let created;

    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('userProfileId', String(data.userProfileId))
    formData.append('image', data.image)
    formData.append('audio', data.audio)

    await axios.post(`${BASE_SERVER_URL}track`, formData, {
        headers: {
            authorization: `Bearer ${access_token}`
        }
    })
        .then(() => created = true)
        .catch(e => created = false)

    return created
}