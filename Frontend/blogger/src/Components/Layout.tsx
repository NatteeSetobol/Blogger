import React, { useEffect } from 'react'

const Layout:React.FC<any> = ( mycontent:any) =>
{
    useEffect(()=> {
    },[mycontent.conetent])

    return (
       <div className="createcontainer">
            <div className="left-content">
            </div>
            <div className="center-content">
                {
                    mycontent.content()
                }
            </div>
            <div className="right-content">
            </div>
        </div>
    )
}

export default Layout;

