import { useEffect, useState } from "react";


export default function PostsView(){
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
        try {
            const response = await fetch('/api/posts');
            if (response.ok) {
            const data = await response.json();
            setPosts(data);
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
  
    fetchPosts()
    },[]);
    
    return(
        <div>
            {
                posts.map((el)=> (
                <p>{el.title} - {el.content}</p>
                ))
            }
        </div>
    )
}