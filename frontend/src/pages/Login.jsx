import React, { useState } from 'react'
import api, { setToken } from '../api'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try{
      const res = await api.post('/login',{email,password})
      const token = res.data.token
      localStorage.setItem('token',token)
      setToken(token)
      nav('/')
    }catch(err){
      setError(err.response?.data?.message || 'Gagal login')
    }
  }

  return (
    <div style={{maxWidth:400, margin:'2rem auto'}}>
      <h2>Login Admin</h2>
      <form onSubmit={submit}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/><br/>
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required/><br/>
        <button type="submit">Masuk</button>
        {error && <p style={{color:'red'}}>{error}</p>}
      </form>
    </div>
  )
}
