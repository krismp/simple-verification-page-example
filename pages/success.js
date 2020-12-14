import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Pin from "../components/pin";
import { useState } from 'react';

export default function Success() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Verification Success</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Verification Success
        </h1>
        <br/>
        <Link href="/">
            <a>Back</a>
        </Link>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
