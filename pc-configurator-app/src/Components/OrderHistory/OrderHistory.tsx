import React from 'react';
import './OrderHistory.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BEMHelper from 'react-bem-helper';
import {Table, Badge, Button, Row, Col} from 'reactstrap';
import {useRecoilState} from "recoil";
import {selectedPcPartsState, userState} from "../../store/atoms";
import useSWR from "swr";

const classes = new BEMHelper({
    name: 'shopping-cart',
});

const Order = (props: any) => {
    return (
        <Col>
            <Row>Order: {props.id}</Row>
            <Row>Price: {props.price} €</Row>
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

    const pastOrders = Object.entries(data).map(order => {
        // @ts-ignore
        return <Order id={order.id} price={order.price}/>
    });


    return (
        <div {...classes()}>
            {pastOrders}
        </div>
    )
};
