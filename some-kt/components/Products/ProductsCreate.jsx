'use client'
import { useState, useEffect } from 'react';
import style from './Products.module.css'

export default function CreatePost() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
  
    const [productData, setProductData] = useState({
      title: '',
      price: '',
    })
  
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await fetch('/api/categories')
          const data = await response.json()
          setCategories(data)
        } catch (err) {
          console.error('Error fetching categories:', err)
        }
      }
      fetchCategories()
    }, [])
  
    const handleProductSubmit = async (e) => {
      e.preventDefault()
      setLoading(true)
      setError('')
      setMessage('')

      try {
          const payload = {
              ...productData,
              categoryId: productData.categoryId ? Number(productData.categoryId) : null
            }
            const response = await fetch('/api/products', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(payload)
            })
        
        const data = await response.json()
  
        if (!response.ok) {
          throw new Error(data.error || 'Failed to create product')
        }
  
        setMessage('Products created successfully!')
        setProductData({ title: '', price: '', categoryId: '' })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    return(
        <div className={style.padding_small}>
        <form onSubmit={handleProductSubmit} className={style.wrapper}>
          <div className={style.text_wrapper}>
            <label>Title</label>
            <input
              type="text"
              value={productData.title}
              onChange={(e) => setProductData({ ...productData, title: e.target.value })}
              required
            />
          </div>

          <div className={style.text_wrapper}>
            <label >Price</label>
            <input
              type="number"
              value={productData.price}
              onChange={(e) => setProductData({ ...productData, price: e.target.value })}
              required
            />
          </div>

          <div className={style.text_wrapper}>
            <label >Category</label>
            <select
              value={productData.categoryId}
              onChange={(e) => setProductData({ ...productData, categoryId: e.target.value })}
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id} required> 
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" disabled={loading}> {loading ? 'Creating...' : 'Create Product'} </button>
        </form>
        </div>
    )
}