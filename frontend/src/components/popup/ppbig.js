import CollapseButton from "../button/clfullscreenbutton";

export default function PopUpBig({ onClick, onInnerClick }) {
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
            top: '10%',
            left: '14%',
            width: '70%',
            height: '80%',
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
                    top: '89%',
                    left: '94%',
                }}>
                <CollapseButton
                    onClick={(e) => {
                    e.stopPropagation(); // ferma la propagazione al bottone esterno
                    if (onInnerClick) onInnerClick();
                }}/>
            </div>
        </div>
      </div>
    );
  }