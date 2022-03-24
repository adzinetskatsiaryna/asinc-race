export const SET_CARS = "SET_CARS";
export const ADD_CAR = 'ADD-CAR';
export const CREATE_CAR_NAME = 'UPDATE-CAR-NAME';
export const CREATE_COLOR = "UPDATE-COLOR";
export const GENERATE_RANDOM_CARS = "GENERATE_RANDOM_CARS";
export const REMOVE_CAR = "REMOVE_CAR";
export const UPDATE_CAR_COLOR = "UPDATE_CAR_COLOR";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SET_TOTAL_CARS_COUNT = "SET_TOTAL_CARS_COUNT";
export const DELETE_CAR="DELETE_CAR";
export const UPDATE_CAR="UPDATE_CAR";
export const SET_WINDOW_WIDTH="SET_WINDOW_WIDTH";
export const SET_STATUS_AND_SPEED="SET_STATUS_AND_SPEED";
export const SET_POSITION="SET_POSITION";

export const addCarActionCreator = (newCar: CarInterface) => {
    return {type: ADD_CAR, newCar} as const;
} 
export const setPositionAC=(position:number, id: number)=>{
    return{type:SET_POSITION,position, id} as const
}

export const removeCarActionCreator = (id: number) => {
    return {type: REMOVE_CAR, carId: id} as const
}
export const createCarNameActionCreator = (carName: string) => {
    return {type: CREATE_CAR_NAME, carName: carName} as const
}
export const updateColorActionCreator = (color: string) => {
    return {type: CREATE_COLOR, color: color} as const
}
export const generateRandomCarsActionCreator = (generatedCars: Array<CarInterface>) => {
    return {type: GENERATE_RANDOM_CARS,generatedCars:generatedCars} as const;
}

export const setCarsAC = ( carsInGarage: Array<CarInterface>) => {
    return {type: SET_CARS,  carsInGarage} as const
}
export const setCurrentPageAC = (currentPage: number) => {
    return {type: SET_CURRENT_PAGE, currentPage: currentPage} as const
}
export const setTotalsCarsCountAC = (totalCount: number) => {
    return {type: SET_TOTAL_CARS_COUNT, totalCount: totalCount} as const
}
export const updateCarAC=(newCar:CarInterface)=>{
    return{ type:UPDATE_CAR, newCar} as const
}

export const setWindowWidthAC=(windowWidth:number)=>{
    return {type:SET_WINDOW_WIDTH,windowWidth} as const
}


export const setStatusAndSpeedAC=(speed:number,status:string)=>{
    return{type:SET_STATUS_AND_SPEED, speed,status} as const
}

type ActionType = 
| ReturnType<typeof addCarActionCreator>
| ReturnType<typeof setPositionAC>
| ReturnType<typeof removeCarActionCreator >
| ReturnType<typeof createCarNameActionCreator>
| ReturnType<typeof updateColorActionCreator>
| ReturnType<typeof generateRandomCarsActionCreator>
| ReturnType<typeof setCarsAC>
| ReturnType<typeof setCurrentPageAC>
| ReturnType<typeof setTotalsCarsCountAC>
| ReturnType<typeof updateCarAC>
| ReturnType<typeof setWindowWidthAC>
| ReturnType<typeof setStatusAndSpeedAC>

type NewCarType = {
    color: string
    name: string
}
export type StatusCar = 'started' | 'stopped' | 'drive' | 'finished' | 'start'

export type CarInterface = {
    name: string;
    color: string;
    id: number;
    position: number;
    status: StatusCar;
    time?: number | undefined;
    isEngineStart: boolean;
    remove: (id: number) => void;
    update: (id: number) => void;
    getWinner: (id: number, name: string, time: number, color: string) => void;
}

type InitialStateType={
    carsInGarage:Array<CarInterface>,
    pageSize:number,
    totalCount: number,
    currentPage:number,
    windowWidth:number,
    newCar: NewCarType
}

const initialState: InitialStateType = {
    carsInGarage: [],
    pageSize: 7,
    totalCount: 0,
    currentPage: 1,
    windowWidth:0,
    newCar: {
        color: '',
        name: '',
    }
}

export const garageReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {

        case  SET_CARS: {
            return {
                ...state,
                //carsInGarage: action.carsInGarage
                carsInGarage: action.carsInGarage
            }
        }
        case ADD_CAR: {
            return {
                ...state,
                carsInGarage: [...state.carsInGarage, action.newCar]
            }
        }

        case CREATE_CAR_NAME:
            return {
                ...state,
                newCar: {
                    ...state.newCar,
                    name: action.carName
                }
                
            }


        case CREATE_COLOR: {
            return {
                ...state,
                newCar: {
                    ...state.newCar,
                    color: action.color
                }
            }
        }

        case GENERATE_RANDOM_CARS: {
            return {
                ...state,
                carsInGarage: [...state.carsInGarage, ...action.generatedCars]
            }
        }

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_CARS_COUNT:
            return {
                ...state,
                totalCount: action.totalCount
            }
        case UPDATE_CAR:{
            return {
                ...state
            }
        }
        case SET_WINDOW_WIDTH:
            return {
                ...state,
                windowWidth: action.windowWidth
            }
        case SET_POSITION: {
        
            return {
                ...state,
                carsInGarage:state.carsInGarage.map(c=>c.id===action.id ? {...c, position: action.position}: c)
            }
        }
            
        case REMOVE_CAR:
            return {
                ...state,
                carsInGarage:state.carsInGarage.filter(
                    car=>car.id!==action.carId
                )
            }

        default:
            return state;
    }

}


