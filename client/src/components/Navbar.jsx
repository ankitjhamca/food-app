import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { useSelector } from "react-redux"

// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

const Navbar = () => {
  const {isLoggedIn} = useSelector(state=>state.auth)
  return (
    <nav className='flex items-center justify-between p-3 sticky top-0 bg-white border-b z-50'>
      <Link to={"/"}>
        <img src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png" alt="logo" width={120} />
      </Link>
      {
        isLoggedIn ? <Button>Logout</Button> : <div className='flex gap-5'>
          <Link to={"/login"}>
            <Button variant="outline">Login</Button>
          </Link>

          <Link to={"/register"}>

            <Button >Signup</Button>
          </Link>
        </div>
      }
    </nav>
  )
}

export default Navbar


{/* <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar> */}