import { useAuth } from "../context/AuthContext";

function Default() {
     const { user  } = useAuth();
     
  return <h1 className="text-2xl font-bold text-primary">nAME ={user?.username}</h1>;
}

export default Default;