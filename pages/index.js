import Head from 'next/head'
import Link from 'next/link'

import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts';

export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>
          Just testing out nextjs. It's really cool tho.{' '}
          <a href="https://nextjs.org/learn">I followed this guide.</a>
          <p className={utilStyles.lightText}>Thank you for visiting 🤗.</p>
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog posts</h2>
        <p className={utilStyles.lightText}>Some test blog posts acquired from filesystem.</p>
        <ul className={utilStyles.list}>
          {allPostsData.map(({id, date, title}) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}><a>{title}</a></Link>
            <br />
              {id}
            <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps(){
  const allPostsData = getSortedPostsData()

  return {
    props: {
      allPostsData
    }
  }
}