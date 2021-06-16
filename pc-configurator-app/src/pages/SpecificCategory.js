import '../App.css';
import {TopMenu} from "../Components/TopMenu/TopMenu";
import {TopBanner} from "../Components/TopBanner/TopBanner";
import {ComputerType} from "../Components/ComputerType/ComputerType";
import {Container, Row, Col} from 'reactstrap';
import {RecoilRoot} from "recoil";

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
                    <ComputerType/>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
