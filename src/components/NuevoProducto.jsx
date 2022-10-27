import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//useDispatch nos sirve para mandar ejecturar las acciones
//useSelector es una forma en la que vamos a acceder al state dentro del componente

//actions de Redux
import { crearNuevoProductoAction } from "../actions/productoActions";

function NuevoProducto() {

  const navigate = useNavigate();

    //state del componente
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState(0)

    //acceder al state del store
    //para ver que hay dentro del state
    //const cargando = useSelector((state) => state)
    const cargando = useSelector((state) => state.productos.loading)
    const error = useSelector((state) => state.productos.error)
    console.log(cargando)

  //utilizar use dispatch y te cre una funcion
  const dispatch = useDispatch();

  //mandar llamar el action de productoAction
  const agregarProducto = (producto) => dispatch(crearNuevoProductoAction(producto));
  //cuando el usuario haga submit
  const submitNuevoProducto = (e) => {
    e.preventDefault();
    //validar formulario
    if(nombre.trim ==="" || precio <= 0){
        //trim elimina los espacios en blanco
        return;
    }

    //si no hay errores

    //crear el nuevo producto
    agregarProducto({
        nombre,precio
    });
    //redireccionar
    navigate('/');
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Producto
            </h2>
            <form onSubmit={submitNuevoProducto}>
              <div className="form-group">
                <label>Nombre producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  name="nombre"
                  value={nombre}
                  onChange={e=>setNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Precio Producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio Producto"
                  name="precio"
                  value={precio}
                  onChange={e=>setPrecio(Number(e.target.value))}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>
            {cargando? <p>Cargando..</p> :null}
            {error? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p>:null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NuevoProducto;
