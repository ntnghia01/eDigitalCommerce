// import { ADD_CATEGORY } from './categoryActions';
const initialState = {
  categories: [],
  isLoading: false,
  error: null,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CATEGORIES_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'FETCH_CATEGORIES_SUCCESS':
      return {
        ...state,
        isLoading: false,
        categories: action.payload,
      };
    case 'FETCH_CATEGORIES_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };


    default:
      return state;
  }
};

export default categoryReducer;
