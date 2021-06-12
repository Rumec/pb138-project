import './App.css';
import {TopMenu} from "./Components/TopMenu/TopMenu";
import {TopBanner} from "./Components/TopBanner/TopBanner";
import {ComputerTypeChooser} from "./Components/ComputerTypeChooser/ComputerTypeChooser";
import {ComponentSelector} from "./Components/ComponentSelector/ComponentSelector";
import { Container, Row, Col } from 'reactstrap';
import {LoginPage} from "./Components/LoginPage/LoginPage";

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
                    <LoginPage />
                </Col>
            </Row>
            {/*
            <Row>
                <Col>
                    <ComponentSelector/>
                </Col>
            </Row>

            <ComputerTypeChooser/>
            */}
           
        </Container>
    );
}

export default App;
