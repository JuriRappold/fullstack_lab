import './textbox.css';
import {useState} from "react";
export function SmallTextbox({label, isRequired, def}: {label: string, isRequired?: boolean, def?: string}){
    const [charCount, setCharCount] = useState(0);
    const [value, setValue] = useState(def ?? '...')


    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        setCharCount(event.target.value.length);
        setValue(event.currentTarget.value);
    }
    return (
        <>
            <fieldset className={"title"}>
                <legend >{label ?? "Title"}: </legend>
                <div>
                    { isRequired &&
                        <input maxLength={50} type={"text"} id={"titleInput"} onChange={handleChange} required name={label} placeholder={"..." } value={value}/>
                    }
                    { !isRequired && (
                        <input maxLength={50} type={"text"} id={"titleInput"} onChange={handleChange} name={label} placeholder={def ??"..." } value={value}/>
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