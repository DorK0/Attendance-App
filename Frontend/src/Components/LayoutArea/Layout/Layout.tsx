import { useEffect, useState } from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import Routing from "../Routing/Routing";
import "./Layout.css";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";

function Layout(): JSX.Element {

  const [user, setUser] = useState<UserModel>()
  useEffect(() => {
    setUser(store.getState().authState.user)
    const unsubscribe = store.subscribe(() => {
      setUser(store.getState().authState.user)
    })
    return unsubscribe;
  }, [])

  return (
    <div className="Layout">
      <div className="div1"><Header /></div>
      <div className="div2"><Routing /></div>
      <div className="div3"><Footer /></div>
    </div>
  );
}

export default Layout;