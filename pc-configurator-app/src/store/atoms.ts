import {atom} from "recoil";

interface IDataLoaded {
    // Preventing endless loading
    isLoading: boolean,
    data: {
        id: number,
        name: string,
        user_name: string,
        salt: string,
        algorithm: string,
        password_hash: string,
        deleted: boolean
    }
}

interface IComponentSelectedTable {
    case: {
        id: number,
        name: string,
        manufacturer: string,
        format: string,
        price: number
    }
    cpu: {
        id: number,
        name: string,
        manufacturer: string,
        frequency: number,
        core_count: number,
        cache: number
        price: number
    }
    disk: {
        id: number,
        name: string,
        manufacturer: string,
        interface: string,
        capacity: number,
        price: number
    }
    gpu: {
        id: number,
        name: string,
        manufacturer: string,
        core_freq: number,
        mem_freq: number,
        mem_capacity: number,
        price: number
    }
    keyboard: {
        id: number,
        name: string,
        manufacturer: string,
        interface: string,
        price: number
    }
    monitor: {
        id: number,
        name: string,
        manufacturer: string,
        interface: string,
        price: number
    }
    motherboard: {
        id: number,
        name: string,
        manufacturer: string,
        interface: string,
        price: number
    }
    mouse: {
        id: number,
        name: string,
        manufacturer: string,
        interface: string,
        price: number
    }
    psu: {
        id: number,
        name: string,
        manufacturer: string,
        power: number,
        price: number
    }
    ram: {
        id: number,
        name: string,
        manufacturer: string,
        type: string,
        capacity: number,
        frequency: number,
        price: number
    }
}

interface ICategory {
    category: string
}

export const selectedCategoryState = atom<ICategory>( {
    key: 'selectedCategory',
    default: {
        category: ''
    }
})

/**
 * NOTE: Atom serves as global state
 */
export const userState = atom<IDataLoaded>({
    key: 'userInformation',
    default: {
        isLoading: true,
        data: {
            id: -1,
            name: "",
            user_name: "",
            salt: "",
            algorithm: "",
            password_hash: "",
            deleted: false
        }
    }
});


export const defaultPcParts = {

    cpu: {
        id: -1,
        name: "",
        manufacturer: "",
        frequency: 0,
        core_count: 0,
        cache: 0,
        price: 0
    },
    motherboard: {
        id: -1,
        name: "",
        manufacturer: "",
        interface: "",
        price: 0
    },
    ram: {
        id: -1,
        name: "",
        manufacturer: "",
        type: "",
        capacity: 0,
        frequency: 0,
        price: 0
    },
    disk: {
        id: -1,
        name: "",
        manufacturer: "",
        interface: "",
        capacity: 0,
        price: 0
    },
    gpu: {
        id: -1,
        name: "",
        manufacturer: "",
        core_freq: 0,
        mem_freq: 0,
        mem_capacity: 0,
        price: 0
    },
    psu: {
        id: -1,
        name: "",
        manufacturer: "",
        power: 0,
        price: 0
    },
    case: {
        id: -1,
        name: "",
        manufacturer: "",
        format: "",
        price: 0
    },
    monitor: {
        id: -1,
        name: "",
        manufacturer: "",
        interface: "",
        price: 0
    },
    keyboard: {
        id: -1,
        name: "",
        manufacturer: "",
        interface: "",
        price: 0
    },
    mouse: {
        id: -1,
        name: "",
        manufacturer: "",
        interface: "",
        price: 0
    },
}

/**
 * I know the default state is ugly but I could come up with better
 * Object of selected component
 * NOTE: id = -1 -> this component was not chosen yet
 */
export const selectedPcPartsState = atom<IComponentSelectedTable>({
    key: 'selectedPcParts',
    default: defaultPcParts
});

