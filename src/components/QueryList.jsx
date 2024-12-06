import React, { useState } from 'react';
import QueryForm from './QueryForm';

function QueryList() {
  const [queries, setQueries] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const addQuery = (newQuery) => {
    setQueries([...queries, newQuery]);
    setShowAddForm(false); 
  };

  const removeQuery = (queryName) => {
    setQueries(queries.filter(query => query.name !== queryName));
  };

  return (
    <div>
      <h3>Scheduled Queries</h3>
      <button onClick={() => setShowAddForm(true)}>Add</button>
      {showAddForm && (
        <QueryForm handleAddQuery={addQuery} onCancel={() => setShowAddForm(false)} />
      )}
      
      <ul>
        {queries.map(query => (
          <li key={query.name}>
            {query.name} - Every {query.interval} minutes
            <button onClick={() => removeQuery(query.name)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QueryList;