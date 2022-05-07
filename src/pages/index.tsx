import * as React from "react"
import {Link, graphql} from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

export type QueryProps = {
  allContentfulProducts: {
    nodes: {
      productId: number,
      productName: string,
      productValue: string,
      createdAt: string,
    }
  },
  allContentfulUsers: {
    nodes: {
      userId: number,
      firstName: string,
      lastName: string,
      cpf: string,
      birthday: string,
    }
  },
  site: {
    siteMetadata: {
      title: string,
    }
  }
}

const BlogIndex = ({data, location}: { data: QueryProps, location: Location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const products: Array<any> | any = data.allContentfulProducts.nodes
  const users: Array<any> | any = data.allContentfulUsers.nodes

  if (products.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All Products"/>
        <Bio/>
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts"/>
      <ol style={{listStyle: `none`}}>
        {users.map((user: QueryProps['allContentfulUsers']['nodes']) => {
          const title = user.firstName + ', ' + user.lastName

          return (
            <li key={user.userId}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={user.userId.toString()} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{user.birthday}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: "",
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        allContentfulProducts {
            nodes {
                productId
                productValue
                productName
                createdAt
            }
        }
        allContentfulUsers {
            nodes {
                userId
                firstName
                lastName
                cpf
                birthday
            }
        }
    }
`
