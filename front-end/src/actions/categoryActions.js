import axios from 'axios';

export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'FETCH_CATEGORIES_REQUEST' });

      const response = await axios.get('http://localhost:3001/api/categories');

      dispatch({
        type: 'FETCH_CATEGORIES_SUCCESS',
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_CATEGORIES_FAILURE',
        payload: error.message,
      });
    }
  };
};
