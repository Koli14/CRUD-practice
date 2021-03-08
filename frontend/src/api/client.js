// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

export async function client (endpoint, { body, ...customConfig } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  const API_ADMIN_ROOT = 'http://localhost:5000/api/admin'

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers
    }
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  let data
  try {
    const response = await window.fetch(API_ADMIN_ROOT + endpoint, config)
    data = await response.json()
    if (response.ok) {
      return data
    }
    throw new Error(response.statusText)
  } catch (err) {
    return Promise.reject(err.message ? err.message : data)
  }
}

client.get = function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: 'GET' })
}

client.post = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, body })
}

client.put = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, body, method: 'PUT' })
}

client.delete = function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: 'DELETE' })
}
