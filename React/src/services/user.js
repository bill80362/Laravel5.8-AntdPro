import request from '@/utils/request';
export async function query() {
  return request('/api/users');
}
export async function queryCurrent(token) {
  return request('/api/currentUser',{
    method:"GET",//POST
    headers:{
      'Authorization' : 'Bearer '+token,
    }
  });
}
export async function queryNotices() {
  return request('/api/notices');
}
