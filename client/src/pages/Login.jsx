
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useDispatch } from 'react-redux'
import { setIsLoggedIn } from "../redux/slices/authSlice"


const Login = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const userData = Object.fromEntries(formData.entries())

    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(userData)
      })
      const data = await res.json()
      toast(data.message)
 
      if(data.success){
        dispatch(setIsLoggedIn(true))
        navigate("/")
      }

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }

  }
  return (
    <div className="w-full max-w-lg  mx-auto my-12">
      <h2 className="text-2xl font-semibold mb-5">Login</h2>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <Input type="email" placeholder="Enter your email" name="email" required />
        <Input type="password" placeholder="Enter your password" name="password" required />
        <Button disabled={loading}>
          {
            loading ? <>
              <Loader2 className="animate-spin" />
              Please wait
            </> : "Login"
          }
        </Button>
      </form>
      <p className="mt-5">Don't have an account ? <Link className="text-blue-500 hover:underline" to={"/register"}>register</Link></p>
    </div>
  )
}

export default Login
