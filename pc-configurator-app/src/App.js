import './App.css';
import {TopMenu} from "./Components/TopMenu/TopMenu";
import {TopBanner} from "./Components/TopBanner/TopBanner";
import {ComputerTypeChooser} from "./Components/ComputerTypeChooser/ComputerTypeChooser";

function App() {
    return (
        <div>
            <TopMenu/>
            <TopBanner header={"PC configurator"}/>
            <ComputerTypeChooser/>
        </div>
    );
}

export default App;
