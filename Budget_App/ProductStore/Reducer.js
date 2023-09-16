let instance = [""];
let number = 0
export default function Reducer(state = instance, action) {
  if (action.type === 'ADD_PRODUCT') {
    return [
      ...state,
      {
        id: ++number,
        productName: action.payload.productName,
        plannedCost: action.payload.plannedCost,
        originalCost: action.payload.actualCost
      },
    ];
  }

  return state;
}
