import React, {useContext} from 'react'
import {BillsContext} from '../context/BillContext'
const  BillOptions = () => {

    const {selectedCostInterval, setSelectedCostInterval} = useContext(BillsContext);

    return (
        <div className="interval-options-container">

            <div className={selectedCostInterval === 'Daily' ? 'selected-interval' : 'interval'} 
            onClick = {((e)=> setSelectedCostInterval(e.target.innerText))}>
              Daily
            </div>

            <div className={selectedCostInterval === 'Monthly' ? 'selected-interval' : 'interval'}
             onClick = {((e)=> setSelectedCostInterval(e.target.innerText))}>
              Monthly
            </div>

            <div className={selectedCostInterval === 'Yearly' ? 'selected-interval' : 'interval'}
             onClick = {((e)=> setSelectedCostInterval(e.target.innerText))}>
               Yearly
            </div>
            
        </div>
    )
}

export default BillOptions
