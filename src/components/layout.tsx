import React, { useState } from 'react';
import { Link } from 'gatsby';
import { HistoryLocation } from '@reach/router';

/**
 * ナビゲーションのメニュー
 */
interface NavMenuProps {
  open: boolean;
}

const NavMenu: React.FC<NavMenuProps> = ({ open }) => {
  return (
    <div id="navMenu" className={`navbar-menu ${open && 'is-active'}`}>
      <div
        className="navbar-start has-text-centered"
        style={{ flexGrow: 1, justifyContent: 'center' }}
      >
        <Link className="navbar-item is-hoverable" to="/">
          ホーム
        </Link>
        <Link className="navbar-item is-hoverable" to="/daily">
          日記
        </Link>
        <Link className="navbar-item is-hoverable" to="/dev">
          開発
        </Link>
        <Link className="navbar-item is-hoverable" to="/life-hack">
          ライフハック
        </Link>
      </div>
    </div>
  );
};

/**
 * ハンバーガーメニュー
 */
interface HamburgerMenuProps {
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
  open: boolean;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ onClick, open }) => {
  return (
    <div
      className={`navbar-burger burger ${open && 'is-active'}`}
      data-target="navMenu"
      onClick={onClick}
    >
      <span />
      <span />
      <span />
    </div>
  );
};

type LayoutProps = {
  location: HistoryLocation;
  title: string;
};

/**
 * レイアウトコンポーネント
 */
const Layout: React.FC<LayoutProps> = ({ location, title, children }) => {
  const header = (
    <h1 className="main-heading">
      <Link to="/">{title}</Link>
    </h1>
  );

  const intialState = false;
  const [open, setOpen] = useState(intialState);
  const toggle = () => setOpen(!open);

  return (
    <div className="global-wrapper">
      <nav>
        <div className="navbar-brand container">
          {header}
          <HamburgerMenu onClick={toggle} open={open} />
        </div>

        <NavMenu open={open} />
      </nav>
      <main>{children}</main>
      <div className="container">
        <footer>&copy; {new Date().getFullYear()}, FooQoo.</footer>
      </div>
    </div>
  );
};

export default Layout;
