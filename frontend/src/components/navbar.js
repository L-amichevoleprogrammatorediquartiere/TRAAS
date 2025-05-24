import MedicoCard from "./medico_card";

const medici = [
  {
    nome: "Leonardo Beccardo",
    descrizione: "Specialista in medicina interna",
    imgSrc: "foto-leonardo.jpg",
    href: "#"
  },
  {
    nome: "Antonio Banderas",
    descrizione: "Cardiologo senior",
    imgSrc: "foto-antonio.jpg",
    href: "#"
  },
  {
    nome: "Giuseppe Cruciani",
    descrizione: "Neurologo",
    imgSrc: "foto-giuseppe.jpg",
    href: "#"
  }
];

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item custom-margin">
              <a className="nav-link active" aria-current="page" href="#">
                Le mie sedute
              </a>
            </li>
            <li className="nav-item custom-margin">
              <a className="nav-link" href="#">
                Libreria Esercizi
              </a>
            </li>
            <li className="nav-item custom-margin">
              <a className="nav-link" href="#">
                <strong>TRAAS</strong>
              </a>
            </li>
            <li className="nav-item dropdown custom-margin">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                I Tuoi Medici
              </a>

              <div
                className="dropdown-menu p-3"
                style={{
                  maxHeight: "400px",
                  overflowY: "auto",
                  width: "max-content",
                }}
              >
                {medici.map((medico, index) => (
                  <MedicoCard
                    key={index}
                    nome={medico.nome}
                    descrizione={medico.descrizione}
                    imgSrc={medico.imgSrc}
                    href={medico.href}
                  />
                ))}
              </div>
            </li>
            <li className="nav-item custom-margin">
              <a className="nav-link" href="#">
                Profilo
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
