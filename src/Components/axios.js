import axios from "axios"

const instance=axios.create({
    baseURL:"https://insta-server-mern.herokuapp.com"
})

export default instance