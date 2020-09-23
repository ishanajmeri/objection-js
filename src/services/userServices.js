import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + '/users';

function userUrl(id) {
  return `${apiEndpoint}/${id}`;
}
export function register(user) {
  return http.post(apiEndpoint, {
    name: user.name,
    number: user.number,
  });
}

export function getUsers() {
  return http.get(apiEndpoint);
}

export function getUser(userId) {
  return http.get(userUrl(userId));
}
export function deleteUser(userId) {
  return http.delete(userUrl(userId));
}

export function saveUser(user) {
  if (user._id) {
    const body = { ...user };
    delete body._id;
    return http.put(userUrl(user._id), body);
  }
  return http.post(apiEndpoint, user);
}
