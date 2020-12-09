import React from 'react';
import { Link } from 'gatsby';

const ItemHeader: React.FC<{ link: string; date: string; title: string }> = ({
  link,
  date,
  title,
}) => {
  return (
    <div className="header">
      <h2>
        <Link to={link} itemProp="url">
          <span itemProp="headline">{title}</span>
        </Link>
      </h2>
      <small>{date}</small>
    </div>
  );
};

const ItemContent: React.FC<{ innerHtml: string }> = ({ innerHtml }) => {
  return (
    <p
      dangerouslySetInnerHTML={{
        __html: innerHtml,
      }}
      itemProp="description"
    />
  );
};

const ItemImage: React.FC<{ img: string }> = ({ img }) => {
  return <img src={img} alt="記事画像" className="post-list-item-image" />;
};

const BlogListItem: React.FC<{
  link: string;
  title: string;
  date: string;
  innerHtml: string;
  img: string;
}> = ({ link, title, date, innerHtml, img }) => {
  const slug = link;
  return (
    <li key={slug}>
      <article
        className="post-list-item"
        itemScope
        itemType="http://schema.org/Article"
      >
        <section className="description">
          <div className="columns is-mobile">
            <div className="column is-8-mobile is-8-desktop">
              <ItemHeader link={link} date={date} title={title} />
              <ItemContent innerHtml={innerHtml} />
            </div>
            <div className="column is-4-mobile is-4-desktop">
              <ItemImage img={img} />
            </div>
          </div>
        </section>
      </article>
    </li>
  );
};

export default BlogListItem;
