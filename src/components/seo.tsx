/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

interface SeoProps {
  description?: string;
  lang?: string;
  meta?: any[];
  title: string;
}

/**
 * SEOコンポーネント
 */
const SEO: React.FC<SeoProps> = ({ description, lang, meta, title }) => {
  const { site } = useStaticQuery<GatsbyTypes.SeoQuery>(graphql`
    query Seo {
      site {
        siteMetadata {
          title
          description
          social {
            twitter
          }
          image
        }
      }
    }
  `);

  const metaDescription = description || site?.siteMetadata?.description;
  const defaultTitle = site?.siteMetadata?.title;
  const image = site?.siteMetadata?.image;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={defaultTitle}
      titleTemplate={title ? `${title} | %s` : undefined}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: image,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site?.siteMetadata?.social?.twitter || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta || [])}
    >
      <script src="/js/v1610187143/twitterUniversalTag_a2u97q.js" />
    </Helmet>
  );
};

SEO.defaultProps = {
  lang: `ja`,
  meta: [],
  description: ``,
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default SEO;
