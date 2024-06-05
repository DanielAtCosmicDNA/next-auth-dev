/**
 *
 * @param {string | Request | URL} resource - A string or any other object with a stringifier — including a URL object — that provides the URL of the resource you want to fetch
 * @param {*} data - The JSON data object to be sent in the POST request.
 * @returns {Promise<Response>}
 */
const post = async (resource, data) => {
  const res = await fetch(resource, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return res
}

export default post
