'use client'

import ProductsView from '../components/Products/ProductsView'
import CategoriesView from '../components/Categories/CategoriesView'

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <h2>Products:</h2>
      <ProductsView/>
      <h2>Categories:</h2>
      <CategoriesView/>
    </div>
  );
}
