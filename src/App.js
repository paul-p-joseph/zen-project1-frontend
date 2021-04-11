import React, {useContext} from 'react';
import AddBills from './components/AddBills';
import { BillsContext } from './context/BillContext';
import BillList from './components/BillList';
import BillOptions from './components/BillOptions';
import BillTotal from './components/BillTotal';
import EditBills from './components/EditBills'


const App = () => {

  const {editModeEnabled} = useContext(BillsContext);
    return (
      <div className="app">
        {
          editModeEnabled ? <EditBills/> : <span> <BillOptions/><AddBills/> <BillTotal/> <BillList/></span>
        }
      </div>
    );
  }


export default App;
