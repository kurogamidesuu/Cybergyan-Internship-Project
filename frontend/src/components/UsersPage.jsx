import { useEffect, useState } from 'react'
import UserBar from './UserBar'
import SearchBar from './SearchBar';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/users');
        const data = await res.json();
        setUsers(data);
      } catch(error) {
        console.log('Error fetching the users: ', error);
      }
    };

    fetchUsers();
  }, [refreshTrigger]);

  return (
    <div className='px-5'>
      <h1 className='font-semibold text-2xl mb-5 border-b-2 pb-2'>Users</h1>
      <SearchBar users={users} setUsers={setUsers} />
      <div className='p-4 rounded-lg flex flex-col gap-5'>
        {users.length ? (
          users.map((user, index) => (
          <UserBar 
            key={user._id} 
            id={user._id}
            sNum={index+1}
            name={user.name} 
            username={user.username} 
            email={user.email} 
            role={user.role} 
            setRefreshTrigger={setRefreshTrigger}
          />
        ))
        ) : (
          <div className='text-center text-xl text-zinc-400'>
            <p>No users</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage