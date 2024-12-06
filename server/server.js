import express from 'express';
import cors from 'cors';

const app = express();
const port = 3004;

const mockData = {
    '/api/books': {
      author: {
        'J.R.R. Tolkien': { 
          price: '15.00', // Price for all books by J.R.R. Tolkien
          available: true  // All books by J.R.R. Tolkien are available
        },
        'Stephen King': { 
          price: '12.50', // Price for all books by Stephen King
          available: false // All books by Stephen King are currently unavailable
        },
      },
      title: {
        'The Hobbit': { 
          price: 10.99, 
          available: true 
        },
        'It': { 
          price: 12.99, 
          available: true 
        },
      }
    },
    '/api/book-notes': {
      author: {
        'Jane Austen': { 
          price: '5.00',  // Price for all book notes by Jane Austen
          available: true  // All book notes by Jane Austen are available
        }
      },
      title: {
        'Pride and Prejudice Notes': { 
          price: 4.99, 
          available: true 
        }
      }
    }
};

let queries = [];

app.use(express.json());
app.use(cors());


app.post('/api/queries', (req, res) => {
  const newQuery = req.body;
  queries.push(newQuery);
  res.status(201).json(newQuery); 
});

app.get('/api/queries', (req, res) => {
    const results = queries.map(query => {
      const {endpoint, param, paramValue, responseAttr } = query;
      let data = {}; 
      if (endpoint in mockData) {
        const apiMockData = mockData[endpoint];
        if (param in apiMockData && paramValue in apiMockData[param]) {
          data = apiMockData[param][paramValue]; 
        }
      }
       
      const extractedData = Array.isArray(responseAttr) 
        ? responseAttr.map(attr => data[attr]) 
        : [data[responseAttr]];
      return {
        queryName: query.name,
        data: extractedData,
        inteval: query.interval
      };
    });
    res.json(results);
  });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});