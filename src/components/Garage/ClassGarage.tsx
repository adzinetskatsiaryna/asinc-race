import React from "react";
import s from "./garage.module.css";
import axios, { AxiosResponse } from "axios";
import {Car} from "./Car/Car";
import {getRandomColor, getRandomName, getWindowWidth} from "../utils";
import { IWinner } from "../Winners/Winners";
import { MDTPGarageContainer, MSTPGarageContainer } from "./GarageContainer";
import { CarInterface, StatusCar } from "../../redux/garage-reducer";

type PropsType = MSTPGarageContainer & MDTPGarageContainer


type StateType = {
    newCar: {
        name?: string | undefined | null
        color?: string | undefined | null
        id: number
    }
    timer: number
    position: 40
    speed: number
    status: StatusCar
    distance: number
    winner: {
        id: number,
        name: string,
        time: number,
        wins: number,
        color: string
    }
    isFinished: boolean
    isRace: boolean
}
class GarageNew extends React.Component<PropsType, StateType> {
    newCarElementName: React.RefObject<HTMLInputElement> = React.createRef();
    newCarElementColor: React.RefObject<HTMLInputElement> = React.createRef();
    updateCarColor: React.RefObject<HTMLInputElement> = React.createRef();
    updateCarName: React.RefObject<HTMLInputElement> = React.createRef();

    state: StateType = {
        newCar: {
            name: "",
            color: "",
            id: 0
        },
        timer:0,
        position:40,
        speed:0,
        status:"start" as StatusCar,
        distance:getWindowWidth(),
        winner:{
            id:0,
            name:"",
            time:0,
            wins: 1,
            color: ""

        },
        isFinished:false,
        isRace: false
    }


   getCars() {
       axios.get(`http://localhost:3000/garage?_page=${this.props.currentPage}&_limit=7`)
           .then(res => {
               let carsArray = res.data;
               let totalCount = res.headers[`x-total-count`];
               this.props.setTotalCarsCount(totalCount)
               this.props.setCars(carsArray);
           })
   }

    componentDidMount(): void {
        this.getCars();
    }

    onPageChanged = (currentPage: number) => {
       
        this.props.setCurrentPage(currentPage);
        axios.get(`http://localhost:3000/garage?_page=${currentPage}&_limit=7`)
            .then(res => {
                this.getCars()
            })
    }

    createNewCarAndAddToGarage = () => {
        const name = this.newCarElementName.current && this.newCarElementName.current.value;
        const color = this.newCarElementColor.current && this.newCarElementColor.current.value;
        axios.post(`http://localhost:3000/garage`,
            {
                name,
                color
            }).then(res => {
               this.getCars()
        });
    };

    onCarNameChange = () => {
        if (this.newCarElementName.current) {
            let text = this.newCarElementName.current.value;
            this.setState({
                newCar: {
                    ...this.state.newCar,
                    name: text
                }
            })
        }
    }

    onColorChange = () => {
        if (this.newCarElementColor.current) {
            let color = this.newCarElementColor.current?.value;
            this.setState({
                newCar: {
                    ...this.state.newCar,
                    color: color
                }
            })
        }
    }

    onGenerateNewArray=()=>{
        const generatedCars = [];
        const promises: Promise<AxiosResponse<CarInterface>>[] = []
        for (let i = 0; i < 100; i++) {
            generatedCars.push({
                name: getRandomName(),
                color: getRandomColor(),
            })
        }
       
        generatedCars.forEach(car => {
            let pr = axios.post(`http://127.0.0.1:3000/garage`, car)
            promises.push(pr)
                
        })
        Promise.all(promises).then( (res)=> {    
            this.getCars();
        } )

    }

    deleteCar = (id: number) => {
        axios.delete(`http://127.0.0.1:3000/garage/${id}`)
            .then(res => {
                this.props.removeCar(id)
                this.getCars()
            });
        axios.delete(`http://127.0.0.1:3000/winners/${id}`)
            .then(res=>{
                
            })
    }

    onCarUpdate = () => {
        let name = this.updateCarName.current && this.updateCarName.current.value;
        let color = this.updateCarColor.current && this.updateCarColor.current.value;
        axios.put(`http://127.0.0.1:3000/garage/${this.state.newCar.id}`, {
            name,
            color
        }).then(res => {
            this.getCars()
        })
    }

    updateName = () => {
        this.setState({
            newCar: {
                ...this.state.newCar,
                name: this.updateCarName.current && this.updateCarName.current.value
            }
        })
    }

    updateColor = () => {
        this.setState({
            newCar: {
                ...this.state.newCar,
                color: this.updateCarColor.current && this.updateCarColor.current.value
            }
        })
    }

