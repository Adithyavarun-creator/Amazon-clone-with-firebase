import { ADD_TO_BASKET,EMPTY_BASKET ,REMOVE_FROM_BASKET,NO_USER_HERE,USER_LOGGED_IN} from "./actiontype"

export const initialState = {
    basket:[],
    user:null
}

//selector
export const getBasketTotal = (basket) => 
basket.reduce((amount,item)=>item.price + amount,0)

const reducer = (state,action) => {
    //console.log(action);
    if(action.type === ADD_TO_BASKET){
        return{
            ...state,
            basket:[...state.basket,action.item]
        }
    }

    if(action.type === REMOVE_FROM_BASKET){

        const index = state.basket.findIndex((basketItem)=>
        basketItem.id === action.id)
        let newBasket = [...state.basket]
        if(index >= 0){
            newBasket.splice(index,1)
        }else{
            console.warn(`Cannot remove ${action.id}`);
        }
        return{
            ...state,
            basket:newBasket
        }
    }

    if(action.type === USER_LOGGED_IN){
        return{
            ...state,
            user:action.user
        }
    }

    if(action.type === NO_USER_HERE){
        return{
            ...state,
            user:action.user
        }
    }

    if(action.type === EMPTY_BASKET){
        return{
            ...state,
            basket:[]
        }
    }

    return state
}

export default reducer