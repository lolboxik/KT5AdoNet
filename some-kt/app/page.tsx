'use client'

import UsersView from '../components/Users/UsersView'
import PostsView from '../components/Posts/PostsView'

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <UsersView/>
      <PostsView/>
    </div>
  );
}
