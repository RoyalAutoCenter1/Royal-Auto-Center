import { Link } from 'react-router-dom';
import { login } from '../auth/authService';

export default function Home() {
  return (
    <div className="bg-white text-dark text-start">
      <section className="py-5 bg-white border-bottom border-light position-relative overflow-hidden">
        <div className="container position-relative py-5" style={{ zIndex: 1 }}>
          <div className="row align-items-center g-5">
            
            <div className="col-12 col-lg-7">
              <h1 className="display-4 fw-extrabold text-black mb-3 tracking-tight">
                La verdad no espera. <br />
                <span className="text-secondary fw-bold">Infórmate con rigor periodístico.</span>
              </h1>
              <p className="lead text-dark mb-4 opacity-75">
                No consumas solo titulares. Únete a la plataforma digital de la UTEQ que profundiza en los hechos reales que impactan a Querétaro y al mundo, con actualizaciones asíncronas de última generación directo en tus pantallas.
              </p>
              
              <div className="d-flex flex-wrap gap-3">
                <a href="#secciones" className="btn btn-outline-dark btn-lg px-4 fw-semibold">
                  Explorar Canales
                </a>
                <button onClick={login} className="btn btn-dark btn-lg px-4 fw-semibold">
                    Iniciar Sesión
                </button>
              </div>
            </div>

            <div className="col-12 col-lg-5 text-center">
              <img 
                src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80" 
                alt="Periodismo Digital Moderno" 
                className="img-fluid rounded-4 shadow border border-light"
                style={{ maxHeight: '340px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="secciones" className="py-5 bg-light border-bottom border-light">
        <div className="container py-4">
          <div className="text-center max-w-2xl mx-auto mb-5">
            <h2 className="fw-bold text-black mb-2">Periodismo que conecta con tus intereses</h2>
            <p className="text-secondary small fw-medium">Accede a nuestras páginas internas especializadas a través de un diseño fácil de navegar.</p>
          </div>

          <div className="row g-4">
            
            <div className="col-12 col-md-4">
              <div className="card bg-black border-dark h-100 shadow-lg overflow-hidden d-flex flex-column rounded-3">
                <img 
                  src="https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=600&q=80" 
                  className="card-img-top" 
                  alt="Sección Política"
                  style={{ height: '180px', objectFit: 'cover', filter: 'brightness(85%)' }}
                />
                <div className="card-body p-4 d-flex flex-column flex-grow-1 text-white">
                  <div className="d-flex align-items-center gap-2 mb-2 text-danger">
                    <i className="bi bi-bank2"></i>
                    <span className="small fw-bold text-uppercase tracking-wider" style={{ fontSize: '11px' }}>Nacional</span>
                  </div>
                  <h4 className="card-title fw-bold text-white mb-2">Política</h4>
                  <p className="card-text text-white-50 small flex-grow-1">
                    Reformas, debates legislativos y el seguimiento a las decisiones que marcan el rumbo político de nuestra sociedad.
                  </p>
                  <Link to="/politica" className="btn btn-outline-light btn-sm w-100 mt-3 fw-semibold">
                    Acceder a Política <i className="bi bi-chevron-right small ms-1"></i>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card bg-black border-dark h-100 shadow-lg overflow-hidden d-flex flex-column rounded-3">
                <img 
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80" 
                  className="card-img-top" 
                  alt="Sección Tecnología"
                  style={{ height: '180px', objectFit: 'cover', filter: 'brightness(85%)' }}
                />
                <div className="card-body p-4 d-flex flex-column flex-grow-1 text-white">
                  <div className="d-flex align-items-center gap-2 mb-2 text-info">
                    <i className="bi bi-cpu-fill"></i>
                    <span className="small fw-bold text-uppercase tracking-wider" style={{ fontSize: '11px' }}>Innovación</span>
                  </div>
                  <h4 className="card-title fw-bold text-white mb-2">Tecnología</h4>
                  <p className="card-text text-white-50 small flex-grow-1">
                    El avance de la inteligencia artificial, ecosistema de software y proyectos tecnológicos desarrollados en la UTEQ.
                  </p>
                  <Link to="/tecnologia" className="btn btn-outline-light btn-sm w-100 mt-3 fw-semibold">
                    Acceder a Tecnología <i className="bi bi-chevron-right small ms-1"></i>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card bg-black border-dark h-100 shadow-lg overflow-hidden d-flex flex-column rounded-3">
                <img 
                  src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80" 
                  className="card-img-top" 
                  alt="Sección Economía"
                  style={{ height: '180px', objectFit: 'cover', filter: 'brightness(85%)' }}
                />
                <div className="card-body p-4 d-flex flex-column flex-grow-1 text-white">
                  <div className="d-flex align-items-center gap-2 mb-2 text-success">
                    <i className="bi bi-graph-up-arrow"></i>
                    <span className="small fw-bold text-uppercase tracking-wider" style={{ fontSize: '11px' }}>Finanzas</span>
                  </div>
                  <h4 className="card-title fw-bold text-white mb-2">Economía</h4>
                  <p className="card-text text-white-50 small flex-grow-1">
                    Análisis macroeconómico, mercados locales comerciales y notas sobre finanzas explicadas para la comunidad estudiantil.
                  </p>
                  <Link to="/economia" className="btn btn-outline-light btn-sm w-100 mt-3 fw-semibold">
                    Acceder a Economía <i className="bi bi-chevron-right small ms-1"></i>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}