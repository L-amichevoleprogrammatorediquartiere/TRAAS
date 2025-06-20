import {useState} from 'react';

import PopUpBig from "./ppbig";
import ChatSmall from "../chat/chatsmall";
import InfoUser from "./infouser";

import CreateSeduta from "../sedute/createseduta";

export default function InfoChat({setPopOn, codiceFiscaleSelezionato}){
    const [isAssegna, setIsAssegna] = useState(false);

    return(
    <>
        <PopUpBig onClick={()=> setPopOn(false)} onInnerClick={()=> setPopOn(false)}/>
        <InfoUser codiceFiscale={codiceFiscaleSelezionato} setIsAssegna={setIsAssegna}/>
        {isAssegna ? 
            <>
                {/*Data e tipo di seduta: sincrono o asincrono*/}
                <PopUpBig onClick={()=>setIsAssegna(false)} onInnerClick={()=>setIsAssegna(false)}/>
                <CreateSeduta codiceFiscale={codiceFiscaleSelezionato} setIsAssegna={setIsAssegna}/> 
            </> : <ChatSmall codiceFiscale={codiceFiscaleSelezionato}/>}
    </>
    );
}