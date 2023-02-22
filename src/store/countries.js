import axios from 'axios'

async function fetchCountries() {
  const response = await axios.get('/countries')
  return response.data
}

export default {
  fetchCountries
}
