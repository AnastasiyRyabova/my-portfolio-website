import React from 'react';
import socials from '../../data/socialData';
import './Footer.css';

export default function Footer() {
  return (
    <footer className='footer'>
      <div className='footer__socials'>
        {socials.map(social => (
          <a className='footer__link' key={social.id} href="#" target="_blank" rel="noopener noreferrer">
            <img className='footer__img' src={social.img} alt={`social-${social.id}`} />
          </a>
        ))}
      </div>
    </footer>
  );
}
