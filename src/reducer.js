const defaultState = {
  geolocationRequest: false,
  geolocationSuccess: false,
  geolocationError: false,
  location: {},
  results: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_GEOLOCATION_REQUEST': {
      return {
        ...state,
        geolocationRequest: true,
      };
    }

    case 'GET_GEOLOCATION_SUCCESS': {
      return {
        ...state,
        geolocationSuccess: true,
        location: action.location,
      };
    }

    case 'GET_GEOLOCATION_ERROR': {
      return {
        ...state,
        geolocationError: true,
      };
    }

    case 'GET_NEAR_BY_SEARCH': {
      return {
        ...state,
        results: action.results,
      }
    }

    default:
      return state;
  }
}