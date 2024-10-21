import React from 'react'
import { Input } from 'antd'
const { Search } = Input;

const SearchBar = () => {
  return (
    <div className='search-bar'>
     <Search placeholder="input search text" enterButton="Search" size="large"  />
    </div>
  )
}

export default SearchBar
