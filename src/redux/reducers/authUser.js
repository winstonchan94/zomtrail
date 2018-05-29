const initialState = {
    user: {},
    isAuth: false,
    profile: {}
};
export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        //bottom would go here
        profile: action.currentUser.email,
      };
    case 'FOLLOW_USER':
    let user = Object.assign({}, state.user);
    user.following.push(action.user_id);
    return {
      profile: state.profile,
      isAuth: state.isAuth,
      user
    };
    case 'SET_PROFILE':
      return {
        profile: action.profile,
        isAuth: state.isAuth,
        user
      };
    default:
      return state;
  }
};
// profile: state.profile,
// isAuth: Object.keys(action.user).length > 0 ? true : false,
// user: action.user
