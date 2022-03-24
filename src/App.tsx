import s from './app.module.css';
import {Header} from "./components/Header/header";
import React from "react";
import { Route} from 'react-router-dom';
import GarageContainer from "./components/Garage/GarageContainer";
import WinnersContainer from './components/Winners/WinnersContainer';


export const  App:React.FC<{}>=()=>{

    return (

          <div className={s.application}>

              <Header/>
              <div className={s.mainContainer}>
                  <Route path="/garage" render={()=><GarageContainer/>}/>
                  <Route path="/winner" render={()=><WinnersContainer/>}/>
              </div>
          </div>

  );
}

export default App;
