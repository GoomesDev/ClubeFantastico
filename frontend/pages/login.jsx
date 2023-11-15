import LoginRegister from "@/components/Login"
import { useState , useEffect } from "react";
import '../styledComponents/styled.css'

export const Login = () => {

    const [showLogin, setShowLogin] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowLogin(true);
        }, 500);

        return () => {
        clearTimeout(timeout);
        };
    }, []);

    return(
        <div>
            {showLogin && <LoginRegister />}
        </div>
    )
}