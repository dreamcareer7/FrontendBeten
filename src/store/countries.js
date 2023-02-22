async function fetchCountries() {
  const response = await this.$axios.get('/countries')
  return response.data
}

export default {
  fetchCountries
}
