import React from 'react';
import { graphql } from 'gatsby';
import { PageProps } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Profile from '../components/profile';
import BlogListItem from '../components/blog-list-item';

/**
 * 記事一覧ページ
 */
const BlogIndex: React.FC<PageProps<GatsbyTypes.BlogIndexQuery>> = ({
  data,
  location,
}) => {
  const siteTitle = data.site?.siteMetadata?.title || `Title`;
  const posts = data.allMarkdownRemark.nodes;

  // ブログにコンテンツが存在しない場合、固定の文言を表示する
  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="HOME" />
        <p>記事がありません。</p>
      </Layout>
    );
  }

  const blogList = (
    <ol style={{ listStyle: `none` }}>
      {posts.map(post => {
        return (
          <BlogListItem
            title={post.frontmatter?.title || post.fields?.slug || ''}
            link={post.fields?.slug || ''}
            date={post.frontmatter?.date || ''}
            img={post.frontmatter?.img || ''}
            innerHtml={post.frontmatter?.description || post.excerpt || ''}
          />
        );
      })}
    </ol>
  );

  const profile = (
    <div className="bio">
      <Profile />
    </div>
  );

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="" />
      <div className="container has-text-left post-list-item">
        <div className="columns">
          <div className="column is-two-thirds">
            <section>{blogList}</section>
          </div>
          <div className="column is-one-thirds">
            <section>{profile}</section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query BlogIndex {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { ne: "daily" } } }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          category
          img
        }
      }
    }
  }
`;
