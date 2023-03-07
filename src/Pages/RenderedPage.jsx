import React from "react";
import { QRCode } from "react-qrcode-logo";

export const RenderedPage = ({ code, size }) => {
    return (
        <div>
            <div style={{ float: "left" }}>
                <QRCode
                    value={`[${JSON.stringify({
                        ID: code,
                        beden: size,
                    })}]`}
                    size={150}
                />
            </div>
            <div style={{ float: "right" }}>
                <p>Code:</p>
                <h3>{code}</h3>
                <p>Size:</p>
                <h3>{size}</h3>
            </div>
            <div style={{ clear: "both" }} />
        </div>
    );
};
