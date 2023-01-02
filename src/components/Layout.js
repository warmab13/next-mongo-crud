import { Navbar } from "./Navbar";
import { Divider } from "semantic-ui-react";


export const Layout = ({ children }) => {
    return (
        <>
            <Navbar/>
            <Divider hidden></Divider>
            {children}
        </>
    );
};