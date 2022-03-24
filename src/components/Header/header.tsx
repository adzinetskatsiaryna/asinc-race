//@ts-ignore
import s from './header.module.css';
import React from "react";
import {NavLink} from "react-router-dom";


type ButtonsType={

}

export const Header:React.FC<ButtonsType>=()=> {
    return (
        <div className="header">
            <header>
                <div className={s.nav}>
                    <NavLink to="/garage" className={s.btnGarage} activeClassName={s.activeLink}>to Garage </NavLink>
                    <NavLink to="/winner" className={s.btnWinner} activeClassName={s.activeLink}>to Winner </NavLink>
                </div>
            </header>
        </div>
    )
}
