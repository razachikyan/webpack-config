import Post from "@models/Post";
import "./styles/style.css";
import WebpackLogo from "./assets/img/icon-square-big.png";
import * as $ from "jquery";
import "./styles/styles.less";
import "./babel";
import React from "react";
import { createRoot } from 'react-dom/client';
import { Header } from "./shared/Header/Header";
const Post1 = new Post("some title", WebpackLogo);

$("pre").html(Post1.toString());

function App() {
    return (
        <Header />
    )
}

const root = createRoot(document.getElementById("react-root"));
root.render(<App />);