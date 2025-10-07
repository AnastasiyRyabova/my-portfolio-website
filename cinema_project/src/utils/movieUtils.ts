export const formatRuntime = (minutes: number): string => {
  if (!minutes) return '';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}ч ${mins}мин`;
};

export const getPrimaryGenre = (genres: string[]): string => {
  return genres.length > 0 ? genres[0] : '';
};
