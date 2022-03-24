import {IWinner} from "../components/Winners/Winners";

export type winnersInitialState={
    allWinners:Array<IWinner>,
    totalCount:number,
    pageSize:number,
    currentPage: number,
}

let initialState: winnersInitialState = {
    allWinners:[],
    totalCount:0,
    pageSize: 10,
    currentPage: 1,
}

export const SET_WINNERS = "SET_WINNERS";
export const SET_TOTAL_COUNT_WINNER=' SET_TOTAL_COUNT_WINNER';
export const ADD_WINNER='ADD_WINNER';
export const SET_CURRENT_PAGE_WINNER="SET_CURRENT_PAGE_WINNER"
export const UPDATE_WINS = "UPDATE_WINS"

export const setWinnersAC=(allWinners:Array<IWinner>)=>{
    return{ type:SET_WINNERS,allWinners} as const
}
export  const setTotalCountAC=(totalCount:number)=>{
    return{type:SET_TOTAL_COUNT_WINNER,totalCount } as const
}
export const  addWinnerAC=(newWinner:IWinner)=>{
    return {type:ADD_WINNER, newWinner} as const
}
export const setCurrentPageAC=(currentPage:number)=>{
    return { type:SET_CURRENT_PAGE_WINNER,currentPage:currentPage} as const
}
export const apdateWinsAC = (newWins: IWinner)=>{
    return {type: UPDATE_WINS, newWins} as const
}

type ActionType = 
| ReturnType<typeof setWinnersAC>
| ReturnType<typeof setTotalCountAC>
| ReturnType<typeof addWinnerAC>
| ReturnType<typeof setCurrentPageAC>
| ReturnType<typeof apdateWinsAC>



export const winnersReducer=(state:winnersInitialState=initialState,action: ActionType): winnersInitialState=>{
    switch (action.type) {
        case SET_WINNERS: {
            
            return {
                ...state,
                allWinners: action.allWinners
            }
        }
        case SET_TOTAL_COUNT_WINNER:
           
            return {
                ...state,
                totalCount:action.totalCount
            }
        case ADD_WINNER:{
          
            return {
                ...state,
                allWinners: [...state.allWinners, action.newWinner],

            }
        }
        case SET_CURRENT_PAGE_WINNER:
            return {
                ...state,
                currentPage:action.currentPage
            }
        case UPDATE_WINS:
                return {
                    ...state,
                    //allWinners: [...state.allWinners, action.newWins]
                }    
        default:
            return state

    }
}
