export const apiRepository = [
    {
      endpoint: {
        url: '/api/books',
        params: ['author', 'title'],
        response: ['price', 'available'],
      },
    },
    {
      endpoint: {
        url: '/api/book-notes',
        params: ['author', 'title'],
        response: ['price', 'available'],
      },
    },
    {
      endpoint: {
        url: '/api/articles',
        params: ['author', 'title'],
        response: ['price', 'available'],
      },
    },
    {
      endpoint: {
        url: '/api/knowledge-base',
        params: ['author', 'title'],
        response: ['price', 'available'],
      },
    },
    {
      endpoint: {
        url: '/api/knowledge-bank',
        params: ['author', 'title'],
        response: ['price', 'available']
      },
    },
  ];