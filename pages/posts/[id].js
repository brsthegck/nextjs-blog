import Layout from '../../components/layout'
import { getAllPostsId, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

export async function getStaticPaths(){

  const paths = getAllPostsId()
  
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }){
  const postData = await getPostData(params.id)
  return {
    props: { postData }
  }
}

export default function Post({postData}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      {postData.title}
      <br />
      {postData.id}
      <br />
      <div className={utilStyles.lightText}>
        <Date dateString={postData.date} />
      </div>
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  )
}