import { useEffect, useState } from 'react'

const SearchBar = ({users, setUsers}) => {
  const [input, setInput] = useState('');

  const handleClick = () => {
    const filtered = users.filter(elem => {
      return elem.firstName.toLowerCase() === input.toLowerCase()
    });

    setUsers(filtered);
  }

  return (
    <div className='w-[90%] h-10 block m-auto'>
      <input 
        type="text"
        value={input}
        onChange={(e) => { 
          setInput(e.target.value);
        }}
        className='w-[80%] h-full bg-slate-100 border-2 border-green-800 rounded-lg px-2 focus:outline-none focus:border-green-950'
        placeholder='Enter a user to search...'
        onKeyDown={e => {
          if(e.key === 'Enter') {
            handleClick();
          }
        }}
      />
      <button 
        className='w-[15%] h-full bg-emerald-500 ml-3 rounded-lg hover:bg-emerald-600 transition background duration-200 ease-in-out active:bg-emerald-700'
        onClick={handleClick}
        
      >
          Search
      </button>
    </div>
  )
}

export default SearchBar