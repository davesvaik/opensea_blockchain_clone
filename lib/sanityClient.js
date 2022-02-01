import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: '5cko0nrf',
  dataset: 'production',
  apiVersion: '2021-03-25',
  token:
    'skMtrN3Ry2WQuvSxe2eYCX93ykVK8q7lyrJgMTcJSF2oM7pOOYh6Ftqo74yhr9O7i3FWMgfj8nARIvjN35C1fpRRhVFwhlA5anQMm5IiHBUdNTJG4wkYtlEk6AX5VR3RCwlvXdhw5MVNZOAu4BSPgEObDw4SnXIB3RdD8LQA8HyYzbKh6son',
  useCdn: false,
})
