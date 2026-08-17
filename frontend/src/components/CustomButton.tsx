// import {Link} from "react-router-dom";
//
type ButtonProp = {
    text?: string,
    onPush?: action
    disable?: boolean
}
type action = {
    pathname: string,
    search?: string,
    hash?: string
}
import './button.css';
// import {useEffect, useState} from "react";
// export function CustomButton({text, onPush, disable}: ButtonProp ){
//     const [disabled, setDisabled]=useState<boolean>(disable ?? false);
//
//     const [classes, setClasses] = useState<string[]>(disabled ? ["button", "disabled"] : ["button"]);
//
//     const [myText, setMyText] = useState(text ?? "Button");
//     const [myPush, setMyPush] = useState(onPush ?? {pathname: '/'})
//     function addClass(newClass: string){
//         setClasses(prevClasses => {
//             if(prevClasses.includes(newClass)) return prevClasses;
//             return[...prevClasses, newClass]
//         })
//
//     }
//     function removeClass(oldClass: string){
//         // const allClasses = classes.split(" ")
//         // setClasses( allClasses.filter( el => el!==oldClass).join(" ") )
//         // const index = classes.indexOf(oldClass);
//         // if(index === -1) return;
//         // classes.splice(index, 1);
//         // setClassString(classes.join(" ").substring((classes[0].length +2 )))
//         if(oldClass === classes[0]) return;
//         setClasses(prevClasses => {
//             return prevClasses.filter( className => className !== oldClass);
//         })
//
//     }
//     function disableButton() {
//         setDisabled(true);
//         addClass('disabled');
//     }
//     function enableButton(){
//         setDisabled(false);
//         removeClass('disabled');
//     }
//     function getClassString() {
//         return classes.join(" ");//.slice(classes[0].length + 2);
//     }
//
//
//     if(disabled){
//         return(
//             <>
//                 <button disabled={disabled} className={getClassString()}>{myText}</button>
//             </>
//         )
//     }
//     return (
//         <>
//             <Link className={getClassString()} to={myPush} >{myText}</Link>
//         </>
//     )
// }
import { forwardRef, useImperativeHandle, useState } from "react";
import { Link } from "react-router-dom";

export type CustomButtonHandle = {
    enableButton: () => void;
    disableButton: () => void;
};

export const CustomButton = forwardRef<CustomButtonHandle, ButtonProp>(
    ({ text, onPush, disable }, ref) => {
        const [disabled, setDisabled] = useState<boolean>(disable ?? false);

        const [classes, setClasses] = useState<string[]>(
            disabled ? ["button", "disabled"] : ["button"]
        );

        const [myText] = useState(text ?? "Button");
        const [myPush] = useState(onPush ?? { pathname: "/" });

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

        function disableButton() {
            setDisabled(true);
            addClass("disabled");
        }

        function enableButton() {
            setDisabled(false);
            removeClass("disabled");
        }

        useImperativeHandle(ref, () => ({
            enableButton,
            disableButton
        }));

        if (disabled) {
            return (
                <Link className={classes.join(" ") } to="">
                    {myText}
                </Link>
            );
        }

        return (
            <Link className={classes.join(" ")} to={myPush}>
                {myText}
            </Link>
        );
    }
);

CustomButton.displayName = "CustomButton";