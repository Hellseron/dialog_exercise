import React, {useEffect} from "react"
import "wicg-inert";
import ReactDOM from "react-dom";

interface DialogProps {
    children: React.ReactNode;
    open: boolean;
    onClose: () => void;
    styles: string;
}


//portal
interface PortalProps {
    children: React.ReactNode;
    parent: any;
}
const Portal: React.FC = ({children, parent}: PortalProps) => {

    return ReactDOM.createPortal(children, parent ? parent : document.body);
}

// dialog
const Dialog: React.FC = (props: DialogProps) =>{
    const {open, onClose, styles} = props;
    const backdrop = React.useRef<HTMLDivElement>(null);
    const el = document.getElementsByTagName("dialog")[0]
    const body = document.querySelector("body")
    const contentElement = document.getElementById("sectionContent")


    useEffect(() => {
        const {current} = backdrop;
        const keyHandler = (e: { which: number; }) => e.which === 27 && onClose();
        const clickHandler = (e: any)=> e.target === current && onClose();
        let lastFocused: Element | null = null


        if (current) {
            current.addEventListener("click", clickHandler);
            window.addEventListener("keyup", keyHandler);
        }

        if (open) {
            lastFocused = document.activeElement
            if (el) {
                const focusableEls = document.getElementById("document")!.querySelectorAll('a[href], area[href],input, input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
                (focusableEls[0] as HTMLElement).focus()
                contentElement!.setAttribute("aria-hidden", "true");
                body!.style.overflow = "hidden"
                contentElement!.setAttribute("inert", "true");
                el.focus()
            }
        }

        return () => {

            if (current) {
                current.removeEventListener("click", clickHandler);
            }
            window.removeEventListener("keyup", keyHandler);

            if(lastFocused) {
                setTimeout(()=>{
                    (lastFocused as HTMLElement).focus()
                },0)
            }

            if (el) {
                contentElement!.removeAttribute("inert");
                body!.style.overflow = "auto";
                setTimeout(()=>{
                    contentElement!.removeAttribute("aria-hidden");
                },0)
            }
        };
    }, [open, onClose, el, body, contentElement]);


    return (
        <dialog id="dialog">
            {(open) && (
                <Portal parent={el.parentNode}>
                    <div role="document" id="document">
                        <div className={open && "backdrop active"} ref={backdrop}>
                            <div className={styles}>{props.children}</div>
                        </div>
                    </div>
                </Portal>

            )}

        </dialog>
    );
}

export default Dialog