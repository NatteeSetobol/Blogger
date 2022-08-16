import React, { useEffect  } from 'react'
import Layout from './Layout';
import { useAllBlogsMutation } from '../Services/Blog';
import { Post } from '../Models/Post';
import Moment from 'moment';
import '../Css/Index.css'
import { convertFromRaw } from 'draft-js'

const Index:React.FC<any> = () => {
    const [ AllBlogs, { data, isLoading, isSuccess, isError } ] = useAllBlogsMutation(); 

    useEffect(()=> {
        AllBlogs(null);
    }, [])

    useEffect(()=> {
        if (isSuccess)
        {
            
        }
    },[isLoading])

    const formatDate = (time:any) => 
    {
        Moment.locale('en');
        return Moment(time).format('MMM d YYYY')
    }

    const parseText:any = (data:any) => 
    {
        let jsonData = JSON.parse(data);
        let blockmap:any = jsonData._immutable.currentContent.blockMap;

        
        Object.keys(blockmap).forEach(key => 
            {
                console.log(blockmap[key]);
                //string += '\n' + blockmap[key].text;
            })
        
        return  blockmap;
    }

    const mapStyles = (charList:[], char: string) => (
        charList.map((charListObject:any) => (<>{ charListObject.style === 'BOLD' ? (<b>{char}</b>)  : (<>{char}</>)  }</>))
    )

    const mapString = (str:string, charList:[]) => (
            Array.from(str).map((char:string) => (<>{char}</>)
        )
    )

    const mapEntryText = (entriesText:any) => (
        Object.keys(entriesText).map((entry:any, i) => (
            <>
                { mapString(entriesText[entry].text, entriesText[entry].characterList) }
            </>
        )
    )
    )

    const mapIt = (mapData:[]) => (
		mapData.map((post:Post) => (
            <div>
                <div className="Blog_Title">
                    <h3> { post.title } </h3>
                </div>
                <div className="Blog_Date">
                    <i> Created on { formatDate(post.created)} </i>
                </div>
                <div className="Blog_Text">
                    {
                       mapEntryText(parseText(post.text))
                    }
                </div>
            </div>
        )
    )
    );


    const main = () =>
    (
        <div className="Blog_Entry">
            { isError ? 
                (
                    <> Sorry, an Error has occured. </>
                ) : isSuccess ? (
                    <> { /*mapIt(data.Success)*/ }  </>
                ) : isLoading ? (
                    <> loading </>
                ): null
            }
        </div>
    )
    


    return (
        <>
            <Layout content={main}>
            </Layout>
        </>
    )
}

export default Index;