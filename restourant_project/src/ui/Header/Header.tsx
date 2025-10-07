import LogoIcon from '../../assets/stair.svg?react'

export default function Header() {
  return (
        <header>
            <div className="logo">
              <LogoIcon width={16} height={16} className="logo__icon" />
              <span>Eats</span>
            </div>
            <div className="profile">
              <img alt="profile" src="/avatar.png" />
            </div>
          </header>
  )
}
