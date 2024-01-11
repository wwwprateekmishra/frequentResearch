import { useContext } from "react";
import userContext from "../context/userContext";

const useUser = ()=> useContext(userContext)
export default useUser ;