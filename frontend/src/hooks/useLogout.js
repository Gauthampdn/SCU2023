import { useAuthContext } from "./useAuthContext";


export const useLogout =  () => {

  const { dispatch } = useAuthContext()

  const logout = async () => {

    dispatch({type: "LOGOUT"})
    window.location.href = "http://localhost:4000/auth/logout";

  }

  return { logout }
}
 
