import './App.css';

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Login from "./pages/Login.js"
import Selector from "./pages/ComponentSelector.js"
import Register from "./pages/Registration.js"
import Type from "./pages/ComputerType.js"
import Category from "./pages/SpecificCategory.js"
import {useRecoilState} from "recoil";
import {userState} from './store/atoms';
import {RecoilRoot} from "recoil";


function App() {
    const [userInformation] = useRecoilState(userState);
    return (
        
            <Router>
                <Switch>
                    <Route path="/" exact component={Login}/>
                    <Route path="/login"  component={Login}/>
                    <Route path="/ComponentSelector"  component={(userInformation.isLoading)? Selector: Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/type" component={(userInformation.isLoading)? Login: Type}/>
                    <Route path="/specificCategory" component={(userInformation.isLoading)? Category: Login}/>
                </Switch> 
            </Router>
        

    );
}

export default App;

