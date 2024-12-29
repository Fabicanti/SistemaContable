import { IoIosMenu } from "react-icons/io";
import {
    IoBookOutline,
    IoHomeOutline,
    IoSettingsOutline,
} from "react-icons/io5";
import {
    MdOutlineAccountBalance,
    MdOutlineSupervisorAccount,
} from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { Link } from "react-router-dom";
import { BadgeUser } from "../../BadgeUser";
import { useUser } from "@context/UserProvider";
import "@styles/components/AsideToggle.css";
import "@styles/Aside.css";
import { AsideMenu } from "./AsideMenu";

const sizeIcon = 36;
const colorIcon = "white";

export const AsideToggle = () => {
    const { user } = useUser();
    return (
        <>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#navbarOffcanvasLg"
                aria-controls="navbarOffcanvasLg"
                aria-label="Toggle navigation"
            >
                <IoIosMenu size={sizeIcon} />
            </button>
            <div
                className="offcanvas offcanvas-start"
                tabIndex="-1"
                id="navbarOffcanvasLg"
                aria-labelledby="navbarOffcanvasLgLabel"
            >
                <div className="offcanvas-header toggle">
                    <div className="title-toggle">
                        <h5>SSAA II</h5>
                    </div>
                    <button
                        type="button"
                        className="btn-close btn-close-white"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body">
                    <BadgeUser rol={user?.roleId} />
                    <ul className="links-aside toggle">
                        <AsideMenu/>
                    </ul>
                </div>
            </div>
        </>
    );
};
