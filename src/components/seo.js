import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"; // SEO Description

function SEO({ description, title, children }) {
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                        author
                        keywords
                    }
                }
            }        
            
        `
    )
    const keywords = site.siteMetadata.keywords
    const metaDescription = description || site.siteMetadata.description
    const defaultTitle = site.siteMetadata.title


    SEO.defaultProps = {
        lang: 'en',
        meta: [],
        description: '',
    }

    SEO.propTypes = {
        description: PropTypes.string,
        lang: PropTypes.string,
        meta: PropTypes.arrayOf(PropTypes.object),
        title: PropTypes.string.isRequired,
    }
    return (
        <>
            <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
            <meta name="description" content={metaDescription} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={metaDescription}/>
            <meta property="og:keywords" content={keywords}/>
            <meta property="og:type" content="website"/>


        </>

    )
    
}

export default SEO