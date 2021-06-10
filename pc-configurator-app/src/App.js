import './App.css';
import {TopMenu} from "./Components/TopMenu/TopMenu";
import {TopBanner} from "./Components/TopBanner/TopBanner";
import {ComputerTypeChooser} from "./Components/ComputerTypeChooser/ComputerTypeChooser";
import {ComponentSelector} from "./Components/ComponentSelector/ComponentSelector";

function App() {
    return (
        <div>
            <TopMenu/>
            <TopBanner header={"PC configurator"}/>
            {/*
            <ComputerTypeChooser/>
            */}
            <ComponentSelector />
        </div>
    );
}

export default App;
