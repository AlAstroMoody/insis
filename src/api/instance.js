import axios from 'axios'

import { ApiKey } from '~/env.js'

const token = ApiKey
const instance = axios.create({
  baseURL: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Token ' + token,
  },
})

export default instance
