import React, { FC } from "react";
import './index.css'
import CurrentKey from "../../../components/CurrentKey";

const PanelLayout: FC = () => {
    return (
        <div className="container">

            <div className="current-key" style={{ display: "flex", justifyContent: "center"}}>
                <CurrentKey></CurrentKey>
            </div>

            <div className="ad">

            </div>

            <div className="recent-keys">

            </div>

            <div className="info-and-config">

            </div>
        </div>
    )
}

export default PanelLayout