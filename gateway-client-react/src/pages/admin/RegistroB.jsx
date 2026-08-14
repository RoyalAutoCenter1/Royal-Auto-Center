import { useState, useEffect } from 'react';
import { postEntityB, getAllEntityB } from '../../services/apiService';

const RegistroB = () => {
  const [nombre, setNombre] = useState('');
  const [lista, setLista] = useState([]);

  const cargarDatos = async () => {
    try {
      const data = await getAllEntityB();
      setLista(data);
    } catch (error) {
      console.error("Error al cargar:", error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación: Comprueba que no esté vacío o tenga solo espacios
    if (nombre.trim() === '') {
      alert('El nombre no puede estar vacío.');
      return; // Detiene la ejecución aquí
    }

    try {
      await postEntityB({ nombreB: nombre.trim() }); // Enviamos el texto sin espacios extra a los lados
      setNombre('');
      cargarDatos();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-white mb-4">
        <h3 className="mb-3">Registrar nueva Entity B</h3>
        <div className="input-group">
          <input 
            className="form-control" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            placeholder="Escribe el nombre de la entidad..."
            required // Validación nativa del navegador
          />
          <button className="btn btn-primary" type="submit">Guardar</button>
        </div>
      </form>

      <table className="table table-striped table-hover border">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {lista.length === 0 ? (
             <tr><td colSpan="2" className="text-center text-muted">No hay registros aún.</td></tr>
          ) : (
            lista.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nombreB}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
export default RegistroB;