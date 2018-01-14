import axios from 'axios'

export const login = async (email, password) => await axios.post('http://localhost:8001/api/user/signin')