import React, { useState, useEffect } from 'react';
import axios from 'axios';

function QueryResults() {

    const [results, setResults] = useState([]);

    useEffect(() => {
    const fetchResults = async () => {
    try {
        const response = await axios.get('/api/queries');
        console.log(response);
        setResults(response.data);
    } catch (error) {
        console.error('Error fetching results:', error);
    }
};

fetchResults(); // Initial fetch

// Set up intervals for each query (after initial fetch)
results.forEach(result => {
    const { queryName, interval } = result;
    if (typeof interval === 'number' && !isNaN(interval)) {
    setInterval(() => {
       console.log(`Fetching results for ${queryName} every ${interval} minutes`);
    }, interval * 60 * 1000);
    }
});
}, [results]);

const mockQueryResults = [
{
queryName: 'Books by Tolkien',
    data: [
    { title: 'The Hobbit' },
    { title: 'The Lord of the Rings' },
    ],
},
{
    queryName: 'Books by Stephen King',
    data: [
    { title: 'It' },
    { title: 'The Shining' },
    { title: 'Misery' }
    ],
},
{
    queryName: 'Book Notes by Tolkien',
    data: [
    { title: 'Hobbit Notes' },
    { title: 'Lord of the Rings Notes' } 
    ],
},
{
    queryName: 'Articles on AI',
    data: [
    { title: 'The Impact of AI on Knowledge Work' },
    { title: 'The Future of AI in Healthcare' }
    ],
},
];
    return (
        <div>
            <h3>Query Results</h3>
           <table>
                <thead>
                <tr>
                    <th>Query Name</th>
                    <th>Result</th>
                </tr>
                </thead>
                <tbody>
                {results.map((result) => (
                    <tr key={result.queryName}>
                    <td>{result.queryName}</td>
                    <td>{result.data}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
      );
    }

export default QueryResults;
