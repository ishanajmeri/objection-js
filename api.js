// 'use strict';

const Person = require('./models/Person');
const Movie = require('./models/Movie');

module.exports = (router) => {
  router.post('/persons', async (ctx) => {
    await Person.transaction(async (trx) => {
      const insertedGraph = await Person.query(trx)
        // For security reasons, limit the relations that can be inserted.
        // .allowGraph('[pets, children.[pets, movies], movies, parent]')
        .insertGraph(ctx.request.body);
      ctx.body = insertedGraph;
      return insertedGraph;
    });
  });

  router.get('/persons', async (ctx) => {
    const query = Person.query();

    // You can uncomment the next line to see the SQL that gets executed.
    // query.debug()
    ctx.body = await query;
  });

  router.patch('/persons/:id', async (ctx) => {
    const numUpdated = await Person.query()
      .findById(ctx.params.id)
      .patch(ctx.request.body);

    ctx.body = {
      success: numUpdated === 1,
    };
  });

  router.delete('/persons/:id', async (ctx) => {
    const numDeleted = await Person.query().findById(ctx.params.id).delete();

    ctx.body = {
      success: numDeleted === 1,
    };
  });

  router.post('/persons/:id/children', async (ctx) => {
    const personId = parseInt(ctx.params.id);
    const child = await Person.relatedQuery('children')
      .for(personId)
      .insert(ctx.request.body);

    ctx.body = child;
  });

  router.get('/persons/:id/children', async (ctx) => {
    const query = Person.relatedQuery('children').for(ctx.params.id);

    ctx.body = await query;
  });
};
