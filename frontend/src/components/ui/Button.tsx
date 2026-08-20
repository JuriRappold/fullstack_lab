import './button.css';
import { useImperativeHandle, useState } from "react";
import { Link } from "react-router-dom";
type ButtonProp = {
    text?: string,
    onPush?: toObject
    disable?: boolean,
    ref?: React.RefObject<ButtonHandle | null>
}

import type{
    toObject,
} from '../../util/types';

export type ButtonHandle = {
    enableButton: () => void;
    disableButton: () => void;
};

export const Button = ({ ref, text, onPush, disable }: ButtonProp ) => {
        const [disabled, setDisabled] = useState<boolean>(disable ?? false);

        const [classes, setClasses] = useState<string[]>( disabled ? ["button", "disabled"] : ["button"] );

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
            <Link className={classes.join(" ")} to={myPush} replace={true}>
                {myText}
            </Link>
        );
    };

Button.displayName = "Button";
