import './textbox.css';
import {useState} from "react";
export function SmallTextbox({label, isRequired}: {label: string, isRequired?: boolean}){
    const [charCount, setCharCount] = useState(0);
    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        setCharCount(event.target.value.length);
    }
    return (
        <>
            <fieldset className={"title"}>
                <legend >{label ?? "Title"}: </legend>
                <div>
                    { isRequired &&
                        <input maxLength={50} type={"text"} id={"titleInput"} onChange={handleChange} required name={label}/>
                    }
                    { !isRequired && (
                        <input maxLength={50} type={"text"} id={"titleInput"} onChange={handleChange} name={label}/>
                    )}
                    <span>{charCount}/50</span>
                </div>
                { charCount === 50 && (
                    <div className={"fullWarning"} id={"full"}>You have reached the maximum Length</div>
                )}
                <br/>
            </fieldset>
        </>
    )
}