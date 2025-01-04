import { useSelector } from "react-redux";
import selector from "../redux/selectors/selector";
import { useEffect } from "react";

export default function Backdrop() {
    const { currOperation } = useSelector(selector);

    useEffect(() => {
        console.log("CURROPER", currOperation);
    }, []);
    
    return (
        <div className={ currOperation !== '' ? "backdrop backdrop-open" : "backdrop" }></div>
    );
}