import styles from './PostHeader/postHeader.module.scss'

export default function PostTitle({ children }) {
  return (
    <h1 className={`${styles.header_post} text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left`}>
      {children}
    </h1>
  )
}
