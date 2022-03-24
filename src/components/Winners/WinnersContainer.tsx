import {connect} from "react-redux";
import Winners, {IWinner} from "./Winners";
import {Dispatch} from "react";
import { Action } from "redux";
import {addWinnerAC, apdateWinsAC, setCurrentPageAC, setTotalCountAC, setWinnersAC} from "../../redux/winners-reducer";
import { ReducerAppType} from "../../redux/redux-store";

const mapStateToProps=(state:ReducerAppType)=>{
    return{
        allWinners:state.winners,
        totalCount:state.winners.totalCount,
        pageSize:state.winners.pageSize,
        currentPage:state.winners.currentPage,
    }
}

let mapDispatchToProps=(dispatch:Dispatch<Action>)=>{
    
    return{
       setWinners:(allWinners:Array<IWinner>)=>{
            dispatch(setWinnersAC(allWinners))
       },
        setTotalCount:(totalCount:number)=>{
           dispatch(setTotalCountAC(totalCount))
        },
        setCurrentPage:(pageNumber:number)=>{
           dispatch(setCurrentPageAC(pageNumber))
        },
        addWinner:(newWinner:IWinner)=>{
           dispatch(addWinnerAC(newWinner))
        },
        apdateWin: (newWins: IWinner)=>{
            dispatch(apdateWinsAC(newWins))
        }
    }

}




const GarageContainer=connect(mapStateToProps,mapDispatchToProps)(Winners);

export default GarageContainer;
