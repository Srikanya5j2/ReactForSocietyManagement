// ticketsReducer.js

const initialState = {
    tickets: [],
  };
  
  const ticketsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_TICKETS':
        return {
          ...state,
          tickets: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default ticketsReducer;
  