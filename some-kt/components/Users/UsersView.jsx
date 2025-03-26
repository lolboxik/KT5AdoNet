import { useEffect, useState } from "react";


export default function UsersView(){
const [users, setUsers] = useState([]);

useEffect(() => {
    
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
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
    
    fetchUsers()
    },[]);

    return(
        <div>
            {
                users.map((el)=> (
                <p>{el.name} - {el.email}</p>
                ))
            }
        </div>
    )
}