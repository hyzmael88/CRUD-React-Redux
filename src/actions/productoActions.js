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
import clienteAxios from '../config/axios'
import Swal from 'sweetalert2'

//crear nuevos productos
export function crearNuevoProductoAction(producto){
    return async (dispatch)=>{
        dispatch(agregarProducto());

        try {
            //insertar en la API
            await clienteAxios.post('/productos', producto);

            //Si todo sale bien, actualizar el state
            dispatch(agregarProductoExito(producto))
            Swal.fire(
                'Correcto',
                "El producto se agrego correctamente",
                'success'
            )
        } catch (error) {
            console.log(error)
            //si hay un error cambiar el state
            dispatch(agregarProductoError(true))
            Swal.fire({
                icon:'error',
                tittle: 'Hubo un error',
                text: "hubo un error, intente de nuevo"

            })
        }
    }
}
//payload es lo que va a modificar el state
const agregarProducto = () =>({
    type: AGREGAR_PRODUCTO,
    payload:true
})

//si el producto se guarda en la base de datos
const agregarProductoExito = producto =>({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})
//si hubo un error
const agregarProductoError =(estado) =>({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})

//Funcion que descarga los productos de la base de datos
export function obtenerProductosAction(){
    return async(dispatch)=>{
        dispatch(descargarProductos());
        try {
            const respuesta = await clienteAxios.get('/productos')
            dispatch(descargaProductosExitosa(respuesta.data))
        } catch (error) {
            console.log(error)
            dispatch(descargaProductosError())
        }
    }
}

const descargarProductos=() =>({
    type:COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargaProductosExitosa = productos =>({
    type:DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})
const descargaProductosError = () =>({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})

//Selecciona y elimina el producto
export function borrarProductoAction(id){
    return async(dispatch)=>{
        dispatch(obtenerProductoEliminar(id));
        try {
             await clienteAxios.delete(`/productos/${id}`)
            dispatch(eliminarProductoExito())
            //si se elimina, mostrar alerta
            Swal.fire("Deleted", "Rour gile has been deleted", "success");
        } catch (error) {
            console.log(error)
            dispatch(eliminarProductoError())
        }
    }
}

const obtenerProductoEliminar=id=>({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload:id
})

const eliminarProductoExito=()=>({
    type: PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoError=()=>({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
})