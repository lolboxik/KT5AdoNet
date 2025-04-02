'use client'
import { useState, useEffect } from 'react';
import style from './Categories.module.css'

export default function CreatePost() {
    const [categories, setCategory] = useState([])
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
  
    const [categoryData, setCategoryData] = useState({
      title: ''
    })
  
    const handleCategorySubmit = async (e) => {
      e.preventDefault()
      setLoading(true)
      setError('')
      setMessage('')
  
      try {
          const payload = {
              ...categoryData
            }
            const response = await fetch('/api/categories', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(payload)
            })
        
        const data = await response.json()
  
        if (!response.ok) {
          throw new Error(data.error || 'Failed to create category')
        }
  
        setMessage('Category created successfully!')
        setCategoryData({ title: '', content: '', authorId: '' })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    return(
        <div className={style.padding_small}>
        <form onSubmit={handleCategorySubmit} className={style.wrapper}>
          <div className={style.text_wrapper}>
            <label>Title</label>
            <input
              type="text"
              value={categoryData.title}
              onChange={(e) => setCategoryData({ ...categoryData, title: e.target.value })}
              required
            />
          </div>

          <button type="submit" disabled={loading}> {loading ? 'Creating...' : 'Create Category'} </button>
        </form>
        </div>
    )
}