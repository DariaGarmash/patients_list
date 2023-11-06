import React from "react";

type HeaderProps = {
    title: string;
}
const Header = ({title}: HeaderProps): JSX.Element => {
    return <section className="page-header"><h1>{title}</h1></section>;
};

export default Header;