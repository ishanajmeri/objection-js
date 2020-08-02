// 'use strict';

/**
 * This file contains a bunch of HTTP requests that use the
 * API defined in api.js.
 */

const axios = require('axios');
const qs = require('querystring');

const req = axios.create({
  baseURL: 'http://localhost:3000/',
  paramsSerializer: qs.stringify,
});

(async () => {
  const matt = await inserPersonWithRelations();
  await fetchPeople();

  await updatePerson(matt, { age: 41 });
})().catch((err) => {
  console.error('error:', err);
});

async function inserPersonWithRelations() {
  const { data: matt } = await req.post('persons', {
    firstName: 'Matt',
    lastName: 'Damon',
    age: 43,

    parent: {
      firstName: 'Kent',
      lastName: 'Damon',
      age: 70,
    },

    pets: [
      {
        name: 'Doggo',
        species: 'dog',
      },
      {
        name: 'Kat',
        species: 'cat',
      },
    ],

    movies: [
      {
        name: 'The Martian',
      },
      {
        name: 'Good Will Hunting',
      },
    ],

    children: [
      {
        firstName: 'Isabella',
        lastName: 'Damon',
        age: 13,
      },
    ],
  });

  // console.dir(matt, { depth: null });
  return matt;
}

async function fetchPeople() {
  const { data: allPeople } = await req.get('persons', {
    // params: {
    //   select: ['firstName', 'lastName'],
    //   name: 'damo',
    //   withMovieCount: true,
    //   withGraph: '[pets,children]',
    // },
  });
  // console.log(allPeople);
}

async function updatePerson(person, patch) {
  await req.patch(`persons/${person.id}`, patch);
}
