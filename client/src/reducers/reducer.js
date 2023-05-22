export const actionType = {
   SET_USER: "SET_USER",
};

const reducer = (state, action) => {
   console.log(action);
   switch (action.type) {
      case actionType.SET_USER:
         return {
            ...state, // preserve the previous state
            user: action.user, // but update the user with the incoming new information
         };

      default:
         return state;
   }
};

export default reducer;
