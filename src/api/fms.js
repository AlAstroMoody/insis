import instance from './instance'

export const getUnitsFromAPI = async (query) => {
  let response = await instance.post(`fms_unit/`, {
    query: query,
    count: 20,
  })

  return response.data.suggestions
}
