import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Pin from "../components/pin";
import { useState } from 'react';
import { useRouter } from 'next/router'

export default function Home() {
  const [pin, setPin] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter()

  const onInputHandler = (val) => {
    setError("")
    if (val.length === 6) {
      setPin(val);
    } else if (val.length === 0) {
      setPin("");
    } else if (val.length < 6) {
      setPin(val)
    }
  }

  const onClickHandler = () => {
    if (pin.length < 6 || pin[5] === "7") {
      setError("Verification Error");
    } else {
      router.push("/success");
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Pin Verification Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Verification Code
        </h1>

        <div className={styles.grid}>
          <div className={styles.card}>
            <Pin
              fields={6}
              onInput={onInputHandler}
            />
            {error !== "" && <p className={styles.error}>{error}</p>}
          </div>
        </div>

        <div className={styles.grid}>
          <button onClick={onClickHandler}>Submit</button>
        </div>
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
