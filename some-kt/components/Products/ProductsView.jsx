import { useEffect, useState } from "react";
import style from './Products.module.css'


export default function ProductsView(){
const [products, setProducts] = useState([]);

useEffect(() => {
    
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          throw new Error( 'Hе удалось загрузить продукты' ); 
        }
      } catch (error) {
        if (error instanceof Error) {
          alert('Ошибка при загрузке данных: ' + error.message);
        } else {
          alert('Ошибка при загрузке данных: неизвестная ошибка');
        }
      }
    };
    
    fetchProducts()
    },[]);

    return(
        <div className={style.padding_small}>
            {
                products.map((el)=> (
                <p className={style.wrapper_small}>{el.title} - {el.price}</p>
                ))
            }
        </div>
    )
}