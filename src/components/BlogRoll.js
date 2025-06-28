import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'


const BlogRollTemplate = (props) => {
  const { edges: posts } = props.data.allMarkdownRemark;
  return (
    <div className="columns is-multiline">
     {posts && posts.length > 0 ? (
  posts.map(({ node: post }) => (
    <div className="is-parent column is-6" key={post.id}>
      <article
        className={`blog-list-item tile is-child box notification ${
          post.frontmatter.featuredpost ? 'is-featured' : ''
        }`}
      >
        <header>
          {post?.frontmatter?.featuredimage && (
            <div className="featured-thumbnail">
              <PreviewCompatibleImage
                imageInfo={{
                  image: post.frontmatter.featuredimage,
                  alt: `featured image thumbnail for post ${post.frontmatter.title || 'No Article'}`,
                  width:
                    post.frontmatter.featuredimage.childImageSharp
                      .gatsbyImageData.width,
                  height:
                    post.frontmatter.featuredimage.childImageSharp
                      .gatsbyImageData.height,
                }}
              />
            </div>
          )}
          <p className="post-meta">
            <Link
              className="title has-text-primary is-size-4"
              to={post.fields.slug}
            >
              {post.frontmatter.title || 'No Article'}
            </Link>
            <span> &bull; </span>
            <span className="subtitle is-size-5 is-block">
              {post.frontmatter.date}
            </span>
          </p>
        </header>
        <p>
          {post.excerpt}
          <br />
          <br />
          <Link 
          className="button" 
          to={post.fields?.slug || '/'}
          >
            Keep Reading →
            <span className="sr-only">
              {post.frontmatter?.title ? ` tentang ${post.frontmatter.title}` : 'No Title'}
            </span>
          </Link>
        </p>
      </article>
    </div>
  ))
) : (
  <p>No Article.</p>
)}
    </div>
  )
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}


export default function BlogRoll() {
  return (
    <StaticQuery
      query={graphql`
        query BlogRollQuery {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
          ) {
            edges {
              node {
                excerpt(pruneLength: 400)
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                  templateKey
                  date(formatString: "MMMM DD, YYYY")
                  featuredpost
                  featuredimage {
                    childImageSharp {
                      gatsbyImageData(
                        width: 120
                        quality: 100
                        layout: CONSTRAINED
                      )

                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={(data, count) => <BlogRollTemplate data={data} count={count} />}
    />
  );
}
