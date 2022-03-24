
import  {Dispatch} from "react";

import {
    addCarActionCreator,
    CarInterface,
    generateRandomCarsActionCreator, removeCarActionCreator,
    setCarsAC,
    setCurrentPageAC,
    setTotalsCarsCountAC, setWindowWidthAC, updateCarAC,
    updateColorActionCreator
} from "../../redux/garage-reducer";
import {connect} from "react-redux";
import GarageNew from "./ClassGarage";
import { Action } from "redux";
import { addWinnerAC, apdateWinsAC } from "../../redux/winners-reducer";
import { ReducerAppType} from "../../redux/redux-store";
import  {IWinner} from "../Winners/Winners";


export type MSTPGarageContainer = {
    carsInGarage: Array<CarInterface>
    pageSize: number
    totalCount: number
    currentPage:number
    windowWidth:number
    allWinners: Array<IWinner>
}

let mapStateToProps=(state: ReducerAppType): MSTPGarageContainer => {
    return {
        carsInGarage:state.garage.carsInGarage,
        pageSize:state.garage.pageSize,
        totalCount:state.garage.totalCount,
        currentPage:state.garage.currentPage,
        windowWidth: state.garage.windowWidth,
        allWinners:state.winners.allWinners,
    }
}

export type MDTPGarageContainer = {
    setCars:( carsInGarage: Array<CarInterface>) => void
    createCar:(newCar: CarInterface)=> void
    generateRandomCars:(generatedCars:Array<CarInterface>)=>void
    updateCarColor:(name:string,color:string)=>void
    setCurrentPage:(pageNumber:number)=>void
    setTotalCarsCount:(totalCount:number)=>void
    updateCar:(newCar: CarInterface)=>void
    setWindowWidth:(windowWidth:number)=>void
    removeCar:(carId:number)=>void
    addWinner: (winner: IWinner)=>void
    updateWins: (newWins: IWinner)=>void

}

let mapDispatchToProps=(dispatch:Dispatch<Action>): MDTPGarageContainer => {
    return{
        setCars:( carsInGarage: Array<CarInterface>)=>{
            dispatch(setCarsAC( carsInGarage))
        },

       createCar:(newCar: CarInterface)=>{
           dispatch(addCarActionCreator(newCar))
       },
        generateRandomCars:(generatedCars:Array<CarInterface>)=>{
            dispatch(generateRandomCarsActionCreator(generatedCars))
        },
        updateCarColor:(name:string,color:string)=>{
           dispatch(updateColorActionCreator(color))
        },

        setCurrentPage:(pageNumber:number)=>{
            
            dispatch(setCurrentPageAC(pageNumber))
        },
        setTotalCarsCount:(totalCount:number)=>{
            dispatch(setTotalsCarsCountAC(totalCount))
        },
        updateCar:(newCar: CarInterface)=>{
            dispatch(updateCarAC(newCar))
        },
        setWindowWidth:(windowWidth:number)=>{
            dispatch(setWindowWidthAC(windowWidth))
        },
        removeCar:(carId:number)=>{
            dispatch(removeCarActionCreator(carId))
        },
        addWinner: (winner: IWinner)=>{
           dispatch (addWinnerAC(winner))
        },
        updateWins: (newWins: IWinner)=>{
            dispatch(apdateWinsAC(newWins))
        }
    }
}
const GarageContainer=connect(mapStateToProps,mapDispatchToProps)(GarageNew);

export default GarageContainer;
