import '../App.css';
import {TopMenu} from "../Components/TopMenu/TopMenu";
import {TopBanner} from "../Components/TopBanner/TopBanner";
import {ComponentSelector} from "../Components/ComponentSelector/ComponentSelector";
import {ComponentSelectedTable} from "../Components/ComponentSelectedTable/ComponentSelectedTable"
import {Container, Row, Col} from 'reactstrap';
import {RecoilRoot} from "recoil";
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
                    <ComponentSelector/>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
