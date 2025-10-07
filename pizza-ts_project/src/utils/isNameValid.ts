export const isNameValid = (name: string) => {
  // название не должно быть пустой строкой
  if (!name.trim()) {
    return false;
  }
  
  // по требованиям, название должно состоять минимум из трех букв
  if (name.trim().length < 5) {
      return false;
  }

  return true;
};