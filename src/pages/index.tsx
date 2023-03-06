import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Head from '@docusaurus/Head';
import HomepageFeatures from '../components/HomepageFeatures';
import Translate from '@docusaurus/Translate';
import { useTrail, animated } from '@react-spring/web'

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const trails = useTrail(4, {
    from: { opacity: 0, transform: 'translate3d(0px, 2em, 0px)' },
    to: { opacity: 1, transform: 'translate3d(0px, 0px, 0px)' },
    config: {
      mass: 3,
      tension: 460,
      friction: 45,
    },
  })
  return (
    <div className="hero">
      <div className={styles.welcome_intro}>
        <h1 className={styles.hero_title}>
          <span
            style={{ color: 'var(--ifm-color-primary)' }}
          ></span>欢迎来到Zxx的博客</h1>
        <p className="hero__subtitle">这里会记录我日常工作中使用的和学习的新技术，如果符合你的需求，随便食用。</p>
        <p className="hero__subtitle">React爱好者，喜爱前端技术，多年后端开发攻城狮，目前寻找全栈工作的机会，目标成为独立开发者，如有机会，欢迎来电来函。</p>

        <animated.div style={trails[3]}>
          <a className={styles.intro} href={'./about'}>
            <Translate id="hompage.hero.introduce">自我介绍</Translate>
          </a>
        </animated.div>
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
