import { ReactNode } from "react";
import "./Header.css"

type HeaderProps = {
    image: {
        src: string;
        alt: string;
    }
    children: ReactNode;
}

export default function Header({image}: HeaderProps) {
    return (
        <header className="header" >
            <img {...image} className="image" />
        </header>
    );
}
