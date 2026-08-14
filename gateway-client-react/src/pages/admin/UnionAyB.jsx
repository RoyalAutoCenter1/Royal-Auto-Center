import { useState, useEffect } from 'react';
import { getAllEntityA, getAllEntityB, linkEntityAToB } from '../../services/apiService';

const UnionAyB = () => {
  const [listaA, setListaA] = useState([]);
  const [listaB, setListaB] = useState([]);
  
  const [selectedB, setSelectedB] = useState('');
  const [selectedA, setSelectedA] = useState('');

  const cargarDatos = async () => {
    try {
      const [dataA, dataB] = await Promise.all([
        getAllEntityA(),
        getAllEntityB()
      ]);
      setListaA(dataA);
      setListaB(dataB);
    } catch (error) {
      console.error("Error al cargar las listas:", error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedB || !selectedA) {
      alert('Por favor selecciona una Entidad B y una Entidad A.');
      return;
    }

    try {
      await linkEntityAToB(selectedB, selectedA);
      setSelectedB('');
      setSelectedA('');
      cargarDatos(); 
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  // ------------------------------------------------------------------
  // LÓGICA DE AGRUPACIÓN: 
  // Transforma la respuesta plana del backend en un formato útil
  // para no duplicar opciones en el Select ni tarjetas en la vista.
  // ------------------------------------------------------------------
  const bAgrupados = Object.values(listaB.reduce((acc, item) => {
    // Si aún no tenemos esta Entity B en el acumulador, la creamos
    if (!acc[item.id]) {
      acc[item.id] = {
        id: item.id,
        nombreB: item.nombreB,
        conexionesA: [] // Aquí guardaremos los nombres de las Entity A
      };
    }
    // Si la fila del JSON trae un 'nombreA', lo agregamos a su lista
    if (item.nombreA) {
      acc[item.id].conexionesA.push(item.nombreA);
    }
    return acc;
  }, {}));

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-white mb-5">
        <h3 className="mb-4">Vincular Entidades (Unión A y B)</h3>
        
        <div className="row g-3">
          <div className="col-md-5">
            <label className="form-label fw-bold">1. Selecciona la Entity B (Destino)</label>
            <select 
              className="form-select" 
              value={selectedB} 
              onChange={(e) => setSelectedB(e.target.value)}
              required
            >
              <option value="" disabled>-- Elige una Entity B --</option>
              {/* Usamos el arreglo agrupado para no repetir opciones */}
              {bAgrupados.map((item) => (
                <option key={item.id} value={item.id}>
                  ID: {item.id} - {item.nombreB}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-5">
            <label className="form-label fw-bold">2. Selecciona la Entity A (A agregar)</label>
            <select 
              className="form-select" 
              value={selectedA} 
              onChange={(e) => setSelectedA(e.target.value)}
              required
            >
              <option value="" disabled>-- Elige una Entity A --</option>
              {listaA.map((item) => (
                <option key={item.id} value={item.id}>
                  ID: {item.id} - {item.nombreA || 'Sin nombre'}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-2 d-flex align-items-end">
            <button className="btn btn-primary w-100" type="submit">
              Vincular
            </button>
          </div>
        </div>
      </form>

      {/* --- SECCIÓN DE CONEXIONES ACTUALIZADA --- */}
      <h3 className="mb-4 border-bottom pb-2">Conexiones Actuales</h3>
      <div className="row g-4">
        {bAgrupados.length === 0 ? (
          <div className="col-12"><p className="text-muted">No hay entidades B registradas.</p></div>
        ) : (
          bAgrupados.map((b) => (
            <div className="col-12 col-md-6 col-lg-4" key={b.id}>
              <div className="card shadow-sm h-100 border-secondary">
                <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                  <span className="fw-bold">{b.nombreB}</span>
                  <span className="badge bg-secondary">ID: {b.id}</span>
                </div>
                <ul className="list-group list-group-flush">
                  {/* Evaluamos si tiene conexiones guardadas en el agrupador */}
                  {b.conexionesA.length > 0 ? (
                    b.conexionesA.map((nombreA, idx) => (
                      <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>
                          <i className="bi bi-link-45deg me-2 text-primary"></i>
                          Conectado a:
                        </span>
                        <span className="badge bg-primary rounded-pill">
                          {nombreA}
                        </span>
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item text-muted fst-italic text-center py-3">
                      Sin conexiones aún
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
      
    </div>
  );
};

export default UnionAyB;