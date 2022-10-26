import{
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
} from '../types'


//cada reducer tiene su propio strate
const initialState = {
    productos: [],
    error: false,
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type){
        case AGREGAR_PRODUCTO:
                return{
                    ...state,
                    loading: action.payload
                }
        case AGREGAR_PRODUCTO_EXITO:
            return{
                ...state,
                loading: false,
                productos: [...state.productos, action.payload]
            }
        default:
            return state;
    }
}