import './App.css';

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Login from "./pages/Login.js"
import Selector from "./pages/ComponentSelector.js"
import Register from "./pages/Registration.js"
import Type from "./pages/ComputerType.js"
import Category from "./pages/SpecificCategory.js"
function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/login"  component={Login}/>
                <Route path="/ComponentSelector"  component={Selector}/>
                <Route path="/register" component={Register}/>
                <Route path="/type" component={Type}/>
                <Route path="/specificCategory" component={Category}/>
            </Switch> 
        </Router>

    );
}

export default App;

