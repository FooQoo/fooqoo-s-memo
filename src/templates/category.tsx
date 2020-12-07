import React from 'react';
import { graphql } from 'gatsby';
import { PageProps } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Profile from '../components/profile';
import BlogListItem from '../components/blog-list-item';

/**
 * カテゴリーページ
 */
const Category: React.FC<PageProps<GatsbyTypes.CategoryQuery>> = ({
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

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="HOME" />
      <div className="container has-text-left post-list-item">
        <div className="columns">
          <div className="column is-two-thirds">
            <section>
              <ol style={{ listStyle: `none` }}>
                {posts.map(post => {
                  return (
                    <BlogListItem
                      title={post.frontmatter?.title || post.fields?.slug || ''}
                      link={post.fields?.slug || ''}
                      date={post.frontmatter?.date || ''}
                      innerHtml={
                        post.frontmatter?.description || post.excerpt || ''
                      }
                    />
                  );
                })}
              </ol>
            </section>
          </div>
          <div className="column is-one-thirds">
            <section>
              <div className="bio">
                <Profile />
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Category;

export const pageQuery = graphql`
  query Category($category: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
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
        }
      }
    }
  }
`;
