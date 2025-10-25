"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext"
import { useEffect } from "react";

export const AuthRedirect = () => {
    const {user} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push("/countries");
        }
    }, [user, router]);

    return null;
};

export default AuthRedirect;