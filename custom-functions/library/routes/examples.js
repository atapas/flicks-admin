'use strict';


// eslint-disable-next-line no-unused-vars,require-await
module.exports = async (server, { hdbCore, logger }) => {
  // GET, WITH NO preValidation AND USING hdbCore.requestWithoutAuthentication
  // BYPASSES ALL CHECKS: DO NOT USE RAW USER-SUBMITTED VALUES IN SQL STATEMENTS
  server.route({
    url: '/books',
    method: 'GET',
    handler: (request) => {
      logger.debug(request);
      request.body= {
        operation: 'sql',
        sql: 'SELECT * FROM library.book ORDER BY rating DESC'
      };
      return hdbCore.requestWithoutAuthentication(request);
    }
  });

  // GET the book by id
  server.route({
    url: '/books/:id',
    method: 'GET',
    handler: (request) => {
      request.body= {
        operation: 'sql',
        sql: `SELECT * FROM library.book WHERE id = '${request.params.id}'`
      };

      /*
       * requestWithoutAuthentication bypasses the standard HarperDB authentication.
       * YOU MUST ADD YOUR OWN preValidation method above, or this method will be available to anyone.
       */
      return hdbCore.requestWithoutAuthentication(request);
    }
  });

  // GET the books by topic
  server.route({
    url: '/books/by-topic',
    method: 'GET',
    handler: (request) => {
      request.body= {
        operation: 'sql',
        sql: `SELECT COUNT(id) AS numberOfBooks, topic FROM library.book GROUP BY topic`
      };

      /*
       * requestWithoutAuthentication bypasses the standard HarperDB authentication.
       * YOU MUST ADD YOUR OWN preValidation method above, or this method will be available to anyone.
       */
      return hdbCore.requestWithoutAuthentication(request);
    }
  });

  // GET the books by rating range
  server.route({
    url: '/books/by-rating',
    method: 'GET',
    handler: async (request) => {
      request.body= {
        operation: 'sql',
        sql: `SELECT * FROM library.book`
      };

      const result = await hdbCore.requestWithoutAuthentication(request);
      let obj = {
          'rating-1': 0,
          'rating-2': 0,
          'rating-3': 0,
          'rating-4': 0,
          'rating-5': 0,
      };
      result.forEach((item) => {
          if(item.rating >= 1 && item.rating < 2) {
              obj['rating-1'] = obj['rating-1'] + 1;
          } else if(item.rating >= 2 && item.rating < 3) {
              obj['rating-2'] = obj['rating-2'] + 1;
          } else if(item.rating >= 3 && item.rating < 4) {
              obj['rating-3'] = obj['rating-3'] + 1;
          } else if(item.rating >= 4 && item.rating < 5) {
              obj['rating-4'] = obj['rating-4'] + 1;
          } else if(item.rating === 5) {
              obj['rating-5'] = obj['rating-5'] + 1;
          }
          return obj;
      });
      return obj;
    }
  });

  // GET the books by pages range
  server.route({
    url: '/books/by-pages-views',
    method: 'GET',
    handler: async (request) => {
      request.body= {
        operation: 'sql',
        sql: `SELECT * FROM library.book`
      };

      const result = await hdbCore.requestWithoutAuthentication(request);
      
      return result.map(book => {
        return {'name': book.title, 'views': book.views, 'pages': book.pages}
      });
    }
  });

  
};
