export default function Scritta(){
    return(
        <div
        style={{
            flexDirection: 'column',
            fontFamily: 'var(--carattere-txt)',
            fontSize: '20px'
        }}>
            <div
            style={{
                position: 'absolute',
                top: '10%',
                left: '70%'
            }}>
                <p><span style={{fontSize: '90px'}}><b><i>T</i></b></span> tele </p>
            </div>
            <div
            style={{
                position: 'absolute',
                top: '25%',
                left: '70%'
            }}>
                <p><span style={{fontSize: '90px'}}><b><i>R</i></b></span> rehabilitation </p>
            </div>
            <div
            style={{
                position: 'absolute',
                top: '40%',
                left: '70%'
            }}>
                <p><span style={{fontSize: '90px'}}><b><i>A</i></b></span> s </p>
            </div>
            <div
            style={{
                position: 'absolute',
                top: '55%',
                left: '70%'
            }}>
                <p><span style={{fontSize: '90px'}}><b><i>A</i></b></span>  </p>
            </div>
            <div
            style={{
                position: 'absolute',
                top: '70%',
                left: '70%'
            }}>
                <p><span style={{fontSize: '90px'}}><b><i>S</i></b></span> service </p>
            </div>
        </div>
    );
}