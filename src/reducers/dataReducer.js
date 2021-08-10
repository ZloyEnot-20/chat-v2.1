import { data } from '../components/data';

export default function dataReducer(state = data, action) {
  switch (action.type) {
    case 'ADD_DATA':
      return [...state, action.payload];
    case 'EDIT_DATA':
      return [
        ...state.map((item, index) =>
          index === action.payload.index
            ? {
                text: action.payload.text,
                user: item.user,
                time: item.time,
                edited: action.payload.edited,
                mine: item.mine,
                replied: item.replied,
                index: item.index,
              }
            : item
        ),
      ];
    case 'DELETE_DATA':
      return [...state.filter((item, index) => index !== action.payload.index)];
    default:
      return state;
  }
}
// ...state.map((item, index) =>
//           index === action.payload.index
//             ? (item.text = action.payload.text)
//             : item
