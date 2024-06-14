import axios from 'axios';

export const httpClient = axios.create({
  baseURL: "http://localhost:3000/task"
});

const makeRequest = async (
  method,
  endpoint,
  data,
  config
) => {
  const response = await httpClient({
    method,
    url: endpoint,
    data,
    ...config
  });

  return response.data;
};

export const apiGet = (
  endpoint,
  config
) => 
  makeRequest(
    'get',
    "http://localhost:3000/tasks" + endpoint,
    undefined,
    config
  );

export const apiPost = (
  endpoint,
  data,
  config
) => 
  makeRequest('post', "http://localhost:3000/tasks" + endpoint, data, config);

export const apiPut = (
  endpoint,
  data,
  config
) => 
  makeRequest('put', "http://localhost:3000/tasks" + endpoint, data, config);

export const apiDelete = (
  endpoint,
  config
) => 
  makeRequest(
    'delete',
    "http://localhost:3000/tasks" + endpoint,
    undefined,
    config
  );

export const apiPatch = (
  endpoint,
  data,
  config
) => 
  makeRequest('patch', "http://localhost:3000/tasks" + endpoint, data, config);
