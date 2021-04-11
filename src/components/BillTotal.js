import React,{useContext} from 'react'
import { BillsContext } from '../context/BillContext'

const  BillTotal = () => {

     const {bills, selectedCostInterval} = useContext(BillsContext);

     const moneyIntervalTransform = (cost) => {
 
        const monthlyCost = Number.parseFloat(cost);

         switch (selectedCostInterval) {
            
             case 'Monthly':
                 return monthlyCost;

             case 'Yearly':
                 return monthlyCost * 12;

                 case 'Weeklyy':
                    return monthlyCost * 12 / 52;
                
                    case 'Daily':
                        return monthlyCost * 12 / 365;

             default:
             return 0;
         }
     }

    return (
        <div className="total-container"> 
        <div className= 'bill-total-container'>
            {selectedCostInterval} bill cost:  
            <span className= "total-cost">
                {
                    '₹' + bills.reduce((acc, val) => {
                        return val.enabled ?
                        moneyIntervalTransform(val.monthlyCost) + acc :
                        acc;
                    }, 0).toFixed(2)
                }
            </span>
        </div>
        
        <div className="total-saved-container">
            {selectedCostInterval} Saved
         <span className="total-saved">
          {
              '₹' + bills.reduce((acc, val) => {
                return !val.enabled ?
                moneyIntervalTransform(val.monthlyCost) + acc :
                acc;
            }, 0).toFixed(2)
          }
         </span>
        </div>
       

        </div>

    )
}

export default BillTotal
