import React from 'react'
import './Footer.css'

import telegranIcon from '../../image/footer-tg.svg'
import home from '../../image/home.svg'
import like from '../../image/like-off.svg'
import catalog from '../../image/catalog.svg'
import cart from '../../image/cart.svg'
import account from '../../image/account.svg'

export default function Footer() {
  return (
    <footer className='footer'>
        <div className='footer__inform'>
            <p className='footer__descr'>Разработано на платформе Noxer</p>
            <a className='footer__link' href="https://t.me/noxer_test_channel" target="_blank" rel="noopener noreferrer">
                <img className='footer__tg-img' src={telegranIcon} alt='Telegram'></img>
                noxerai_bot
            </a>
        </div>
        <div className='footer__menu munu'>
            <div className='mune__link'>
                <img className='menu__image' src={home} alt='Home'></img>
                <img className='menu__image' src={catalog} alt='Catalog'></img>
                <img className='menu__image' src={like} alt='Favorite'></img>
                <img className='menu__image' src={cart} alt='Cart'></img>
                <img className='menu__image' src={account} alt='Account'></img>
            </div>
        </div>
    </footer>
  )
}
