import { Header } from "./Header"
import React from 'react';

type WrapperProps = {
  children: React.ReactNode;
};

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    return <div className="h-screen w-screen">
        <Header />
        {children}
    </div>
}