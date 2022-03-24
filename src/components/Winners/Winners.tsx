import s from './Winners.module.css';
import React from "react";
import axios from "axios";
import {Icons} from "../Icons/Icons";
import upArrow from '../../assets/up-arrow.svg';
import downArrow from '../../assets/down-arrow.svg';



export type IWinner={
    id: number,
    wins: number,
    time: number,
    name:string,
    color:string
}

type test = 'id' | 'wins' | 'time'

export type StateType = {
    sortingOrder: string
    sortField: string
}

class Winners extends React.Component<any, StateType> {
   state : StateType={
        sortingOrder:'DESC',
        sortField:'id'
    }

    getWinners(){
        axios.get(`http://127.0.0.1:3000/winners?_page=${this.props.currentPage}&_limit=10`)
            .then(res => {
                let winnersArray = res.data;               
                let totalCount = res.headers[`x-total-count`];
                
                this.props.setTotalCount(totalCount)
                this.props.setWinners(winnersArray)    
            });
    }

    componentDidMount(): void {
        this.getWinners();
    }

 
    onPageChanged = ( currentPage: number) => {
       
        this.props.setCurrentPage( currentPage);
        axios.get(`http://127.0.0.1:3000/winners?_page=${currentPage}&_limit=10`)
            .then(res => {
               this.getWinners();
            })
    }

    onSort(sortField: test){
        let sortingOrder = this.state.sortingOrder;

        if(sortingOrder === 'ASC'){
            sortingOrder ='DESC';
            this.setState({sortingOrder: 'DESK'})
        } else {
            sortingOrder = 'ASC'
            this.setState({sortingOrder: 'ASC'})
        }

         this.setState({sortField});
        axios.get(`http://127.0.0.1:3000/winners?_page=${this.props.currentPage}&_limit=10&_sort=${sortField}&_order=${sortingOrder}`)
        .then(res => {
            this.props.setWinners(res.data)  
        });
    }


    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        
        let pagesCount = Math.ceil(this.props.totalCount / this.props.pageSize);
        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

        const renderWins = () => {
            return this.props.allWinners.allWinners.map((winner: IWinner, i: number) => (
            <tr key={i}>
                <td>{winner.id}</td>
                <td className={s.carPlace}>
                    <Icons  name={s.carImage}
                            color={winner.color}
                            size='40'
                            className={s.carWinnerImage}/>
                </td>
                <td>{winner.name}</td>
                {<td>{winner.wins}</td>}
                {<td>{winner.time}</td>}
            </tr>
        ))
        }
        

        return (
            <div className={s.garage}>
                <h1>Winners: # {this.props.totalCount}</h1>
                <h2> page: {this.props.currentPage}</h2>
                <div className={s.winnerContainer}>
                    <table>
                        <thead>
                        <tr>
                        <th onClick={()=>this.onSort("id")}>Number{this.state.sortingOrder === 'ASC' && this.state.sortField === "id" ? <img src={upArrow} alt="arrow" className={s.arrow} /> : <img src= {downArrow} alt="arrow" className={s.arrow} /> }</th>
                        <th>Car</th>
                        <th>Name</th>
                        <th onClick={()=>this.onSort('wins')}>Wins{this.state.sortingOrder === 'ASC' && this.state.sortField === "wins" ? <img src={upArrow} alt="arrow" className={s.arrow} /> : <img src= {downArrow} alt="arrow" className={s.arrow} /> }</th>
                        <th onClick={()=>this.onSort('time')}>Best score{this.state.sortingOrder === 'ASC' && this.state.sortField === "time" ? <img src={upArrow} alt="arrow" className={s.arrow} /> : <img src= {downArrow} alt="arrow" className={s.arrow} /> }</th>
                        </tr>
                        </thead>
                        <tbody>
                        {renderWins()}
                        </tbody>
                    </table>
                </div>
                <div className={s.pagination}>
                    {pages.map((p, i) => {
                        return <button key={i}
                                       className={this.props.currentPage === p ? s.selectedPage : ""}
                                       onClick={()=>this.onPageChanged(p)}
                        >{p}</button>
                    })}

                </div>
            </div>
        );
    }
}
export default Winners;
