import React, {FC} from 'react';

const GuestLayout = ({children} : any) => {

    return (
        <div className="a" style={{display: 'flex', justifyContent:'center', alignItems:"center", width: '100vw', height: '100vh'}}>
            {children}
        </div>
    )

};

export default GuestLayout;