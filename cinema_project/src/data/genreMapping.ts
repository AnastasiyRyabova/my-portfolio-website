import adventureImage from '../image/adventure-image.jpg';
import dramaImage from '../image/drama-image.jpg';
import thrillerImage from '../image/thriller-image.jpg';
import comedyImage from '../image/comedy-image.jpg';
import scienceFictionImage from '../image/science-fiction-image.jpg';
import historicalImage from '../image/historical-image.jpg';
import detectiveImage from '../image/detective-image.jpg';
import familyImage from '../image/family-image.jpg';

export interface GenreMapping {
  [key: string]: { russian: string; img: string };
}

export const genreMapping: GenreMapping = {
  'adventure': { russian: 'Приключения', img: adventureImage },
  'drama': { russian: 'Драма', img: dramaImage },
  'thriller': { russian: 'Триллер', img: thrillerImage },
  'comedy': { russian: 'Комедия', img: comedyImage },
  'scifi': { russian: 'Научная фантастика', img: scienceFictionImage },
  'fantasy': { russian: 'Фэнтези', img: adventureImage },
  'history': { russian: 'Историческое', img: historicalImage },
  'mystery': { russian: 'Детектив', img: detectiveImage },
  'family': { russian: 'Семейное', img: familyImage },
  'horror': { russian: 'Ужасы', img: thrillerImage },
  'stand-up': { russian: 'Стендап', img: comedyImage },
  'romance': { russian: 'Романтика', img: familyImage },
  'music': { russian: 'Музыка', img: comedyImage },
  'crime': { russian: 'Криминал', img: thrillerImage },
  'tv-show': { russian: 'ТВ-шоу', img: familyImage },
  'documentary': { russian: 'Документальное', img: detectiveImage },
  'action': { russian: 'Боевик', img: detectiveImage },
  'biography': { russian: 'Биография', img: detectiveImage },
  'animation': { russian: 'Анимация', img: familyImage },
  'war': { russian: 'Военное', img: historicalImage },
  'western': { russian: 'Вестерн', img: adventureImage },
  'sport': { russian: 'Спорт', img: familyImage },
  'musical': { russian: 'Мюзикл', img: familyImage },
  'film-noir': { russian: 'Фильм-нуар', img: detectiveImage },
  'short': { russian: 'Короткометражка', img: comedyImage },
  'news': { russian: 'Новости', img: historicalImage },
  'reality-tv': { russian: 'Реалити-шоу', img: familyImage },
  'talk-show': { russian: 'Ток-шоу', img: familyImage },
  'game-show': { russian: 'Игровое шоу', img: familyImage }
};
