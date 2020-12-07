import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

import { PageProps } from 'gatsby';

/**
 * 404ページ
 */
const NotFoundPage: React.FC<PageProps<GatsbyTypes.NotFoundQuery>> = ({
  data,
  location,
}) => {
  const siteTitle = data.site?.siteMetadata?.title || '';

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Not Found" />
      <div className="container">
        <div className="columns is-mobile is-centered has-text-centered">
          <div className="column is-two-thirds">
            <section>
              <article
                className="blog-post not-found"
                itemScope
                itemType="http://schema.org/Article"
              >
                <h1>Not Found</h1>
                <p>お探しのページは、移動または削除された可能性があります</p>
              </article>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;

export const pageQuery = graphql`
  query NotFound {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
