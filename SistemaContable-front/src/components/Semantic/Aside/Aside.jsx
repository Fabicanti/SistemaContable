
import { Link } from "react-router-dom";
import { useUser } from "@context/UserProvider";
import { BadgeUser } from "../../BadgeUser";
import logo from "@assets/icono-sistema.png";
import "@styles/Aside.css";
import { AsideMenu } from "./AsideMenu";


export const Aside = () => {

  const { user } = useUser();

  return (
    <aside className={`side-bar`}>
      <Link
        className="logo-aside"
        style={{ textDecoration: "none" }}
      >
        <div>
          <img src={logo} alt="" />
          <div className="text-logo">SSAAII</div>
        </div>
      </Link>
      <BadgeUser rol={user?.roleId}/>
      <ul className="links-aside">
        <AsideMenu/>
      </ul>
    </aside>
  );
};
