import vk from '../image/vk.png';
import ok from '../image/ok.png';
import telegram from '../image/telegram.png';
import youtube from '../image/youtube.png';


export interface Social {
  id: number;
  img: string;
}
const socials: Social[] = [
  { id: 1, 
    img: vk,
  },
  { id: 2, 
    img: youtube,
  },
  { id: 3, 
    img: ok,
  },
  { id: 4, 
    img: telegram,
  },
]
export default socials