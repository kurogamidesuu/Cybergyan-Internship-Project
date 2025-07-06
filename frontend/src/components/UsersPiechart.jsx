import { useEffect, useState } from "react"
import { PieChart } from "react-minimal-pie-chart";

const UsersPiechart = () => {
  const [hovered, setHovered] = useState(undefined);
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

  const data = [
    {title: 'Admin', value: admins.length, color: '#e63946'},
    {title: 'Moderator', value: mods.length, color: '#1d3557'},
    {title: 'User', value: users.length, color: '#588157'},
  ];

  return (
    <PieChart 
      data={data}
      lineWidth={50}
      label={({ dataEntry }) => dataEntry.value ? `${dataEntry.title}` : ''}
      labelStyle={{ fontSize: '5px', fill: 'antiquewhite', fontWeight: 'bold' }}
      labelPosition={75}
    />
  )
}

export default UsersPiechart