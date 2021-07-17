import React, { useState } from "react";
import { useRouteMatch, NavLink, Link } from "react-router-dom";
import { FaTwitter, FaGithub, FaInstagram } from "react-icons/fa";
import {withRouter} from 'react-router'
// Components
// import SocialBar from "../../components/common/DemoOptions";

const links = [
    {
        title: "Home",
        path: "intro",
    },
    {
        title: "About",
        path: "about",
    },
    {
        title: "Career",
        path: "resume",
    },
    {
        title: "Endurance",
        path: "endurance"
    },
    {
        title: "Percussion",
        path: "percussion",
    },
    {
        title: "Portfolio",
        path: "portfolio",
    },
    {
        title: "Blog",
        path: "blog",
    },
    // {
    //     title: "Testimonial",
    //     path: "testimonial",
    // },
    {
        title: "Contact",
        path: "contact",
    },
];

function Header() {
    let { url } = useRouteMatch();

    const [displaySidenav, setDisplaySidenav] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        setDisplaySidenav(!displaySidenav);
    };

    
    return (
        <>
            <header className="app-header app-header-1">
                <div className="header-logo" style={{ img: '#5cab86' }} >
                <NavLink to="/">
                <img src={'https://michaelangrivera-media.s3.us-east-2.amazonaws.com/logo.png'} alt="Logo" />
                            {/* <Link to={`url`.replace(/([^:])(\/\/+)/g, "$1/")}>Michael Angelo Rivera</Link> */}
                        
                </NavLink>
                    
                </div>
                <button className="button button-menu" onClick={(e) => handleClick(e)}>
                    <span></span>
                </button>
                <ul className="header-dots">
                    {links.map((item, index) => (
                        <li key={index}>
                            <NavLink to={`${url}${item.path}`} activeClassName="active">
                                <span className="circle"></span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <ul className="header-menu">
                    {links.map((item, index) => (
                        <li key={index}>
                            <NavLink to={`${url}${item.path}`} activeClassName="active">
                                <span className="anchor">{item.title}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <div className="header-follow">
                    <ul>
                        <li>
                            <a href="https://instagram.com/michaelangrivera">
                                <i className="ti-instagram"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/michaelangelorivera/">
                                <i className="ti-linkedin"></i>
                            </a>
                        </li>                        
                        <li>
                            <a href="https://github.com/michaelangrivera?tab=repositories">
                                <i className="ti-github"></i>
                            </a>
                        </li>
                    </ul>
                    <p>Follow Me</p>
                </div>
            </header>
            <div className={`app-sidenav ${displaySidenav && "active"}`}>
                <div className="sidenav-menu">
                    <div className="logo">
                        <Link to={`url`.replace(/([^:])(\/\/+)/g, "$1/")}>Michael Angelo Rivera</Link>
                    </div>
                    <button className="button" onClick={(e) => handleClick(e)}></button>
                    <ul className="sidenav-nav">
                        {links.map((item, index) => (
                            <li key={index} onClick={(e) => handleClick(e)}>
                                <NavLink to={`${url}${item.path}`.replace(/([^:])(\/\/+)/g, "$1/")} activeClassName="active">
                                    <span className="anchor">{item.title}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <div className="sidenav-links">
                        <ul>
                            <li>
                                <a href="!#">
                                    <FaTwitter className="icon" />
                                </a>
                            </li>
                            <li>
                                <a href="!#">
                                    <FaGithub className="icon" />
                                </a>
                            </li>
                            <li>
                                <a href="!#">
                                    <FaInstagram className="icon" />
                                </a>
                            </li>
                        </ul>
                        <p>Follow Me</p>
                    </div>
                </div>
                <span className="sidenav-close" />
            </div>
            {/* <DemoOptions /> */}
        </>
    );
}

export default Header;
