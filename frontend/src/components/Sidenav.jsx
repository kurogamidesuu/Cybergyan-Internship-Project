import NavButton from './NavButton'

const Sidenav = () => {

  return (
    <div className='h-full w-100 p-2'>
      <div className='w-full h-40 bg-green-400 text-3xl font-semibold text-green-900 rounded-xl flex items-end justify-center pb-5'>User Manager</div>
      <div className='flex flex-col gap-2 mt-10'>
        <NavButton name='Home' />
        <NavButton name='Users' />
      </div>
    </div>
  )
}

export default Sidenav