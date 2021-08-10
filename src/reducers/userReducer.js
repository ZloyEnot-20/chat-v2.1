import {usersData} from '../components/data'

export default function userReducer(state = usersData, action) {
  switch (action.type) {
    case 'ADD_USER':
      return [...state.users, action.payload];
    case 'ADD_ME':
        return {me: action.payload, all: [...state.all, action.payload] }
    default:
      return state;
  }
}
