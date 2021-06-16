import '../App.css';
import {TopMenu} from "../Components/TopMenu/TopMenu";
import {TopBanner} from "../Components/TopBanner/TopBanner";
import {ComputerTypeChooser} from "../Components/ComputerTypeChooser/ComputerTypeChooser";
import {ComponentSelector} from "../Components/ComponentSelector/ComponentSelector";
import {Container, Row, Col} from 'reactstrap';
import {LoginPage} from "../Components/LoginPage/LoginPage";
import {RecoilRoot} from "recoil";
import {UserRegistration} from "../Components/UserRegistration/UserRegistration";
import "./padding.css"

function App() {
    return (
        <Container fluid={true}>
            <Row>
                <Col>
                    <TopMenu/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <TopBanner header={"PC configurator"}/>
                </Col>
            </Row>

            <Row>
                <Col>
                    <LoginPage/>
                </Col>
            </Row>

            {/*
            <Row>
                <Col>

                <ComponentSelector/>
<UserRegistration/>
                </Col>
            </Row>

<UserRegistration/>
            <ComputerTypeChooser/>
            */}
        </Container>
    );
}

export default App;
