import React from 'react'
import styles from './Spinner.module.css'

export default function Spinner() {
  return (
    <div className={styles.loader}>
      <div className={styles['clip-1']}></div>
      <div className={styles['clip-2']}></div>
      <div className={styles['clip-3']}></div>
      <div className={styles['clip-4']}></div>
      <div className={styles['clip-5']}></div>
      <div className={styles['clip-6']}></div>
      <div className={styles['clip-7']}></div>
      <div className={styles['clip-8']}></div>
    </div>
  )
}
