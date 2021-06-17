import React from 'react';
import './OrderHistory.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BEMHelper from 'react-bem-helper';
import {Table, Badge, Button, Row, Col} from 'reactstrap';
import {useRecoilState} from "recoil";
import {selectedPcPartsState, userState} from "../../store/atoms";
import useSWR from "swr";

const classes = new BEMHelper({
    name: 'order__history',
});

const Order = (props: any) => {
    return (
        <Col className="order__element">
            <Row className="order__row">Order: {props.id}</Row>
            <Row className="order__row">Price: {props.price} €</Row>
            
        </Col>
    )
}

export const OrderHistory: React.FC = () => {
    const [userInformation] = useRecoilState(userState);
    console.log(userInformation);

    const fetcher = (url: string) => {
        const loginData = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-User': userInformation.data.id.toString()
            },
        }

        return fetch(url, loginData)
            .then(response => response.json());
    }

    const {data, error} = useSWR(`http://localhost:5000/api/orders`, fetcher);
    console.log(data);
    if (error) return <div>Failed to load</div>;
    if (!data) return <div>loading...</div>;

    const pastOrders = Object.entries(data).map(([key, order]) => {
        // @ts-ignore
        return <Order id={order.id} price={order.total_price}/>
    });
    console.log(pastOrders);

    return (
        <div {...classes()}>
            {pastOrders}
        </div>
    )
};
