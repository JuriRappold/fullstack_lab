import './textbox.css';
import {useState} from "react";

export function BigTextbox({label, def, isRequired}: {label?: string, def?: string, isRequired?: boolean}){
    const [charCount, setCharCount] = useState(0);
    const [value, setValue] = useState(def ?? '...');

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>){
        setCharCount(event.target.value.length);
        setValue(event.target.value);
    }
    return (
        <>
            <fieldset className={"description"}>
                <legend>{label ?? "Description"}:</legend>
                <textarea maxLength={500} id={"descriptionInput"} rows={10} cols={50} onChange={handleChange} name={label} placeholder={"..."} value={value} >
                </textarea>
                { charCount === 500 && (
                    <div className={"fullWarning"} id={"full"}>You have reached the maximum Length</div>
                )}
                <br/>
                <span>{charCount}/500</span>
            </fieldset>
        </>
    )
}