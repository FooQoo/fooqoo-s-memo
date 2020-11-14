import React from 'react';
import { graphql, PageProps } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

/**
 * ブログ記事のテンプレート
 */
const BlogPostTemplate: React.FC<PageProps<
  GatsbyTypes.BlogPostBySlugQuery
>> = ({ data, location }) => {
  const post = data.markdownRemark;
  const siteTitle = data?.site?.siteMetadata?.title || `Title`;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post?.frontmatter?.title || ''}
        description={post?.frontmatter?.description || post?.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <div>
          <h1 itemProp="headline">{post?.frontmatter?.title}</h1>
          <p>{post?.frontmatter?.date}</p>
        </div>
        <section
          dangerouslySetInnerHTML={{ __html: post?.html || '' }}
          itemProp="articleBody"
        />
      </article>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
