import Head from 'next/head'
import Header from '@includes/header'
import Footer from '@includes/footer'

export default function DefaultLayout(props) {
    return (
        <main>
            <Head>
                <title>{props.title}</title>
                <meta name='description' content={props.description}/>
                <meta name="google-site-verification" content="z3G5HErEVaY_MrgoEwsTRmsnTB2DiDuzc1ew32EG-WY" />
            </Head>
            {props.children}
        </main>
    )
}