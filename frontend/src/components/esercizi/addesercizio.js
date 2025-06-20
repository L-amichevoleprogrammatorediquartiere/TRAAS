import {useState} from 'react';
import PopUpBig from "../popup/ppbig";
import CheckButton from "../button/checkbutton";
import { createEsercizio, getEserciziPerCategoria } from "../../backend";
import CreateEsercizio from "./createesercizio";

export default function AddEsercizio({setIsAdd, categoria,setEsercizi}){
    const [formData, setFormData] = useState({
        nome: '',
        video: '',
        descrizione: ''
    });
    const [createEs, setCreateEs] = useState(false);
    const [criterio, setCriterio] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    
    return (
    <>
        <PopUpBig onClick={()=> {
            setIsAdd(false);
            setFormData(()=>({
                nome:'',
                video: '',
                descrizione: ''
            }));
            }} onInnerClick={()=> {
            setIsAdd(false);
            setFormData(()=>({
                nome:'',
                video: '',
                descrizione: ''
            }));
        }}/>
        <div style={{position:'absolute', top: '12%', left: '15%', width: '68%', height: '70%'}}>
        <div style={{position:'absolute', top: '3%', left: '25%', fontSize:'120%'}}>Inserimento nuovo esercizio categoria: <b>{categoria}</b></div>
        <input
            name="nome"
            type="text"
            placeholder="Nome esercizio"
            value={formData.nome}
            onChange={handleChange}
            style={{ position: 'absolute', top: '15%', left: '12%', width: '30%', padding: '5px' }}
        />
        <input
            name="video"
            type="text"
            placeholder="Video"
            value={formData.video}
            onChange={handleChange}
            style={{ position: 'absolute', top: '31%', left: '12%', width: '50%', padding: '5px' }}
        />
        <input
            name="descrizione"
            type="text"
            placeholder="Descrizione"
            value={formData.descrizione}
            onChange={handleChange}
            style={{ position: 'absolute', top: '47%', left: '12%', width: '50%', height: '30%', padding: '5px' }}
        />
        <button style={{position: "absolute",
            top: "85%",
            left: "12%",
            padding: "0.5rem 1rem",
            fontSize: "95%",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",}}
            onClick={()=>setCreateEs(true)}>
            Crea esercizio
            </button>

        {(formData.nome!=='' && formData.video!=='' && formData.descrizione!=='')&&
            <div style={{ position: 'absolute', top: '99%', left: '88%'}}>
            <CheckButton onClick={async()=>{
                try {
                await createEsercizio(formData.nome, categoria, formData.video, formData.descrizione);
                const nuoviEsercizi = await getEserciziPerCategoria(categoria);
                setEsercizi(nuoviEsercizi);
                setFormData({
                    nome: '',
                    video: '',
                    descrizione: ''
                });
                setIsAdd(false);
                } catch (error) {
                console.error("Errore nella creazione dell'esercizio:", error);
                // opzionalmente: mostrare un messaggio all'utente
                }
            }}/>
            </div>
        }
        {createEs && 
        <>
            <PopUpBig onClick={()=>{setCreateEs(false); setCriterio('')}}
                        onInnerClick={()=>{setCreateEs(false); setCriterio('')}}/>
            <CreateEsercizio setCriterio={setCriterio}/>
        </>}
        </div>
    </>);
}