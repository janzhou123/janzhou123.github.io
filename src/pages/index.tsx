import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Head from '@docusaurus/Head';
import HomepageFeatures from '../components/HomepageFeatures';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div className="hero">
      <div className={styles.welcome_intro}>
        <h1 className={styles.hero_title}>
          <span
            style={{ color: 'var(--ifm-color-primary)' }}
          ></span> ~ 欢迎来到Zxx的博客</h1>
        <p className="hero__subtitle">记录生活学习的每一天</p>
      </div>
      <div className={styles.welcome_svg}>
        <img src={useBaseUrl("/img/program3.jpg")} />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Layout
      description="记录生活学习的每一天">
      <Head>
        <title>Zxx的博客</title>
      </Head>
      <HomepageHeader />
      <main>
        <br />
        {/* <HomepageFeatures /> */}
      </main>
    </Layout>
  );
}
