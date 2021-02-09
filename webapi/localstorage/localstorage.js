export const saveArrayInLocalStorage = (groceries) => {
  const groceriesString = JSON.stringify(groceries);
  localStorage.setItem('groceries', groceriesString);
}

export const getArrayFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  if(!data) return [];

  return JSON.parse(data);
}