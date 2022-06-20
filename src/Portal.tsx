import React from "react";
import ReactDOM from "react-dom";


const Portal: React.FC = (props) => {
    const el = React.useMemo(() => document.createElement("div"), []);
    React.useEffect(() => {
        const target = document.body;
        target.appendChild(el);
        return () => {
            target.removeChild(el);
        };
    }, [el]);
    return ReactDOM.createPortal(props.children, document.body);
}

export default Portal
