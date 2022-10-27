import React from "react";
import { Link } from "react-router-dom";

//redux
import { useDispatch } from "react-redux";
import { borrarProductoAction } from "../actions/productoActions";
import Swal from "sweetalert2";

function Producto({ producto }) {
  const { nombre, precio, id } = producto;

  const dispatch = useDispatch();

  //Confirmar si desea eliminarlo
  const confirmarEliminarProducto = (id) => {
    //preguntar al usuario
    Swal.fire({
      title: "Are you sure?",
      text: "you won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "yes, delete it!",
    }).then((result) => {
      if (result.value) {
        //pasarlo al action
        dispatch(borrarProductoAction(id));
        
      }
    });
  };
  return (
    <tr>
      <td>{nombre}</td>
      <td>
        <span className="font-weight-bold">${precio}</span>
      </td>
      <td className="acciones">
        <Link to={`/productos/editar/${id}`} className="btn btn-primary mr-2">
          Editar
        </Link>
        <button
          onClick={() => confirmarEliminarProducto(id)}
          type="button"
          className="btn btn-danger"
        >
          Eliminar
        </button>
      </td>
      <td></td>
    </tr>
  );
}

export default Producto;
