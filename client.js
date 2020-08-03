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
  // await fetchPeople();
  // await updatePerson(matt, { age: 41 });
  // await deletePerson(matt.children[0]);
  // await insertChildForPerson(matt, {
  //   firstName: 'Isabella',
  //   lastName: 'Damon',
  //   age: 13,
  // });
  // await fetchChildren(matt.parent);
  await insertPetForPerson(matt.children[0], {
    name: 'chewy',
    species: 'hamster',
  });
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

async function deletePerson(person) {
  const { data } = await req.delete(`persons/${person.id}`);
  console.log(data);
}

async function insertChildForPerson(person, child) {
  const { data } = await req.post(`persons/${person.id}/children`, child);
  console.log(data);
}

async function fetchChildren(person) {
  await req.get(`persons/${person.id}/children`);
}

async function insertPetForPerson(person, pet) {
  const { data } = await req.post(`persons/${person.id}/pets`, pet);
  console.log(data);
}
