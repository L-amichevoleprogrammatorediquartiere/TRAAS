import { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Indicees() {
    const [dati, setDati] = useState([]);
    const [categoriaAperta, setCategoriaAperta] = useState(null); // solo una aperta

    useEffect(() => {
        // Dati inseriti "hardcoded" direttamente dentro useEffect
        const datiMock = [
            { nome: 'Estensione ginocchio da seduto', categoria: 'Arto inferiore' },
            { nome: 'Sollevamento gamba tesa', categoria: 'Arto inferiore' },
            { nome: 'Abduzione dell’anca in decubito laterale', categoria: 'Arto inferiore' },
            { nome: 'Flessione plantare in piedi', categoria: 'Arto inferiore' },
    
            { nome: 'Sollevamento del braccio con bastone', categoria: 'Arto superiore' },
            { nome: 'Rotazione esterna della spalla', categoria: 'Arto superiore' },
            { nome: 'Estensione del gomito con pesetti', categoria: 'Arto superiore' },
            { nome: 'Mobilizzazione del polso con palla', categoria: 'Arto superiore' },
    
            { nome: 'Rotazioni del tronco da seduto', categoria: 'Busto' },
            { nome: 'Flessioni laterali del busto in piedi', categoria: 'Busto' },
            { nome: 'Estensione lombare a pancia in giù', categoria: 'Busto' },
    
            { nome: 'Rotazioni del collo', categoria: 'Collo' },
            { nome: 'Flessioni laterali del collo', categoria: 'Collo' },
            { nome: 'Chin tucks (ritrazione cervicale)', categoria: 'Collo' },
    
            { nome: 'Camminata su linea retta', categoria: 'Equilibrio' },
            { nome: 'Stazione su un piede', categoria: 'Equilibrio' },
            { nome: 'Passaggi da seduto a in piedi senza mani', categoria: 'Equilibrio' },
    
            { nome: 'Respirazione diaframmatica', categoria: 'Respirazione' },
            { nome: 'Espirazione con labbra socchiuse', categoria: 'Respirazione' },
            { nome: 'Espansione toracica controllata', categoria: 'Respirazione' },
        ];
  
      // Simula una chiamata asincrona (opzionale)
      // per mantenere il pattern "promise"
        Promise.resolve(datiMock).then(data => {
            setDati(data); 
        });
    }, []);

    const perCategoria = dati.reduce((acc, el) => {
        if (!acc[el.categoria]) acc[el.categoria] = [];
        acc[el.categoria].push(el.nome);
        return acc;
    }, {});

    const toggleCategoria = (categoria) => {
        console.log(categoria)
        setCategoriaAperta(prev =>
            prev === categoria ? null : categoria
        );
    };

    return (
        <div
            style={{
                position: 'absolute',
                top: '22%',
                left: '5%',
                width: '28%',
                height: '68%',
                backgroundColor: 'var(--bg-div-color)',
                border: '1px solid #212529',
                fontFamily: 'var(--carattere-text)',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: '1.5%',
                    left: '10%',
                    fontSize: '20px',
                }}
            >
                Indice
            </div>

            <div
                style={{
                    position: 'absolute',
                    top: '10%',
                    left: '1%',
                    width: '98%',
                    height: '89%',
                    overflowY: 'auto',
                    padding: '10px',
                }}
            >
                {Object.entries(perCategoria).map(([categoria, esercizi]) => (
                    <div key={categoria} style={{ marginBottom: '10px' }}>
                        <div
                            style={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                color: '#000',
                            }}
                            onClick={() => toggleCategoria(categoria)}
                        >
                            <i
                                className={`bi ${
                                    categoriaAperta === categoria
                                        ? 'bi-caret-down-fill'
                                        : 'bi-caret-right-fill'
                                }`}
                                style={{ marginRight: '8px' }}
                            ></i>
                            {categoria}
                        </div>

                        {categoriaAperta === categoria && (
                            <ul style={{ paddingLeft: '30px', listStyleType: 'none' }}>
                                {esercizi.map((nome, i) => (
                                    <li key={i} style={{ marginTop: '4px' }}>
                                        <button
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                textAlign: 'left',
                                                padding: 0,
                                                marginLeft: '10px',
                                                fontSize: '14px',
                                            }}
                                            onClick={() => alert(`Hai cliccato: ${nome}`)}
                                        >
                                            - {nome}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
