import { useEffect, useState } from 'react';
import UsersPiechart from './UsersPiechart';

const Dashboard = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const setUsers = async () => {
      try {
        const res = await fetch('/api/users');
        const data = await res.json();

        setUserData(data);
      }catch(error) {
        console.log('Error fetching users: ', error);
      }
    }

    setUsers();
  }, []);

  const admins = userData.filter(elem => elem.role === 'admin');
  const mods = userData.filter(elem => elem.role === 'moderator');
  const users = userData.filter(elem => elem.role === 'user');

  return (
    <div className='px-5'>
      <h1 className='font-semibold text-2xl mb-5 border-b-2 pb-2'>Dashboard</h1>
      <div>
        <div className='w-[30%]'>
          <h1><span className='font-semibold'>Total Users:</span> {userData.length}</h1>
          <h1><span className='font-semibold'>Admins:</span> {admins.length}</h1>
          <h1><span className='font-semibold'>Moderators:</span> {mods.length}</h1>
          <h1><span className='font-semibold'>Users:</span> {users.length}</h1>
        </div>
        <div className="h-70 w-[70%]">
          <UsersPiechart />
        </div>
      </div>
    </div>
  )
}

export default Dashboard