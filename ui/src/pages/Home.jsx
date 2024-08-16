import React from 'react'
import { useSelector } from 'react-redux'

export const Home = () => {
  const { loading } = useSelector(state => state.user);
  return (
    <div>Home, is loading? {loading}</div>
  )
}
