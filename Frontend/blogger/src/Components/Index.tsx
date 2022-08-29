import React, { useEffect  } from 'react'
import Layout from './Layout';
import { useAllBlogsMutation } from '../Services/Blog';
import { Post } from '../Models/Post';
import Moment from 'moment';
import '../Css/Index.css'

const Index:React.FC<any> = () => {
    const [ AllBlogs, { data, isLoading, isSuccess, isError } ] = useAllBlogsMutation(); 

    useEffect(()=> {
        AllBlogs(null);
    }, [])

    useEffect(()=> {
        if (isSuccess)
        {
            //console.log(JSON.parse(data.Success[0].text))           
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
        let blockmap:any = jsonData.blocks;

        let newBlockMap:any = [];
        let startPos = 0;

        console.log(jsonData);
        
        

        blockmap.forEach( (obj:any) => 
        {
             if (obj.inlineStyleRanges.length != 0)
             {
                obj.inlineStyleRanges.forEach((ranges:any, rangePos:number)=> {
                    let normalTextRange;

                    if (ranges.offset >= startPos)
                    {
                        let newObj:any = {};
                        normalTextRange = ranges.offset - startPos;
                        newObj.text = obj.text.substring(startPos,startPos+normalTextRange)
                        newObj.ranges = {}
                        newObj.ranges.offset = startPos;
                        newObj.ranges.length = normalTextRange;
                        newObj.style = [];
                        newBlockMap.push(newObj);

                        let newSObj: any = {};
                        newSObj.text = obj.text.substring(ranges.offset,ranges.offset+ranges.length);
                        newSObj.ranges = ranges;
                        newSObj.style = {};
                        newSObj.style = CheckStyles(ranges.style, newSObj.style);
                        /*
                        if (ranges.style === "UNDERLINE")
                        {
                            newSObj.style.textDecoration = 'UNDERLINE'
                        }
                        if (ranges.style === "BOLD")
                        {
                            newSObj.style.fontWeight = 'BOLD' 
                        }
                        if (ranges.style === "ITALIC")
                        {
                            newSObj.style.fontStyle = 'ITALIC'
                        }
                        */
                        //ndewSObj.style.push(ranges.style)
                        newBlockMap.push(newSObj)
                        
                        startPos = ranges.offset + ranges.length;
                    } else {
                        if (ranges.offset < startPos)
                        {

                            newBlockMap.forEach((newObj: any, i: number) => {
                                if (ranges.offset > newObj.ranges.offset && ranges.offset < newObj.ranges.offset+newObj.ranges.length)
                                {
                                    let block2:any = {}

                                    newBlockMap[i].text = newObj.text.substring(newObj.ranges.offset,ranges.offset)
                                    newBlockMap[i].ranges.offset = newObj.ranges.offset
                                    newBlockMap[i].ranges.length = ranges.offset
                                    /*
                                    if (ranges.style === "BOLD")
                                    {
                                        newBlockMap[i].style.fontWeight = 'BOLD' 
                                    }
                                    if (ranges.style === "ITALIC")
                                    {
                                        newBlockMap[i].style.fontStyle = 'ITALIC'
                                    } 
                                    */                                  
                                                
                                    block2.text = obj.text.substring(ranges.offset, ranges.offset + ranges.length)
                                    block2.ranges = {}
                                    block2.ranges.offset = ranges.offset;
                                    block2.ranges.length = ranges.length;

                                    if (block2.style == null)
                                    {
                                        block2.style = {};
                                    }
                                    block2.style = CheckStyles(ranges.style,block2.style);
                                    /* 
                                    if (ranges.style === "UNDERLINE")
                                    {
                                        block2.style.textDecoration = 'UNDERLINE'
                                    }
                                    if (ranges.style === "BOLD")
                                    {
                                        block2.style.fontWeight = 'BOLD' 
                                    }
                                    if (ranges.style === "ITALIC")
                                    {
                                        block2.style.fontStyle = 'ITALIC'
                                    } 
                                    */

                                    newBlockMap.push(block2)
                                }
                            })
                            let textRange = null;

                            textRange = obj.text.substring(ranges.offset, ranges.offset+ranges.length)
                            console.log(textRange)
                        } else {
                            let compareText:string = "";
                            compareText = obj.text.substring(ranges.offset,ranges.offset+ranges.length);
                            newBlockMap.forEach((newObj: any, i: number) => {
                                if (newBlockMap[i].style == null)
                                {
                                    newBlockMap[i].style = {};
                                }

                                newBlockMap[i].style = CheckStyles(ranges.style,newBlockMap[i].style);
                                /*
                                if (newObj.text === compareText)
                                {
                                    if (ranges.style === "UNDERLINE")
                                    {
                                        newBlockMap[i].style.textDecoration = 'UNDERLINE'
                                    }
                                    if (ranges.style === "BOLD")
                                    {
                                        newBlockMap[i].style.fontWeight = 'BOLD'
                                    }
                                    if (ranges.style === "ITALIC")
                                    {
                                        newBlockMap[i].style.fontStyle = 'ITALIC'
                                    }
                                }
                                */
                            
                            })
                        }
                    }
                })

                if (startPos < obj.text.length )
                {
                    let moreText:any = {};
                    moreText.text = obj.text.substring(startPos, obj.text.length) ;
                    moreText.style = [];
                    newBlockMap.push(moreText);
                    
                }
            } else {
                let allText:any = {};
                allText.text = obj.text;
                newBlockMap.push(allText);
            }

        })

        console.log(newBlockMap);

        return  newBlockMap;
    }

    const CheckStyles = (styleName:string, oldObjs:any = {})  =>
    {
        let newStyles:any = {}
        Object.keys(oldObjs).forEach((key, object)=> {
            newStyles[key] = object;
        }) 
        if (styleName === "UNDERLINE")
        {
            newStyles.textDecoration = 'UNDERLINE'
        }
        if (styleName === "BOLD")
        {
            newStyles.fontWeight = 'BOLD'
        }
        if (styleName === "ITALIC")
        {
            newStyles.fontStyle = 'ITALIC'
        }
        if (styleName.indexOf("color-") == 0)
        {
            let rgbColor = styleName.substring(6,styleName.length)
            newStyles.color = rgbColor;
        }
        if (styleName.indexOf("fontfamily-") == 0)
        {
            let fontfamily = styleName.substring(11,styleName.length)
            newStyles.fontFamily = fontfamily;
        }
        if (styleName.indexOf("fontsize-") == 0)
        {
            let fontsize = styleName.substring(10, styleName.length)
            newStyles.fontSize = fontsize+"em";
        }
        return newStyles;
    }

    const mapStyles = (charList:[], char: string) => (
        charList.map((charListObject:any) => (<>{ charListObject.style === 'BOLD' ? (<b>{char}</b>)  : (<>{char}</>)  }</>))
    )

    const mapString = (str:string, charList:[]) => (
            Array.from(str).map((char:string) => (<>{char}</>)
        )
    )

    const mapEntryText = (entriesText:[]) => (
        entriesText.map((entry:any) => (
            <span style={entry.style}>
                { entry.text}
            </span>
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
                        //parseText(post.text)
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
                    <> { mapIt(data.Success) }  </>
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