import localforage from 'localforage';

export const getUserFromIndexedDB = async () => {
  try {
    const user = await localforage.getItem('user');
    return user;
  } catch (error) {
    console.error('Failed to retrieve user from IndexedDB', error);
    return null;
  }
};
