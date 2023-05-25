export const setLocalStorageData = (key, item) => {
    localStorage.setItem(`${key}`, JSON.stringify(item));
  };
  
  export const getLocalStorageData=(key)=>{
   return JSON.parse(localStorage.getItem(key))
  }
  