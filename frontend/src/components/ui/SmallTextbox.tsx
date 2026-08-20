import './textbox.css';
import {useState} from "react";
export function SmallTextbox({label}: {label?: string}){
    const [charCount, setCharCount] = useState(0);
    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        setCharCount(event.target.value.length);
    }
    return (
        <>
            <fieldset className={"title"}>
                <legend >{label ?? "Title"}: </legend>
                <input maxLength={50} type={"text"} id={"titleInput"} onChange={handleChange}/>
                { charCount === 50 && (
                    <div className={"fullWarning"} id={"full"}>You have reached the maximum Length</div>
                )}
                <br/>
                <span>{charCount}/50</span>
            </fieldset>
        </>
    )
}