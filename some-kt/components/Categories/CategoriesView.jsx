import { useEffect, useState } from "react";


export default function CategoriesView(){
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
        try {
            const response = await fetch('/api/categories');
            if (response.ok) {
            const data = await response.json();
            setCategories(data);
            } else {
            throw new Error( 'Hе удалось загрузить пользователей' ); 
            }
        } catch (error) {
            if (error instanceof Error) {
            alert('Ошибка при загрузке данных: ' + error.message);
            } else {
            alert('Ошибка при загрузке данных: неизвестная ошибка');
            }
        }
    };
  
    fetchCategories()
    },[]);
    
    return(
        <div>
            {
                categories.map((el)=> (
                <p>{el.title}</p>
                ))
            }
        </div>
    )
}