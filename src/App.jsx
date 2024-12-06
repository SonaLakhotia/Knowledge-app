import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import QueryForm from './components/QueryForm'
import QueryResults from './components/QueryResults';
import QueryList from './components/QueryList';

function App() {

  const [activeView, setActiveView] = useState('squeries');
  const [queries, setQueries] = useState([]);

  const handleAddQuery = () => async (newQuery) => { 
      try {
        const response = await axios.post('/api/queries', newQuery);
        console.log(response);
        setQueries([...queries, response.data]); 
      } catch (error) {
        console.error('Error saving query:', error);
    }
  };
  
  return (
    <>
      <h1>Knowledge App</h1>
      <div className="card">
        <button onClick={() => setActiveView('squeries')}>
         Scheduled Queries
        </button>
        <button onClick={() => setActiveView('queryresults')}>
         Query Results
        </button>
      </div> 
      {/* conditional rendering here */}
      {activeView === 'squeries' && (
      <div>
        <QueryList/>
      </div>
    )}
    {activeView === 'queryresults' && (
      <div>
        <QueryResults/>
      </div>
    )}

  </>
  )

}

export default App
