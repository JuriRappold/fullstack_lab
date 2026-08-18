import {
    NavLink,
} from "react-router-dom";
import './Links.css'
import { useState} from "react";
import type {
    toObject
} from '../util/types';

type LinkProps = {
    title: string,
    to?: toObject | string,

}
export function NaviLink({title, to}: LinkProps){
    const [text, setText] = useState(title);
    const [link, setLink] = useState(typeof to === "string" ? {pathname: to ?? "/"}: to ?? {pathname: "/"});

    const [classes, setClasses] = useState<string[]>(["link"] );
    function addClass(newClass: string) {
        setClasses(prevClasses => {
            if (prevClasses.includes(newClass)) return prevClasses;
            return [...prevClasses, newClass];
        });
    }
    function removeClass(oldClass: string) {
        if (oldClass === classes[0]) return;

        setClasses(prevClasses =>
            prevClasses.filter(className => className !== oldClass)
        );
    }



    return (
        <>
            <NavLink to={link} className={classes.join(" ")} >{text}</NavLink>
        </>
    )




}