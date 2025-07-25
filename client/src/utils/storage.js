const getStorage = (type = 'session') => {
  return type === 'local' ? localStorage : sessionStorage;
};

export const saveUser = (user, type = 'session') => {
  getStorage(type).setItem('user', JSON.stringify(user));
};

export const getUser = () => {
  const sessionUser = sessionStorage.getItem('user');
  const localUser = localStorage.getItem('user');
  return sessionUser ? JSON.parse(sessionUser) : localUser ? JSON.parse(localUser) : null;
};

export const clearUser = () => {
  sessionStorage.removeItem('user');
  localStorage.removeItem('user');
};
