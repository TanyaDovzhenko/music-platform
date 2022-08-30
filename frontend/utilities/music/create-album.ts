import axios from "axios"
import { parseCookies } from "nookies"
import { BASE_SERVER_URL } from "../constants"

export const createAlbum = async (data: any) => {
    const access_token = parseCookies().access_token
    let created;

    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('image', data.image)

    await axios.post(`${BASE_SERVER_URL}album`, formData, {
        headers: { authorization: `Bearer ${access_token}` }
    })
        .then(() => created = true)
        .catch(e => created = false)

    return created
}