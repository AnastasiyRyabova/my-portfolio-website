export const formatName = (name: string) => {
  if (!name || name.includes('script')) {
    return 'Вкусная пицца ❤️'
  }

  return name[0].toUpperCase() + name.slice(1);
}