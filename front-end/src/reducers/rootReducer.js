// src/reducers/userReducer.js

const initialState = {
    user: null,
    isLoading: false,
    error: null,
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LIST_CATEGORIES_SUCCESS':
        return {
          ...state,
          user: action.payload,
        };
      case 'SET_LOADING':
        return {
          ...state,
          isLoading: action.payload,
        };
      case 'LIST_CATEGORIES_FAILED':
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  