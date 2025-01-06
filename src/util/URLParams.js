/**
 * Gets all URL parameters.
 *
 * @param {String} url current website url
 * @returns {object} object containing the key and values for each URL parameter
 */
const getURLParams = (url) => {
  const searchParams = new URLSearchParams(url.search)
  const params = {}

  for (const [key, value] of searchParams) {
    params[decodeURIComponent(key)] = decodeURIComponent(value)
  }

  return params
}

module.exports = {
  getURLParams,
}
