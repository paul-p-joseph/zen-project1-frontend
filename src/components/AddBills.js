import React,{useContext, useState} from 'react'
import {BillsContext} from '../context/BillContext';

const AddBills = () => {

    const [newBillTitle, setNewBillTitile] = useState('');
    const [newBillCost, setNewBillCost] = useState('');

    const {updateBills} = useContext(BillsContext);

    const billObjectValid = () => {
        const costValid = newBillCost && Number.parseInt(newBillCost);

        const titleValid = newBillTitle && newBillTitle.split('').find(char => char !== ' ');
        return titleValid && costValid;
    }
     
    const clearForm = () => {
        setNewBillCost('');
        setNewBillTitile('');
    }

    return (
        <div className="add-bill-container">
            
             <input className="add-bill-form-control from-control"
              placeholder="Enter Bill Title" type="text" value={newBillTitle}
              onChange={(e) => setNewBillTitile(e.target.value)}></input>
             <input className="add-bill-form-control from-control"
              placeholder="Enter Bill Monthly Cost" type="number" value={newBillCost}
              onChange={(e) => setNewBillCost(e.target.value)}></input>
              <button className="add-bill-form-control btn btn-primary" onClick={async()=>{
                  if(billObjectValid()) {
                    try{
                        let response = await fetch('https://zen-project-1-server.herokuapp.com/create-bill', {
                            corsDomain: true,
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json;charset=utf-8'
                            },
                            body: JSON.stringify({
                                title: newBillTitle,
                                monthlyCost: newBillCost,
                                enabled: true
                            })
                          });
                          
                          let result = await response.json();
                          alert(result.message);

                          updateBills({
                            title: newBillTitle,
                            monthlyCost: newBillCost,
                            enabled: true
                        });
                         clearForm();
                    }
                    catch{
                      
                    }
                    
                  }
              }}>Add Bill</button>
        </div>
    )
}

export default AddBills
