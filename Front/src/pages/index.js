import React from "react"
import { Link } from "gatsby"
import { SignIn, SignOut } from "gatsby-theme-amplify-cognito"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({ authState, authData }) => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
    <h1>Petit Test Cognito</h1>
    <section>
      {authState !== "signedIn" ? (
        <SignIn authState={authState} />
      ) : (
        <>
          <h1>Hello {authData.username}</h1>
          <SignOut />
        </>
      )}
    </section>
  </Layout>
)

export default IndexPage
