import {atom} from "recoil";

interface IDataLoaded {
    // Preventing endless loading
    isLoading: boolean,
    data: {}
}

interface IComponentSelectedTable {
    case: {
        id: number,
        name: string,
        price: number
    }
    cpu: {
        id: number,
        name: string,
        price: number
    }
    disk: {
        id: number,
        name: string,
        price: number
    }
    gpu: {
        id: number,
        name: string,
        price: number
    }
    keyboard: {
        id: number,
        name: string,
        price: number
    }
    monitor: {
        id: number,
        name: string,
        price: number
    }
    motherboard: {
        id: number,
        name: string,
        price: number
    }
    mouse: {
        id: number,
        name: string,
        price: number
    }
    psu: {
        id: number,
        name: string,
        price: number
    }
    ram: {
        id: number,
        name: string,
        price: number
    }
}

/**
 * NOTE: Atom serves as global state
 */
export const userState = atom<IDataLoaded>({
    key: 'userInformation',
    default: {
        isLoading: true,
        data: {}
    }
});

/**
 * I know the default state is ugly but I could come up with better
 * Object of selected component
 * NOTE: id = -1 -> this component was not chosen yet
 */
export const selectedPcPartsState = atom<IComponentSelectedTable>({
    key: 'selectedPcParts',
    default: {

        cpu: {
            id: -1,
            name: "",
            price: 0
        },
        motherboard: {
            id: -1,
            name: "",
            price: 0
        },
        ram: {
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
        psu: {
            id: -1,
            name: "",
            price: 0
        },
        case: {
            id: -1,
            name: "",
            price: 0
        },
        monitor: {
            id: -1,
            name: "",
            price: 0
        },
        keyboard: {
            id: -1,
            name: "",
            price: 0
        },
        mouse: {
            id: -1,
            name: "",
            price: 0
        },
    }
});

