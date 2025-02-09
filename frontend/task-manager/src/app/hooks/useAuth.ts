import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import Cookies from "js-cookie";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  
  useEffect(() => {
    const storedUser = Cookies.get("token");
    if (!user && storedUser) {
      dispatch({ type: "auth/setUser", payload: JSON.parse(storedUser) });
    }
  }, [dispatch, user]);


  return { user };
};
