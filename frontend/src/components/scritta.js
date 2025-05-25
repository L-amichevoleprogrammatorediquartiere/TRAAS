export default function Scritta(){
    return(
        <div
        style={{
            postion: 'absolute',
            top: '15%',
            left: '14%',
            width: '70%',
            height: '60%',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'var(--carattere-txt)',
            fontSize: '20px'
        }}>
            <p><span style={{fontSize: '90px'}}><b>T</b></span> tele </p>
            <p><span style={{fontSize: '90px'}}><b>R</b></span> rehabilitation </p>
            <p><span style={{fontSize: '90px'}}><b>A</b></span> s </p>
            <p><span style={{fontSize: '90px'}}><b>A</b></span>  </p>
            <p><span style={{fontSize: '90px'}}><b>S</b></span> service </p>
        </div>
    );
}