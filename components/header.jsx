// _includes/header.jsx
import styles from "../styles/layouts/posts_layout.module.scss";

export default function Header() {
    return(
    <header className={styles.posts_layout__header}>
        <div className={styles.posts_layout__header_brand_container}>
            <p>Header</p>
        </div>

    </header>
    )
}