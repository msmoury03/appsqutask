
export const productsInitialState = [];

const basicReducer = (state=productsInitialState,action)=>{
switch (action.type) {
    case 'SET_BASIC':
        return action.payload
        break;

    default:
       return  state;
}
}

export default basicReducer