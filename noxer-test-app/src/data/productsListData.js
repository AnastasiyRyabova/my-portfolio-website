import image1 from '../image/image1.png';
import image2 from '../image/image2.png';
import image3 from '../image/image3.png';
import image4 from '../image/image4.png';
import image5 from '../image/image5.png';
import image6 from '../image/image6.png';

const productsListData = [
  {
    id: 1,
    image: image1,
    name: "Футболка мужская Комары",
    price: 9990,
    discountPercent: 30,
    get discountPrice() {
      return this.discountPercent ? Math.round(this.price - (this.price * this.discountPercent / 100)) : this.price;
    },
    hit:  "HIT",
    sele: "SELE",
   
  },
  {
    id: 2,
    image: image2,
    name: "Свитшот женский укороченный Yamal est.2017",
    price: 3000,
    discountPercent: 10,
    get discountPrice() {
      return this.discountPercent ? Math.round(this.price - (this.price * this.discountPercent / 100)) : this.price;
    },
    vip: "ПРЕМИУМ"
  },
  {
    id: 3,
    image: image3,
    name: "Шапка Yamal комбинация с бумбоном",
    price: 1550,
    discountPercent: null,
    get discountPrice() {
      return this.discountPercent ? Math.round(this.price - (this.price * this.discountPercent / 100)) : this.price;
    },
    new: "NEW",
  },
  {
    id: 4,
    image: image4,
    name: "Брелок фирменный «Созвездие»",
    price: 800,
    discountPercent: 20,
    get discountPrice() {
      return this.discountPercent ? Math.round(this.price - (this.price * this.discountPercent / 100)) : this.price;
    },
    sele: "SELE"
  },
  {
    id: 5,
    image: image5,
    name: "Шорты мужские Yamal",
    price: 3850,
    discountPercent: null,
    get discountPrice() {
      return this.discountPercent ? Math.round(this.price - (this.price * this.discountPercent / 100)) : this.price;
    },
    new: "NEW"
  },
  {
    id: 6,
    image: image6,
    name: "Сертификат Yamal 10000",
    price: 10000,
    discountPercent: null,
    get discountPrice() {
      return this.discountPercent ? Math.round(this.price - (this.price * this.discountPercent / 100)) : this.price;
    },
    vip: "ПРЕМИУМ"
  }
];

export default productsListData;
