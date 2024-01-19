const useLocalStorage = (key) => {
  const setItem = (value) => {
    window.localStorage.setItem(key, value);
  };
  const getItem = (value) => {
    window.localStorage.getItem(key);
  };
  const removeItem = (value) => {
    window.localStorage.removeItem(key);
  };
  return { setItem, getItem, removeItem };
};

export default useLocalStorage;
