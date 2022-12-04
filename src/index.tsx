import "./styles/style.css";
import * as $ from "jquery";
import "./styles/styles.less";
import "./babel";
import React from "react";
import { createRoot } from 'react-dom/client';
import { Header } from "./shared/Header/Header";
import { Main } from "./shared/Main/Main";


function App() {
    return (
        <div>
            <Header />
            <Main />
        </div>
    )
}

let rootElem = document.getElementById("react-root");

if (rootElem) {
    const root = createRoot(rootElem);
    root.render(<App />);
}

