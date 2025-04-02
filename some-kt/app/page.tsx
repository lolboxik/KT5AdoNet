'use client'

import ProductsView from '../components/Products/ProductsView'
import CategoriesView from '../components/Categories/CategoriesView'
import ProductsCreate from '../components/Products/ProductsCreate'
import CategoriesCreate from '../components/Categories/CategoriesCreate'
import style from './page.module.css'

export default function Home() {
  return (
    <div>
      <h1 className={style.padding_small}>Home Page</h1>
      <h2 className={style.padding_small}>Products:</h2>
      <ProductsView/>
      <h2 className={style.padding_small}>Categories:</h2>
      <CategoriesView/>
      <h1 className={style.padding_small}>Create some:</h1>
      <div className={style.wrapper}>
        <ProductsCreate/>
        <CategoriesCreate/>
      </div>
    </div>
  );
}
