import React,{useState, useEffect, createContext} from 'react'

const BillsContext = createContext();

const  BillProvider = ({children}) => {  

    const [bills,setBills] = useState([]);
    const [selectedCostInterval, setSelectedCostInterval] = useState('Monthly');
    const [editModeEnabled, setEditModeEnabled] = useState(false);

    useEffect(async() => {
        try{
            let response = await fetch('https://zen-project-1-server.herokuapp.com')
            let result = await response.json();
            
            setBills (alphabeticalOrder(result));
            
        }
        catch(err){
            alert(err)
        }
    },[setBills]);



    // useEffect(() => {
    //     console.log(bills);
     
    // },[bills])
    
    const updateBills = (bill) => {
          const updatedBills =  alphabeticalOrder([
        ...bills,
        bill
    ]);
    // localStorage.setItem('portexe-bills', JSON.stringify(updatedBills));
    setBills(updatedBills);
    };

    const alphabeticalOrder =(bills) => {
        return bills.sort((a,b) => 
        a.title.toUpperCase() < b.title.toUpperCase() ? -1 : 0);
    }

    const editBill = (billToUpdate) => {
        const billsFiltered = bills.filter((bill) => bill.title !== billToUpdate.title)
        const updatedBills = alphabeticalOrder([
            ...billsFiltered,
            billToUpdate
        ]); 
        // localStorage.setItem('portexe-bills', JSON.stringify(updatedBills));
        setBills(updatedBills);
    };

    const deleteBill = (billToDelete) => {
        const updatedBills = bills.filter((bill) => bill.title !== billToDelete.title)
        // localStorage.setItem('portexe-bills', JSON.stringify(updatedBills));
        setBills(updatedBills);
    };

    return (
     <BillsContext.Provider value = {{
         bills,
         updateBills,
         editBill,
         selectedCostInterval,
         setSelectedCostInterval,
         editModeEnabled,
         setEditModeEnabled,
         deleteBill,
         alphabeticalOrder
     }}>
         {children}
     </BillsContext.Provider>
    )
}

export {BillsContext, BillProvider}
