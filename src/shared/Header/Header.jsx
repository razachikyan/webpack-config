import React from "react";
import "./header.css"

export function Header() {
    return (
        <header>
            <div className="left-side">
                <h1 className="page-title">
                    Page Title
                </h1>
            </div>
            <div className="right-side">
                <ul className="Header-list">
                    <li className="header-item">List item</li>
                    <li className="header-item">List item</li>
                    <li className="header-item">List item</li>
                    <li className="header-item">List item</li>
                    <li className="header-item">List item</li>
                </ul>
            </div>
        </header>
    );
}