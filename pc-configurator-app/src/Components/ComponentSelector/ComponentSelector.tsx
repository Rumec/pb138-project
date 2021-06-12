import React from 'react';
import './ComputerSelector.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BEMHelper from 'react-bem-helper';
import {ComponentSelectedTable} from "../ComponentSelectedTable/ComponentSelectedTable";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Table} from 'reactstrap';
import { Badge } from 'reactstrap';

const classes = new BEMHelper({
    name: 'component-selector',
});

interface IPokusProps {
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
const DropdownPicker: React.FC<IPokusProps> = (props: IPokusProps) => {
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

// TODO: komponenta jako picker komponent počítače, počítání ceny sestavy a "odškrtávání" vybraných
//      komponent v tabulce

export const ComponentSelector: React.FC = () => {
    // TODO: toto se bude tahat z DB
    // JSON má pro každou kategorii seznam komponent - ten se natáhne přes findMany z DB
    // Pozn: Z DB můžeme vracet i celý JSON, musí však mít smluvený formát - důležité je ID komponenty
    //      její název a cena - z toho se udělá popisek a vypočte celková cena -> ID je důležité pro
    //      sestavení objednávky - příslušné komponenty se pak natahají z DB podle toho id
    const data = {
        cpu: [
            {
                id: 1,
                manufacturer: "Intel",
                name: "i7 9700k",
                price: 500
            },
            {
                id: 2,
                manufacturer: "AMD",
                name: "Ryzen 5 5600X",
                price: 460
            },
        ],
        motherboard: [
            {
                id: 1,
                manufacturer: "Asus",
                name: "P3X 927",
                price: 399
            },
            {
                id: 2,
                manufacturer: "Gigabyte",
                name: "R7X Blabla",
                price: 281
            },
        ],
        ram: [
            {
                id: 1,
                manufacturer: "Intel",
                name: "i7 9700k",
                price: 500
            },
            {
                id: 2,
                manufacturer: "AMD",
                name: "Ryzen 5 5600X",
                price: 460
            },
        ],
        disk: [
            {
                id: 1,
                manufacturer: "WD",
                name: "Red",
                price: 99
            },
            {
                id: 2,
                manufacturer: "Seagate",
                name: "Barracuda",
                price: 119
            },
        ],
        gpu: [
            {
                id: 1,
                manufacturer: "NVidia",
                name: "RTX 3090",
                price: 1600
            },
            {
                id: 2,
                manufacturer: "AMD",
                name: "Radeon 5600XT",
                price: 800
            },
        ],
        psu: [
            {
                id: 1,
                manufacturer: "Fortron",
                name: "XY",
                price: 159
            },
            {
                id: 2,
                manufacturer: "Seasonic",
                name: "YX",
                price: 259
            },
        ],
        case: [
            {
                id: 1,
                manufacturer: "WD",
                name: "Red",
                price: 99
            },
            {
                id: 2,
                manufacturer: "Seagate",
                name: "Barracuda",
                price: 119
            },
        ],
        monitor: [
            {
                id: 1,
                manufacturer: "AOC",
                name: "32U14",
                price: 499
            },
            {
                id: 2,
                manufacturer: "Dell",
                name: "UltraSharp",
                price: 699
            },
        ],
        keyboard: [
            {
                id: 1,
                manufacturer: "Logitech",
                name: "Some shitty keyboard",
                price: 19
            },
            {
                id: 2,
                manufacturer: "Asus",
                name: "E-waste",
                price: 25
            },
        ],
        mouse: [
            {
                id: 1,
                manufacturer: "C-Tech",
                name: "Piece of crap",
                price: 29
            },
            {
                id: 2,
                manufacturer: "Logitech",
                name: "Dogshit",
                price: 9
            },
        ],
    }

    // Object of selected component
    // NOTE: id = -1 -> this component was not chosen yet
    const [selected, setSelected] = React.useState({
        case: {
            id: -1,
            name: "",
            price: 0
        },
        cpu: {
            id: -1,
            name: "",
            price: 0
        },
        disk: {
            id: -1,
            name: "",
            price: 0
        },
        gpu: {
            id: -1,
            name: "",
            price: 0
        },
        keyboard: {
            id: -1,
            name: "",
            price: 0
        },
        monitor: {
            id: -1,
            name: "",
            price: 0
        },
        motherboard: {
            id: -1,
            name: "",
            price: 0
        },
        mouse: {
            id: -1,
            name: "",
            price: 0
        },
        psu: {
            id: -1,
            name: "",
            price: 0
        },
        ram: {
            id: -1,
            name: "",
            price: 0
        },
    });

    /**
     * Handles change of dropdown and updates components state accordingly
     * @param event
     */
    // TODO: Typ eventu -> nechtělo se mi zjišťovat
    const handleChange = (event: any) => {
        if (+event.target.value !== -1) {
            const itemData = JSON.parse(event.target.value);
            setSelected({
                ...selected, [event.target.name]: {
                    name: itemData.name,
                    price: itemData.price
                }
            });
        } else {
            setSelected({
                ...selected, [event.target.name]: {
                    id: -1,
                    name: "",
                    price: 0
                }
            });
        }
        console.log(selected);
    }

    const componentPickers = Object.entries(data).map(([name, items]) => {
        return <DropdownPicker name={name} items={items} handleChange={handleChange}/>
    })

    return (
        <div {...classes()}>
            <ComponentSelectedTable selectedComponents={selected}/>
            {/*TODO: asi vlastní komponenta? */}         
            <Table>
                <tbody>
                    <tr>{componentPickers}<td></td></tr>
                    <tr>
                        {Object.entries(selected).map(([name, values]) => {
                        return <td className="td-right"><h4>{name} costs <Badge color="secondary">{values.price} €</Badge></h4></td>
                        })}
                        <td className="td-right">
                            <h3 id="total">Total: <Badge color="primary">{Object.entries(selected).map(([name, values]) => {
                            return values.price;
                            }).reduce((cumulate, val) => cumulate + val, 0)} €</Badge></h3>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <div style={{display: "flex", flexDirection: "column"}}>
                
            </div>
        </div>
    )
};