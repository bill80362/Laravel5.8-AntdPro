import request from '@/utils/request';

export async function queryRule(params,token) {
  return request('/api/agent/index', {
    params,
    headers:{
      'Authorization' : 'Bearer '+token,
    }
  });
}
export async function removeRule(params,token) {
  return request('/api/agent/destroy', {
    method: 'POST',
    headers:{
      'Authorization' : 'Bearer '+token,
    },
    data: { ...params, method: 'delete' },
  });
}
export async function addRule(params,token) {
  return request('/api/agent/store', {
    method: 'POST',
    headers:{
      'Authorization' : 'Bearer '+token,
    },
    data: { ...params, method: 'post' },
  });
}
export async function updateRule(params,token) {
  return request('/api/agent/update', {
    method: 'POST',
    headers:{
      'Authorization' : 'Bearer '+token,
    },
    data: { ...params, method: 'update' },
  });
}
