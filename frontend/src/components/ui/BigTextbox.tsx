import './textbox.css';
import {useState} from "react";

export function BigTextbox({label}: {label?: string}){
    const [charCount, setCharCount] = useState(0);
    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>){
        setCharCount(event.target.value.length);
    }
    return (
        <>
            <fieldset className={"description"}>
                <legend>{label ?? "Description"}:</legend>
                <textarea maxLength={500} id={"descriptionInput"} rows={10} cols={50} onChange={handleChange} required name={label} ></textarea>
                { charCount === 500 && (
                    <div className={"fullWarning"} id={"full"}>You have reached the maximum Length</div>
                )}
                <br/>
                <span>{charCount}/500</span>
            </fieldset>
        </>
    )
}