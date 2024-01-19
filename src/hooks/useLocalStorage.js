const useLocalStorage = (key) => {
  const setItem = (value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  };
  const getItem = () => {
    const user = JSON.parse(window.localStorage.getItem(key));
    return user ? user : undefined;
  };
  const removeItem = () => {
    window.localStorage.removeItem(key);
  };
  return { setItem, getItem, removeItem };
};

export default useLocalStorage;
