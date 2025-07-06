import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";

const UserBar = ({id, sNum, name, username, email, role, setToastMessage, setRefreshTrigger}) => {

  const handleDelete = async () => {
    const res = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();

    if(data.success) {
      setRefreshTrigger(prev => prev + 1);
    }
  }

  return (
    <div className="flex w-full bg-green-100 rounded-lg h-30 hover:bg-green-200 transition background duration-200 ease-in-out">
      
      <div className="w-[5%] flex items-center justify-center text-xl font-bold text-green-100 bg-emerald-900 rounded-l-lg">{sNum}</div>
      <div className="w-[70%] pl-2 block mt-auto mb-auto">
        <h2 className="text-2xl font-bold text-green-950">{name}</h2>
        <p>{username}</p>
        <p>{email}</p>
      </div>
      <div className="w-[15%] block m-auto text-[1.1em]">
        <span className="text-green-900 font-semibold">role: </span>
        <span className="text-green-700">{role}</span>
      </div>
      <div className="w-[10%] flex items-center gap-2 mr-2">
        <button className="bg-green-500 h-[80%] w-full rounded-md cursor-pointer hover:bg-green-700 transition background duration-300 ease text-2xl flex items-center justify-center">
          <FiEdit3 />
        </button>
        <button 
          className="bg-red-500 h-[80%] w-full rounded-md cursor-pointer hover:bg-red-700 transition background duration-300 ease text-2xl flex items-center justify-center"
          onClick={handleDelete}
        >
          <AiOutlineDelete />
        </button>
      </div>
    </div>
  )
}

export default UserBar