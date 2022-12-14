import{
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR
} from '../types'

//cada reducer tiene su propio strate
const initialState = {
    productos: [],
    error: false,
    loading: false,
    productoeliminar: null
}

export default function(state = initialState, action) {
    switch(action.type){
        case COMENZAR_DESCARGA_PRODUCTOS:
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
            case DESCARGA_PRODUCTOS_ERROR:
            case AGREGAR_PRODUCTO_ERROR:
            case PRODUCTO_ELIMINADO_ERROR:
                return{
                    ...state,
                    loading:false,
                    error: action.payload

                }
            case DESCARGA_PRODUCTOS_EXITO:
                return{
                    ...state,
                    loading: false,
                    error: null,
                    productos: action.payload

                }

                case OBTENER_PRODUCTO_ELIMINAR:
                    return{
                        ...state,
                        productoeliminar: action.payload
                    }
                    case PRODUCTO_ELIMINADO_EXITO:
                        return{
                            ...state,
                            productos: state.productos.filter(producto => producto.id !== state.productoeliminar),
                            productoeliminar: null
                       //vamos a filtrar los productos
                        // iteramos producto por producto
                        //del producto actual producto.id traeme los que no sean iguales a productoeliminar
                        }
            
                
        default:
            return state;
    }
}