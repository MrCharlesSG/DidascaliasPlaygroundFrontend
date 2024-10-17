import userStore from '@/store/useUserStore';
const store = userStore();
const logOut = store.logout;


export const tokenHeaders = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
  }
}

export function handleFetchError(error) {
  let errorString = error.toString();

  if (errorString.includes('401')) {
    logOut();
    window.location.reload();
  }
}