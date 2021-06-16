import '../App.css';
import {TopMenu} from "../Components/TopMenu/TopMenu";
import {TopBanner} from "../Components/TopBanner/TopBanner";
import {ComponentSelector} from "../Components/ComponentSelector/ComponentSelector";
import {ComponentSelectedTable} from "../Components/ComponentSelectedTable/ComponentSelectedTable"
import {Container, Row, Col} from 'reactstrap';
import {RecoilRoot} from "recoil";


function App() {
    return (
        <Container fluid={true}>
            <RecoilRoot>
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
            </RecoilRoot>
        </Container>
    );
}

export default App;
