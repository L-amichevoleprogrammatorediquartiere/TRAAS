import DeleteButton from '../button/deletebutton'
import CloseButton from '../button/closebutton'
import CheckButton from '../button/checkbutton'

export default function PopUpSmall({ onClick, onInnerClick }) {
    return (
      <div className="position-fixed top-0 start-0 w-100 h-100">
        {/* Bottone trasparente a tutta schermata */}
        <button
          onClick={onClick}
          className="position-absolute top-0 start-0 w-100 h-100 border-0 p-0"
          style={{ backgroundColor: 'var(--bg-traslucid)' }}
        ></button>
  
        {/* Div grigio centrato e un po' più piccolo */}
        <div
          className="position-absolute rounded"
          style={{
            top: '15%',
            left: '14%',
            width: '70%',
            height: '60%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pointerEvents: 'auto',
            backgroundColor: 'var(--bg-div-color)', 
            border: '1px solid #212529', // bordo scuro, per coerenza
            padding: '20px',
          }}
        >
            <div 
                style = {{
                    position: 'absolute',
                    top: '3%',
                    left: '10%',
                    display: 'flex',
                    pointerEvents: 'auto',
                    fontFamily: 'var(--carattere-txt)',
                    fontSize: '20px', 
                    //border: '1px solid #212529', // bordo scuro, per coerenza
                }} >Note medico</div>

            <div 
                style = {{
                    position: 'absolute',
                    top: '14%',
                    left: '7.5%',
                    width: '85%',
                    height: '65%',
                    display: 'flex',
                    pointerEvents: 'auto', 
                    //border: '1px solid #212529', // bordo scuro, per coerenza
                }}
            >
                <textarea style={{width: '100%', height: '100%', resize: 'none'}}></textarea>
            </div>


            <div
                style = {{
                    position: 'absolute',
                    top: '86%',
                    left: '81%',
                }}>
                <DeleteButton
                    onClick={(e) => {
                    e.stopPropagation(); // ferma la propagazione al bottone esterno
                    if (onInnerClick) onInnerClick();
                }}/>
            </div>
            <div
                style = {{
                    position: 'absolute',
                    top: '86%',
                    left: '87.5%',
                }}>
                <CloseButton
                    onClick={(e) => {
                    e.stopPropagation(); // ferma la propagazione al bottone esterno
                    if (onInnerClick) onInnerClick();
                }}/>
            </div>
            <div
                style = {{
                    position: 'absolute',
                    top: '86%',
                    left: '94%',
                }}>
                <CheckButton
                    onClick={(e) => {
                    e.stopPropagation(); // ferma la propagazione al bottone esterno
                    if (onInnerClick) onInnerClick();
                }}/>
            </div>
        </div>
      </div>
    );
  }