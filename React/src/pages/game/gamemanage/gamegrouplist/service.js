import request from '@/utils/request';

export async function queryRule(params,token) {
  return request('/api/gamegroup/index', {
    params,
    headers:{
      'Authorization' : 'Bearer '+token,
    }
  });
}
export async function removeRule(params,token) {
  return request('/api/gamegroup/destroy', {
    method: 'POST',
    headers:{
      'Authorization' : 'Bearer '+token,
    },
    data: { ...params, method: 'delete' },
  });
}
export async function addRule(params,token) {
  return request('/api/gamegroup/store', {
    method: 'POST',
    headers:{
      'Authorization' : 'Bearer '+token,
    },
    data: { ...params, method: 'post' },
  });
}
export async function updateRule(params,token) {
  return request('/api/gamegroup/update', {
    method: 'POST',
    headers:{
      'Authorization' : 'Bearer '+token,
    },
    data: { ...params, method: 'update' },
  });
}
