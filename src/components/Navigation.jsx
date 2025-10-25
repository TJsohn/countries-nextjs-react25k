'use client';

import { useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { useState, useEffect } from "react";

const { useAuth } = require("@/app/context/AuthContext");
const { AppBar, Toolbar, Button, Typography } = require("@mui/material");

const Navigation = ({ children }) => {
    const [isClient, setIsClient] = useState(false);
    const {user, signOut} = useAuth();
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
    <div>
    <AppBar position="sticky" color="gradient" sx={{ mb: 3, top: 0, zIndex: 1100 }}>
        <Toolbar>
             <Typography variant="h6" sx={{ flexGrow: 1 }}>
    My Countries App
  </Typography>
            <Button color="inherit" onClick={()=>router.push("/countries")}>
            Countries
            </Button>
            {isClient && user && (
                <Button color="inherit" onClick={()=>router.push("/favourites")}>
                    Favourites
                </Button>
            )}
            {isClient && user && (
                <Button color="inherit" onClick={()=>signOut()}>Logout</Button>
            )}
            {isClient && user && (
                <Button color="inherit" onClick={() => router.push("/profile")}>
                    Profile
                </Button>
            )}
            {isClient && !user && (
                <Button color="inherit" onClick={()=>router.push("/login")}>Login</Button>
            )}
        
        <ThemeToggle />
        </Toolbar>
    </AppBar>
    {children}
    </div>
    );
}

export default Navigation;

