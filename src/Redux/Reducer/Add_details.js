const totalPost = {
    username: null,
    _id: null
  };
const redux_data = (state = totalPost, action) => {
  
    switch (action.type) {
      case "Add_details":
        state._id=action.payload.id;
        state.username=action.payload.name;
        return state;
      default:
        return state;
    }
  };
export default redux_data;