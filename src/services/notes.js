import axios from 'axios'

const baseUrl = '/api/notes'

// region fetch
// const getAllFetch = () =>
//   fetch(baseUrl)
//     .then(res => res.json())
//     .catch(err => console.log(err))

// const createFetch = data =>
//   fetch(baseUrl, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   })
//     .then(res => res.json())
//     .catch(err => console.log(err))
// const updateFetch = (id, data) =>
//   fetch(`${baseUrl}/${id}`, {
//     method: 'PUT',
//     body: JSON.stringify(data),
//     headers: { 'Content-Type': 'application/json' },
//   })
//     .then(res => res.json())
//     .catch(err => console.log(err))

// const removeFetch = id =>
//   fetch(`${baseUrl}/${id}`)
//     .then(res => res.json())
//     .catch(err => console.log(err))

// region axios
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () =>
  axios
    .get(baseUrl)
    .then(res => res.data)
    .catch(err => err)

const create = async data => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.post(baseUrl, data, config)

  return res.data
}

const update = (id, newObject) =>
  axios.put(`${baseUrl}/${id}`, newObject).then(res => res.data)

const remove = id =>
  axios
    .delete(`${baseUrl}/${id}`)
    .then(res => res.data)
    .catch(err => err)

const getByUserIdNotes = async id => {
  const notes = await axios.get(`${baseUrl}/${id}`)
  return notes
}

export default {
  getAll,
  create,
  update,
  remove,
  setToken,
  getByUserIdNotes,
  baseUrl,
}
