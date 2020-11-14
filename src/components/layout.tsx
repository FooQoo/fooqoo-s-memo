import React from 'react';
import { Link } from 'gatsby';
import { HistoryLocation } from '@reach/router';

import Bio from '../components/bio';

type LayoutProps = {
  location: HistoryLocation;
  title: string;
};

/**
 * レイアウトコンポーネント
 */
const Layout: React.FC<LayoutProps> = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;
  const header = (
    <h1 className="main-heading">
      <Link to="/">{title}</Link>
    </h1>
  );

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <hr />
      <footer>
        <Bio />© {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  );
};

export default Layout;
