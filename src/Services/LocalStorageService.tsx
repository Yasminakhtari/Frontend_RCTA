const setItem = (key:string,value:any)=>{
    localStorage.setItem(key,JSON.stringify(value));//object stored as json string format
}

// const getItem=(key:string)=>{
//     return JSON.parse(localStorage.getItem(key) as string)//here we parsed the object
// }
const getItem = (key: string) => {
    const value = localStorage.getItem(key);
    if (!value) {
      return null; // Return null if the item doesn't exist in localStorage
    }
    try {
      return JSON.parse(value); // Parse if the value is not null
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}":`, error);
      return null; // Return null if parsing fails
    }
  };
  

const removeItem =(key:string)=>{
    localStorage.removeItem(key);
}
export {setItem,getItem,removeItem}