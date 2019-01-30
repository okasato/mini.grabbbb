const defaultState = {
  geolocationRequest: false,
  geolocationSuccess: false,
  geolocationError: false,
  location: {}
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

    default:
      return state;
  }
}