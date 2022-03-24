import React, {useEffect, useState} from "react";
import s from './car.module.css';
import {Icons} from "../../Icons/Icons";
import axios from "axios";
import {getWindowWidth} from "../../utils";
import { StatusCar } from "../../../redux/garage-reducer";



export type CarInterfaceProps = {
    name: string,
    color: string,
    id: number,
    position:number,
    status: StatusCar,
    time?:number,
    isEngineStart: boolean,  
    remove: (id: number) => void,
    update: (id: number) => void,
    getWinner:(id:number, name:string,time:number, color: string)=>void
    isFinished: boolean
    setFinish: (status: boolean)=>void
    isRace: boolean
}

export const Car: React.FC<CarInterfaceProps> = (props) => {
    const [speed, setSpeed] = useState <number>(0);
    const [distance, setDistance] = useState<number | undefined>(undefined);
    const [pos, setPos] = useState<number>(40);
    const [timer, setTimer] = useState<number>(0);
    const [status, setStatus] = useState<StatusCar>('started');
    const [timeOfRace,setTimeOfRace]=useState<number>(0);


    const removeCarFromGarage = (id: number) => {
        props.remove(id)
    }

    const selectCarToUpdate = (id: number) => {
        props.update(id)
    }

    useEffect(()=>{
     if (status==="started" && props.status==="drive"){
      startDrive()
     }
     if((status ==='started'||status ==="drive") && props.status === "finished" && props.isRace ){
      stopAllDrive()
     }
     if(status === "stopped" && props.status === "started"){
     returnOnStart()
     }
    },[props.status, status])


    const getRace = (id: number) => {
       
        return axios.patch(`http://127.0.0.1:3000/engine?id=${id}&status=started`).then(res => {
            let speed = (res.data.velocity / 3);
            let distance = getWindowWidth();
            setSpeed(speed);
            setDistance(distance);
            setStatus('started');
            setPos(40)
            return speed;
        });

    }

    const startDrive = () => { 
       
        const url = `http://127.0.0.1:3000/engine?id=${props.id}&status=drive`;
        getRace(props.id).then(returnSpeed => {
            axios.patch(url)
                .then(res => {
                       let timer = +setInterval(() => {
                        setPos(pos => pos + +returnSpeed)
                    }, 150);
                    setTimer(timer);
                    setStatus('drive')
                })
        });
    }

    const stopDrive = () => {        
        clearInterval(timer);
        setStatus('started')
        axios.patch(`http://127.0.0.1:3000/engine?id=${props.id}&status=started`)
            .then(res => {
                setPos(40);

            });   
    }
    const stopAllDrive = () => {        
        clearInterval(timer);
        setStatus('stopped')
        axios.patch(`http://127.0.0.1:3000/engine?id=${props.id}&status=stopped`)
            .then(res => {
                console.log(res)
                console.log(props.id)
            });   
    }

    const returnOnStart = ()=>{
        setStatus("started")
        
        axios.patch(`http://127.0.0.1:3000/engine?id=${props.id}&status=started`)
            .then(res => {
                setPos(40);
            });     
    }

    if (distance && pos > distance && status !=="stopped" ) {
       
        clearInterval(timer);
        axios.patch(`http://127.0.0.1:3000/engine?id=${props.id}&status=stopped`)
            .then(res => {
               let timeOfRace=+(distance / speed).toFixed(2);
                setStatus('stopped');
                setTimeOfRace(timeOfRace);
                if(props.isRace){
                    props.getWinner(props.id,props.name,timeOfRace, props.color);
                }
                  
            });
    }
    
    return (
        
        <>
            <div className={s.generalBtns}>
                <button onClick={() => selectCarToUpdate(props.id)}>Select</button>
                <button onClick={() => {
                    removeCarFromGarage(props.id)
                }}>Remove
                </button>
            </div>
            <span className={s.carName}>{props.name}</span>
            <div className={s.road}>
                <div className={s.carInterface}>
                    <div className={s.controlPanel}>
                        <button className={s.startEngine}
                                onClick={startDrive}
                                disabled={status === "drive" || status==='stopped'? true : false}
                        >A</button>
                        
                        <button className={s.stopEngine}
                                disabled={ status === "started"  ? true : false}
                                onClick={() => stopDrive()}
                        >B</button>
                    </div>
                    <Icons name={s.carImage}
                           color={props.color}
                           size='55'
                           className='carImage'
                           position={pos}
                    />
                </div>
                <div className={s.flag}></div>
            </div>
        </>
    )
};
