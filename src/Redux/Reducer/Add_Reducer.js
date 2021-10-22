const initialValue = 0;

const add_Reducer = (state = initialValue, action) => {
  switch (action.type) {
    case "Add":
      return state + action.payload;
    default:
      return state;
  }
};

export default add_Reducer;
