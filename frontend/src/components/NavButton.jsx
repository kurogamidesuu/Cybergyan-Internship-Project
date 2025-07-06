import { Link } from "react-router-dom"

const NavButton = ({name}) => {
  const route = name.toLowerCase() === 'home' ? '/' : `/${name.toLowerCase()}`;


  return (
    <Link to={route}>
      <div className="h-15 w-full flex items-center rounded-lg hover:bg-green-400 transition background duration-300 ease-in-out">
        <h2 className="text-lg font-semibold pl-3 font-sans text-slate-800">{name}</h2>
      </div>
    </Link>
  )
}

export default NavButton