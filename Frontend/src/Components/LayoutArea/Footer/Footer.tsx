import { useEffect, useState } from "react";
import "./Footer.css";

export function Footer(): JSX.Element {
    const [year, setYear] = useState<String>()
    useEffect(() => {
        const now = new Date();
        setYear(now.getFullYear().toString())
    }, [])
    return (
        <div className="Footer">
            All Rights Reserved {year} &copy;
        </div>
    );
}
