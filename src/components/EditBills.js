import React, {useContext} from 'react'
import {BillsContext} from '../context/BillContext'



const EditBills = () => {
    
    const  {bills,alphabeticalOrder, setEditModeEnabled, editBill, deleteBill} = useContext(BillsContext);
    
    // const inputChangedHandler = (event, bill) => {
    //     bill.monthlyCost = event.target.value;
    //     // May be call for search result
    // }
    return (
        
        <div className="edit-bill-container">
        <h6 className='edit-mode-done-btn' onClick={() => setEditModeEnabled(false)}>
        Done
        </h6>
        {
            bills.map((bill, billIndex) => {

                // let monthlyCost = bill.month;

                return (
                    <div key={billIndex} className="edit-bill-row">
                    <div className="edit-bill-row-content">
                    <div className="edit-bill-title">{bill.title}</div>
                    <input className="edit-bill-cost-input" type="number"
                    // value={bill.monthlyCost}
                    onChange={(event)=>{
                        bill.monthlyCost = event.target.value;
                    }}
                    ></input>
                    <h6 onClick={async(e) => {
                        console.log('bills =>', bill.monthlyCost)
                        if(bill._id !== undefined){  
                            try{
                                console.log(bill);
                                console.log(bill._id);
                                
                                let response = await fetch(`https://zen-project-1-server.herokuapp.com/update-bill/${bill._id}`, {
                                corsDomain: true,
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json;charset=utf-8'
                                },
                                body: JSON.stringify({
                                    title: bill.title,
                                    monthlyCost: bill.monthlyCost,
                                    enabled: bill.enabled
                                })
                            });
                            
                            let result = await response.json();
                            alert(result.message);
                            editBill({
                                _id: bill._id,
                                title: bill.title,
                                enabled: bill.enabled,
                                monthlyCost: bill.monthlyCost
                            }) 
                        }
                        catch(err){
                            alert(err);
                        }}
                        
                    }} className="update-button">UPDATE</h6>
                    <h6 onClick={async()=>{
                        try{
                            let response = await fetch(`https://zen-project-1-server.herokuapp.com/delete-bill/${bill._id}`, {
                            corsDomain: true,
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8'
                            }
                            
                        });
                        
                        let result = await response.json();
                        alert(result.message);
                        
                        deleteBill(bill);
                    }
                    catch(err){
                        alert(err);
                    }
                }} 
                className="delete-button" >DELETE</h6>
                </div>
                <hr></hr>
                </div>
                )
            })
        }
        </div>
        )
    }
    
    export default EditBills
    