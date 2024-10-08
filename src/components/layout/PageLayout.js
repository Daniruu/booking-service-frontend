import React from "react";

const PageLayout = ({ children }) => {
    return (
        <div className="container">
            <div className="page">
                {children}
            </div>
        </div>
    );
};

export default PageLayout;