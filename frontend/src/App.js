import Navbar from './components/navbar'
import BackButton from './components/button/backbutton'
import CheckButton from './components/button/checkbutton'
import ClFullScreenButton from './components/button/clfullscreenbutton'
import CloseButton from './components/button/closebutton'
import DeleteButton from './components/button/deletebutton'
import FullScreenButton from './components/button/fullscreenbutton'
import InfoButton from './components/button/infobutton'
import LogoutButton from './components/button/logoutbutton'
import MinusButton from './components/button/minusbutton'
import ModifyButton from './components/button/modifybutton'
import OpenButton from './components/button/openbutton'
import PlayButton from './components/button/playbutton'
import PlusButton from './components/button/plusbutton'
import './App.css'

function App() {
  return (
    <div className="app-background">
      <Navbar/>
      <PlayButton onClick={() => console.log("Play clicked")} />
      <BackButton onClick={() => console.log("Back clicked")} />
      <CheckButton onClick={() => console.log("Check clicked")} />
      <ClFullScreenButton onClick={() => console.log("Close Full Screen clicked")} />
      <CloseButton onClick={() => console.log("Close clicked")} />
      <DeleteButton onClick={() => console.log("Delete clicked")} />
      <FullScreenButton onClick={() => console.log("Full Screen clicked")} />
      <InfoButton onClick={() => console.log("Info clicked")} />
      <LogoutButton onClick={() => console.log("Logout clicked")} />
      <MinusButton onClick={() => console.log("Minus clicked")} />
      <ModifyButton onClick={() => console.log("Modify clicked")} />
      <OpenButton onClick={() => console.log("Open clicked")} />
      <PlusButton onClick={() => console.log("Plus clicked")} />
    </div>
  );
}

export default App;
