import top1 from '../image/top-item-1.png';
import top2 from '../image/top-item-2.png';
import top3 from '../image/top-item-3.png';
import top4 from '../image/top-item-4.png';
import top5 from '../image/top-item-5.png';
import top6 from '../image/top-item-6.png';
import top7 from '../image/top-item-7.png';
import top8 from '../image/top-item-8.png';
import top9 from '../image/top-item-9.png';
import top10 from '../image/top-item-10.png';
import star from '../image/star.png';
import film from '../image/film-img.png';

export interface Card {
  id: number;
  img: string;
  year: number;
  time: string;
  rating: string;
  ratingImage: string;
  genre: string;
  name: string;
  imform: string;
  language: string;
  budget: string;
  revenue: string;
  director: string;
  production: string;
  awards: string;
  trailerUrl: string;
}

const cards: Card[] = [
  {
    id: 1,
    img: top1,
    year: 1998,
    time: '1 ч 7 мин',
    rating: '7,5',
    ratingImage: star,
    genre: 'Приключения',
    name: 'Беспринципные',
    imform: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident fugit sapiente corrupti deserunt reiciendis reprehenderit laboriosam dolor amet totam similique, tenetur, autem impedit dignissimos dolorum. Facere enim officiis saepe facilis.',
    language: 'Русский',
    budget: '250 000 руб.',
    revenue: '2 835 000 руб.',
    director: 'Игорь Масленников',
    production: 'Ленфильм',
    awards: 'Топ-250, 33 место',
    trailerUrl: 'https://www.youtube.com/embed/example_trailer',
  },
  {
    id: 2,
    img: top2,
    year: 1998,
    time: '1 ч 7 мин',
    rating: '7,5',
    ratingImage: star,
    genre: 'Драма',
    name: 'Воздух',
    imform: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident fugit sapiente corrupti deserunt reiciendis reprehenderit laboriosam dolor amet totam similique, tenetur, autem impedit dignissimos dolorum. Facere enim officiis saepe facilis.',
    language: 'Русский',
    budget: '250 000 руб.',
    revenue: '2 835 000 руб.',
    director: 'Игорь Масленников',
    production: 'Ленфильм',
    awards: 'Топ-250, 33 место',
    trailerUrl: 'https://www.youtube.com/embed/example_trailer',
  },
  {
    id: 3,
    img: top3,
    year: 1998,
    time: '1 ч 7 мин',
    rating: '7,5',
    ratingImage: star,
    genre: 'Драма',
    name: 'Лёд 3',
    imform: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident fugit sapiente corrupti deserunt reiciendis reprehenderit laboriosam dolor amet totam similique, tenetur, autem impedit dignissimos dolorum. Facere enim officiis saepe facilis.',
    language: 'Русский',
    budget: '250 000 руб.',
    revenue: '2 835 000 руб.',
    director: 'Игорь Масленников',
    production: 'Ленфильм',
    awards: 'Топ-250, 33 место',
    trailerUrl: 'https://www.youtube.com/embed/example_trailer',
  },
  {
    id: 4,
    img: top4,
    year: 1998,
    time: '1 ч 7 мин',
    rating: '4,0',
    ratingImage: star,
    genre: 'Триллер',
    name: 'Внутри убийцы',
    imform: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident fugit sapiente corrupti deserunt reiciendis reprehenderit laboriosam dolor amet totam similique, tenetur, autem impedit dignissimos dolorum. Facere enim officiis saepe facilis.',
    language: 'Русский',
    budget: '250 000 руб.',
    revenue: '2 835 000 руб.',
    director: 'Игорь Масленников',
    production: 'Ленфильм',
    awards: 'Топ-250, 33 место',
    trailerUrl: 'https://www.youtube.com/embed/example_trailer',
  },
  {
    id: 5,
    img: top5,
    year: 1998,
    time: '1 ч 7 мин',
    rating: '7,5',
    ratingImage: star,
    genre: 'Семейное',
    name: 'Папины дочки',
    imform: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident fugit sapiente corrupti deserunt reiciendis reprehenderit laboriosam dolor amet totam similique, tenetur, autem impedit dignissimos dolorum. Facere enim officiis saepe facilis.',
    language: 'Русский',
    budget: '250 000 руб.',
    revenue: '2 835 000 руб.',
    director: 'Игорь Масленников',
    production: 'Ленфильм',
    awards: 'Топ-250, 33 место',
    trailerUrl: 'https://www.youtube.com/embed/example_trailer',
  },
  {
    id: 6,
    img: top6,
    year: 1998,
    time: '1 ч 7 мин',
    rating: '7,5',
    ratingImage: star,
    genre: 'Комедия',
    name: 'Холоп 2',
    imform: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident fugit sapiente corrupti deserunt reiciendis reprehenderit laboriosam dolor amet totam similique, tenetur, autem impedit dignissimos dolorum. Facere enim officiis saepe facilis.',
    language: 'Русский',
    budget: '250 000 руб.',
    revenue: '2 835 000 руб.',
    director: 'Игорь Масленников',
    production: 'Ленфильм',
    awards: 'Топ-250, 33 место',
    trailerUrl: 'https://www.youtube.com/embed/example_trailer',
  },
  {
    id: 7,
    img: top7,
    year: 1998,
    time: '1 ч 7 мин',
    rating: '7,0',
    ratingImage: star,
    genre: 'Комедия',
    name: 'Три богатыря и пуп Земли',
    imform: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident fugit sapiente corrupti deserunt reiciendis reprehenderit laboriosam dolor amet totam similique, tenetur, autem impedit dignissimos dolorum. Facere enim officiис saepe facilis.',
    language: 'Русский',
    budget: '250 000 руб.',
    revenue: '2 835 000 руб.',
    director: 'Игорь Масленников',
    production: 'Ленфильм',
    awards: 'Топ-250, 33 место',
    trailerUrl: 'https://www.youtube.com/embed/example_trailer',
  },
  {
    id: 8,
    img: top8,
    year: 1998,
    time: '1 ч 7 мин',
    rating: '1,5',
    ratingImage: star,
    genre: 'Комедия',
    name: 'Инспектор Гаврилов',
    imform: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident fugit sapiente corrupti deserunt reiciendis reprehenderit laboriosam dolor amet totam similique, tenetur, autem impedit dignissimos dolorum. Facere enim officiis saepe facilis.',
    language: 'Русский',
    budget: '250 000 руб.',
    revenue: '2 835 000 руб.',
    director: 'Игорь Масленников',
    production: 'Ленфильм',
    awards: 'Топ-250, 33 место',
    trailerUrl: 'https://www.youtube.com/embed/example_trailer',
  },
  {
    id: 9,
    img: top9,
    year: 1998,
    time: '1 ч 7 мин',
    rating: '6,3',
    ratingImage: star,
    genre: 'Фантастика',
    name: 'Шифр',
    imform: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident fugit sapiente corrupti deserunt reiciendis reprehenderit laboriosam dolor amet totam similique, tenetur, autem impedit dignissimos dolorum. Facere enim officiис saepe facilis.',
    language: 'Русский',
    budget: '250 000 руб.',
    revenue: '2 835 000 руб.',
    director: 'Игорь Масленников',
    production: 'Ленфильм',
    awards: 'Топ-250, 33 место',
    trailerUrl: 'https://www.youtube.com/embed/example_trailer',
  },
  {
    id: 10,
    img: top10,
    year: 1998,
    time: '1 ч 7 мин',
    rating: '7,1',
    ratingImage: star,
    genre: 'Историческое',
    name: 'Командир',
    imform: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident fugit sapiente corrupti deserunt reiciendis reprehenderit laboriosam dolor amet totam similique, tenetur, autem impedit dignissimos dolorum. Facere enim officiис saepe facilis.',
    language: 'Русский',
    budget: '250 000 руб.',
    revenue: '2 835 000 руб.',
    director: 'Игорь Масленников',
    production: 'Ленфильм',
    awards: 'Топ-250, 33 место',
    trailerUrl: 'https://www.youtube.com/embed/example_trailer',
  },
  {
    id: 11,
    img: film,
    year: 1998,
    time: '1 ч 7 мин',
    rating: '7,5',
    ratingImage: star,
    genre: 'Детектив',
    name: 'Шерлок Холмс и доктор Ватсон: Знакомство',
    imform: 'Увлекательные приключения самого известного сыщика всех времен',
    language: 'Русский',
    budget: '250 000 руб.',
    revenue: '2 835 000 руб.',
    director: 'Игорь Масленников',
    production: 'Ленфильм',
    awards: 'Топ-250, 33 место',
    trailerUrl: 'https://www.youtube.com/embed/example_trailer',
  }
];

export default cards;
