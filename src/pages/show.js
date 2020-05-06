import React, { useEffect, useState } from "react"

import Layout from "../components/layout"
import Content from "../components/content"
import ShareUrl from "../components/shareUrl"
import Vuist from "../components/vuist"
import SEO from "../components/seo"

import { useQueryParam, StringParam } from "use-query-params"

import style from "./show.module.css"

const ShowPage = ({ location }) => {
  const [vuistje, setVuistje] = useState(null)
  const [id] = useQueryParam("id", StringParam)

  const domain = location.origin ? location.origin : ""

  useEffect(() => {
    const getData = async () => {
      const r = await fetch(`/.netlify/functions/show?id=${id}`)
      const data = await r.json()
      setVuistje(data)
    }
    getData()
  }, [id])

  return (
    <Layout>
      <SEO title="Deel dit vuistje" />
      {vuistje ? (
        <>
          <Vuist />
          <ShareUrl value={`${domain}/vuistje/${id}`} />
          <Content {...vuistje} />
        </>
      ) : (
        <p className={style.loading}>Vuistje aan het ballen...</p>
      )}
    </Layout>
  )
}

export default ShowPage
