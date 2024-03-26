/* eslint-disable @typescript-eslint/no-unused-vars */

import { useAuthContext } from "../../contexts/AuthContext"

export default function Dashboard(){
  const {user} = useAuthContext();
 const handleClick =(event: any) =>{
  console.log(user);
  return
 };
  return(
    <>
    <h3>Bem vindo!{user?.name}</h3>
    <button onClick={handleClick}>CLIQUE AQUI</button>
    </>
  )
} 