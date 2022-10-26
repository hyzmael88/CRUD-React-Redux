import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//useDispatch nos sirve para mandar ejecturar las acciones
//useSelector es una forma en la que vamos a acceder al state dentro del componente

//actions de Redux
import { crearNuevoProductoAction } from "../actions/productoActions";

function NuevoProducto() {

    //state del componente
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState(0)

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
          </div>
        </div>
      </div>
    </div>
  );
}

export default NuevoProducto;
