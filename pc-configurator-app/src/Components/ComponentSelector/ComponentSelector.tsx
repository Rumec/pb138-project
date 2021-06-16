import React from 'react';
import './ComputerSelector.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BEMHelper from 'react-bem-helper';
import {ComponentSelectedTable} from "../ComponentSelectedTable/ComponentSelectedTable";
import {Table, Badge, Button} from 'reactstrap';
import {useRecoilState} from "recoil";
import {useHistory} from "react-router-dom";
import {selectedPcPartsState, userState} from "../../store/atoms";
import useSWR from "swr";

const classes = new BEMHelper({
    name: 'component-selector',
});

interface IComponentSelectorProps {
    name: string,
    items: {
        id: number,
        manufacturer: string,
        name: string,
        price: number
    }[],

    handleChange(event: React.ChangeEvent): void;
}

/**
 * Picker for a single computer part
 * @param props - info about parts at stock
 */
//TODO: naparsovat na reactstrap
const DropdownPicker: React.FC<IComponentSelectorProps> = (props: IComponentSelectorProps) => {
    return (
        <td>
            <select className="theme-style" name={props.name} onChange={props.handleChange}>
                {/* Default value */}
                <option
                    key={0}
                    value={-1}
                >
                    Select a {props.name}
                </option>
                {/* Values derived from props */}
                {props.items.map(item => (
                    <option
                        key={item.id}
                        value={JSON.stringify(item)}
                    >
                        {item.manufacturer} {item.name} ({item.price} €)
                    </option>
                ))}
            </select>
        </td>
    )
}


export const ComponentSelector: React.FC = () => {
    const history = useHistory();
    const [selectedPcParts, setSelectedPcParts] = useRecoilState(selectedPcPartsState);
    const [userInformation] = useRecoilState(userState);



    const fetcher = (url: string) => {
        const loginData = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-User': '4'//userInformation.data.id.toString()
            },
        }

        return fetch(url, loginData)
            .then(response => response.json());
    }

    // will be provided by routing
    const category = '';
    const {data, error} = useSWR(`http://localhost:5000/api/components/${category}`, fetcher);

    if (error) return <div>Failed to load</div>;
    if (!data) return <div>loading...</div>;
    console.log(data);
    /**
     * Handles change of dropdown and updates components state accordingly
     * @param event
     */
        // TODO: Typ eventu -> nechtělo se mi zjišťovat
    const handleChange = (event: any) => {
            if (+event.target.value !== -1) {
                const itemData = JSON.parse(event.target.value);
                setSelectedPcParts({
                    ...selectedPcParts,
                    [event.target.name]: itemData
                });
            } else {
                setSelectedPcParts({
                    ...selectedPcParts, [event.target.name]: {
                        id: -1,
                        name: "",
                        price: 0
                    }
                });
            }
        }

    // @ts-ignore
    const componentPickers = Object.entries(data).map(([name, items]) => {
        // @ts-ignore
        return <DropdownPicker name={name} items={items} handleChange={handleChange}/>
    })

    const buyItem = () => {
        let unselectedItems = '';
        const selectedItems = Object.entries(selectedPcParts).map(([name, values]) => {
            if (name === 'keyboard' || name === 'mouse' || name === 'monitor') {
                return true;
            } else if (values.id === -1) {
                unselectedItems += name + ', ';
                return false;
            }
            return true;
        });
        const result = selectedItems.reduce((sum, next) => sum && next, true);

        if(!result) {
            window.alert('You need to select following items: ' + unselectedItems);
            return;
        }
        // TODO - routa na košík
        history.push('/ShoppingCart');
    }

    return (
        <div {...classes()}>
            <ComponentSelectedTable/>
            <Table>
                <tbody>
                <tr>{componentPickers.sort()}
                    <td></td>
                    <td/>
                </tr>
                <tr>
                    {Object.entries(selectedPcParts).map(([name, values]) => {
                        return <td className="td-right"><h4>{name} costs <Badge
                            color="secondary">{values.price} €</Badge></h4></td>
                    })}
                    <td className="td-right">
                        <h3 id="total">Total: <Badge color="primary">{Object.entries(selectedPcParts).map(([name, values]) => {
                            return values.price;
                        }).reduce((cumulate, val) => cumulate + val, 0)} €</Badge></h3>
                    </td>
                    <td>
                        <Button
                            onClick={buyItem}
                        >
                            Buy
                        </Button>
                    </td>
                </tr>
                </tbody>
            </Table>

        </div>
    )
};