    selectCar = (id: number) => {
        axios.get(`http://127.0.0.1:3000/garage/${id}`).then(res => {
                let name = res.data.name;
                let color = res.data.color;
                this.setState({
                    newCar: {
                        name: name,
                        color: color,
                        id
                    }
                });
                if (this.updateCarName.current) this.updateCarName.current.value = name;
                if(this.updateCarColor.current)this.updateCarColor.current.value=color;
            }
        )
    }

    onStartRaceClick=()=>{
        this.setState({
            status:"drive",
            isRace: true
        })
    }

    onStopClick=()=>{
        this.setState({
            status: "started",
            position:40,
            isFinished:false,
            isRace: false
        })
    }

    setRace=(race: boolean)=>{
        this.setState(
            {
                isRace: race
            }
        )
    }
    setFinish=(status: boolean)=>{
        this.setState(
            {
                isFinished:status
            }
        )
    }

    getBestTimeAndShowWinner=(id:number,name:string,time:number, color: string)=>{
      
      const winnerInBD=  this.props.allWinners.find((w:IWinner) =>w.id === id)
     
      if(typeof winnerInBD === "undefined"){
        const newWinner = {
            id:id,
            name:name,
            time:time,
            wins: 1,
            color: color
          }
                this.setState({
                    winner:newWinner,
                    isFinished:true,
                    status:"finished"
                })
            axios.post(`http://127.0.0.1:3000/winners`,
            {
                id: id,
                name: name,
                time: time,
                wins: 1,
                color: color
            }).then(res => {
            
            this.props.addWinner({...this.state.winner})
        });
      } else {
        const bestTime : number = time > winnerInBD.time ? winnerInBD.time : time
        // const newWinner: IWinner = {}
       
        this.setState({
            winner: {
                id: winnerInBD.id, 
                name: winnerInBD.name , 
                time: time, 
                wins: winnerInBD.wins + 1, 
                color: winnerInBD.color
            },
            isFinished:true,
            status:"finished"
        })
          axios.put(`http://127.0.0.1:3000/winners/${id}`,
         
    {
        id: id,
        name: name,
        time: bestTime,  
        wins: winnerInBD.wins + 1,
        color: color
    }).then(res => {
    
    this.props.updateWins({...this.state.winner})
 }); }
        
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        let pagesCount = Math.ceil(this.props.totalCount / this.props.pageSize);
        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
       
        const showWins = this.state.isFinished && this.state.isRace  ? <div className={s.showWinnerPopup}> the {this.state.winner.name} wins  with the time: {this.state.winner.time} sec </div> : ''
          
        return (
            <div className={s.garageView}>
                <div>
                    <div className={s.form}>
                        <input className={s.input}
                               ref={this.newCarElementName}
                               id="create-name" type="text"
                               onChange={this.onCarNameChange}
                        />
                        <input className={s.color}
                               ref={this.newCarElementColor}
                               id="create-color" type="color"
                               onChange={this.onColorChange}
                        />
                        <button className={s.btn}
                                onClick={this.createNewCarAndAddToGarage}
                        >Create
                        </button>
                    </div>
                    <div>
                        <input className={s.input}
                              ref={this.updateCarName}
                               onChange={this.updateName} type="text"/>
                        <input className={s.color}
                              ref={this.updateCarColor}
                               id="update-color" type="color"
                            onChange={this.updateColor}
                        />
                        <button className={s.btn}
                                onClick={this.onCarUpdate}
                        >Update
                        </button>
                    </div>
                </div>
                <div className={s.raceControls}>
                    <button className={s.raceBtn}
                            onClick={this.onStartRaceClick}
                    >Race</button>
                    <button className={s.resetBtn}
                            onClick={this.onStopClick}
                    >
                    Reset</button>
                    <button className={s.generatorBtn}
                            onClick={this.onGenerateNewArray}
                    >Generate
                    </button>
                </div>
                <div className={s.garage}>
                    {showWins}
                    <h1>Garage: # {this.props.totalCount}</h1>
                    <h2> page: {this.props.currentPage}</h2>
                    <div className={s.raceContainer}>
                        {this.props.carsInGarage.map((car) => { return <Car 
                            name={car.name} 
                            color={car.color} 
                            id={car.id} 
                            isEngineStart={car.isEngineStart}
                            key={car.id}
                            remove={this.deleteCar} 
                            update={this.selectCar}
                            position={this.state.position}
                            status={this.state.status}
                            getWinner={this.getBestTimeAndShowWinner}
                            isFinished = {this.state.isFinished}
                            setFinish = {this.setFinish}
                            isRace={this.state.isRace}
                            />
                         }
                        )}
                    </div>
                </div>
                <div className={s.pagination}>
                    {pages.map((p,i )=> {
                        return <button key={i}
                            className={this.props.currentPage === p ? s.selectedPage:""}
                                       onClick={()=>this.onPageChanged(p)}
                        >{p}</button>
                    })}

                </div>
            </div>
        );
    }
}

export default GarageNew;


