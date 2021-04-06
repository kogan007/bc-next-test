import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Link from 'next/link'

import getProducts from '../lib/getProducts';
import Header from '../src/components/Header';

export default function Home({data, page}) {
  return (
    <div>
      <Header />
      {
        data?.map(product => (
          <div key={JSON.stringify(product)}>
            <Link href={`products${product.custom_url.url}`}>
            {product.name}
            </Link>
          </div>
        ))
      }

        <Link href={`?page=${page - 1}`}>
          <a>Prev Page</a>
        </Link>

        <Link href={`?page=${page + 1}`}>
          <a>Next Page</a>
        </Link>
    </div>
  )
}


export async function getServerSideProps(context) {
  const page = parseInt(context.query.page);
  
  const products = await getProducts(`?page=${page}`);


  
  return {
    props: {
      data: products.data.data,
      page: page
    }
  }
}