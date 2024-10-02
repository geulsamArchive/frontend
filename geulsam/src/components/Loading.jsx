import React from 'react';
import { SyncLoader } from 'react-spinners'

const override = {
    display: "flex",
    margin: "0 auto",
    borderColor: "#F9F9F6",
    textAlign: "center",
};

const Loading = ({ loading }) => {
    return (
        <div>
            <SyncLoader
                color="#616114"
                loading={loading}
                cssOverride={override}
                size={150}
            />
        </div>
    );
};

export default Loading;