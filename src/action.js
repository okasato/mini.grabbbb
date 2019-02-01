export const getGeolocationRequest = () => {
  return {
    type: 'GET_GEOLOCATION_REQUEST',
  }
}

export const getGeolocationSuccess = (location) => {
  return {
    type: 'GET_GEOLOCATION_SUCCESS',
    location,
  }
}

export const getGeolocationError = () => {
  return {
    type: 'GET_GEOLOCATION_ERROR',
  }
}

export const getNearBySearch = (results) => {
  console.log(results)
  return {
    type: 'GET_NEAR_BY_SEARCH',
    results
  }
}


