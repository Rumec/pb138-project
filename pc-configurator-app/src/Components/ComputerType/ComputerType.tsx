import React from 'react';
import './ComputerType.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ComputerImage from './images/computer.svg';
import BEMHelper from 'react-bem-helper';
import Button from 'react-bootstrap/Button';
import {useHistory} from "react-router-dom";
import {useRecoilState} from "recoil";
import {selectedCategoryState} from "../../store/atoms";

interface IComputerTypeProps {
    header: string,
    category: string
}

const classes = new BEMHelper({
    name: 'computer-type',
});

// TODO: Změnit obrázek
export const ComputerType: React.FC<IComputerTypeProps> = (props: IComputerTypeProps) => {
    const [selectedCategory, setSelectedCategory] = useRecoilState(selectedCategoryState);

    let history = useHistory();
    return (
        <div {...classes()}>
            <div {...classes('header')}>{props.header}</div>
            <img {...classes('image')} src={ComputerImage} alt={'Computer'}/>
            <div {...classes('price-line')}>
                <Button
                    onClick={() => {
                        setSelectedCategory({
                            category: props.category
                        })
                        history.push('/ComponentSelector');
                    }}
                >Select</Button>
            </div>

        </div>
    )
};

