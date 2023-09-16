export const productAdd = (productName, plannedCost, actualCost) =>{
    return async (dispatch) => {
      dispatch({ type: "ADD_PRODUCT", payload:{ productName, plannedCost, actualCost } })
    }
}
