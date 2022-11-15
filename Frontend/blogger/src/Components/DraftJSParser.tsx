import React, { useEffect } from 'react'
import Moment from 'moment';
import '../Css/Index.css'
import { useNavigate } from 'react-router';

const DraftJSParser:React.FC<any> = (params:any) => 
{
    const Nav = useNavigate();

    const formatDate = (time:any) => 
    {
        Moment.locale('en');
        return Moment(time).format('MMM d YYYY')
    }

    const breakdownText:any = (dataArray:[], text: string, blockmap: any) =>
    {
        let startPos = 0
        let newBlockMap:any = [];

        //TODO(): Fix overlaping Text

        dataArray.forEach((ranges:any, rangePos:number)=> {
            let normalTextRange;
            if (ranges.offset >= startPos)
            {
                let newObj:any = {};
                normalTextRange = ranges.offset - startPos;
                newObj.text = text.substring(startPos,startPos+normalTextRange)
                newObj.ranges = {}
                newObj.ranges.offset = startPos;
                newObj.ranges.length = normalTextRange;
                newObj.style = "";
                newBlockMap.push(newObj);

                let newSObj: any = {};
                newSObj.text = text.substring(ranges.offset,ranges.offset+ranges.length);
                newSObj.ranges = ranges;
                newSObj.style =  "";

                if (ranges.key != undefined)
                {
                    newSObj.metadata = blockmap[ranges.key]
                }
                if (ranges.style != undefined)
                {
                    newSObj.style = CheckStyles(ranges.style, newSObj.style);
                }

                newBlockMap.push(newSObj)
                
                startPos = ranges.offset + ranges.length;
            } else {
                if (ranges.offset < startPos)
                {
                    let textRange = null;

                    newBlockMap.forEach((newObj: any, i: number) => {
                        if (ranges.offset > newObj.ranges.offset && ranges.offset < newObj.ranges.offset+newObj.ranges.length)
                        {
                            let block2:any = {}

                            newBlockMap[i].text = newObj.text.substring(newObj.ranges.offset,ranges.offset)
                            newBlockMap[i].ranges.offset = newObj.ranges.offset
                            newBlockMap[i].ranges.length = ranges.offset
                                        
                            block2.text = text.substring(ranges.offset, ranges.offset + ranges.length)
                            block2.ranges = {}
                            block2.ranges.offset = ranges.offset;
                            block2.ranges.length = ranges.length;

                            if (block2.style == null)
                            {
                                block2.style = {};
                            }

                            if (ranges.key != undefined)
                            {
                                block2.metadata = blockmap[ranges.key]
                            }

                            if (ranges.style != undefined)
                            {
                                block2.style = CheckStyles(ranges.style,block2.style);
                            }
                            newBlockMap.push(block2)
                        }
                    })

                    textRange = text.substring(ranges.offset, ranges.offset+ranges.length)
                } else {
                    let compareText:string = "";
                    compareText = text.substring(ranges.offset,ranges.offset+ranges.length);
                    newBlockMap.forEach((newObj: any, i: number) => {
                        if (newBlockMap[i].style == null)
                        {
                            newBlockMap[i].style = {};
                        }

                        if (ranges.style != undefined)
                        {
                            newBlockMap[i].style = CheckStyles(ranges.style,newBlockMap[i].style);
                        }
                    
                    })
                }
            }
        })

        if (startPos < text.length )
        {
            let moreText:any = {};
            moreText.text = text.substring(startPos, text.length) ;
            moreText.style = {};
            newBlockMap.push(moreText);
            
        }
        return newBlockMap
    }

    const isNotArrayEmpy:any = (array:any) =>
    {
        if (array.length != 0)
        {
            return true;
        }

        return false;
    }

    const parseText:any = (data:any) => 
    {
        let jsonData = JSON.parse(data);
        let blockmap:any = jsonData.blocks;
        let result:any = {}
        
        result.line = {};
        result.line.lines = []


        blockmap.forEach( (obj:any) => 
        {
            let newBlockMap:any = [];
            let brokeDown = false;
            
            if (isNotArrayEmpy(obj.inlineStyleRanges) || isNotArrayEmpy(obj.entityRanges))
            //if (obj.inlineStyleRanges.length != 0 || obj.entityRanges.length != 0)
            {
                let newRanges = [];

                newRanges = [...obj.inlineStyleRanges,...obj.entityRanges]
                
                newRanges.sort((obj, obj2) => {
                    if (obj.offset > obj2.offset)
                    {
                        return 1;
                    }
                    if (obj.offset < obj2.offset)
                    {
                        return -1;
                    }
                    return 0;
                })
                
                newBlockMap = breakdownText(newRanges, obj.text, jsonData.entityMap);
                // NOTES():
                // Loops though newBlock, to see if an object has a key property if it does
                // then create a new property can keyData and the data from the entity map 
                newBlockMap.forEach( (textObj:any, i: number) =>
                {
                    if (textObj.key != undefined)
                    {
                        newBlockMap[i].keyData = obj.entityMap[textObj.key];
                    }
                })

                brokeDown = true;
            } 
            if (brokeDown === false)
            {
                let allText:any = {};
                allText.text = obj.text;
                newBlockMap.push(allText);
            }

            result.line.type = obj.type 

            let dataBlock:any = {}
            dataBlock.texts = newBlockMap
            dataBlock.type = obj.type

            result.line.lines.push(dataBlock)
        })

        return  result;
    }

    const CheckStyles = (styleName:string, oldObjs:any = {})  =>
    {
        let newStyles:any = {}

        Object.keys(oldObjs).forEach((key, object)=> {
            newStyles[key] = object;
        }) 
        if (styleName === "SUBSCRIPT")
        {
            newStyles.subSubscript = true;
        }
        if (styleName === "SUPERSCRIPT")
        {
            newStyles.superSubscript = true;
        }
        if (styleName === "CODE")
        {
            newStyles.backgroundColor = "lightgrey"
            newStyles.fontFamily = "monospace"
        }
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

    const mapEntryText = (entriesText:any) => 
    (   
        entriesText.map((entry:any) => 
            (
                entry.metadata != undefined ?
                (
                    entry.metadata.data.url != undefined ?
                    (
                        <a href={entry.metadata.data.url}>
                            {entry.text}
                        </a>
                    ) :
                    entry.metadata.type === "IMAGE" ?
                    (
                        <img src={entry.metadata.data.src} width={entry.metadata.data.width} height={entry.metadata.data.height}></img>
                    ):
                    entry.metadata.type === "EMBEDDED_LINK" ?
                    (
                        <embed type="video/webm" src={entry.metadata.data.src} width={entry.metadata.data.width} height={entry.metadata.data.height}>
                        </embed>
                    ):
                    (
                        <>
                            { entry.text}
                        </>
                    )
                    
                 ):

                entry.style != undefined ?
                (
                    Object.keys(entry.style).length == 0 ?
                    (
                        <span>
                            { entry.text}
                        </span>
                    ): entry.style.subSubscript === true ?
                    (
                        <sub>{ entry.text}</sub>
                    ):entry.style.superSubscript === true ?
                    (
                        <sup>{ entry.text}</sup>
                    ):
                    (
                        <span style={entry.style}>
                            { entry.text}
                        </span>
                    )
                ):
                (
                    <span>
                        { entry.text}
                    </span>
                )
            )
        )
    )

    const mapTextLine = (entriesText:any) => 
    (
        entriesText.line.lines.map((entry:any) =>
        (
            <>
                { 
                    entry.type == "header-one" ? 
                    ( 
                        <h1>
                            { mapEntryText(entry.texts) }
                        </h1> 
                    ):
                    entry.type == "header-two" ?
                    (
                        <h2>
                            { mapEntryText(entry.texts) }
                        </h2>
                    ):
                    entry.type == "header-three" ?
                    (
                        <h2>
                            { mapEntryText(entry.texts) }
                        </h2>
                    ):
                    entry.type == "code" ?
                    (
                        <div>
                            { mapEntryText(entry.texts) }
                        </div>
                    ):
                   entry.type == "blockquote" ?
                    (
                        <blockquote>
                            { mapEntryText(entry.texts) }
                        </blockquote>
                    ):
                    (
                        <div>
                            { mapEntryText(entry.texts) }
                        </div> 
                    )
                }
            </>
        ))
    )

    const NaviToPost = (id : any) => 
    {
        Nav('/view/' + id)
    }

    const mapBlogPosts = (mapData:[] ) => (
		mapData.map((post:any) => (
            <div className="blogPost">
                <div className="Blog_Date">
                    <span className="userAvatar">
                        <img src="user-default.svg" alt="image"/>
                    </span>
                    <span className="userInfo">
                        {post.blogger.firstname} {post.blogger.lastname} { formatDate(post.created)}
                    </span>
                </div>
                <div className="Blog_Title">
                    <h2> <a href="#" onClick={() => NaviToPost(post.id) }  >{ post.title }</a> </h2>
                </div>

                <div className="Blog_Text">
                    {
                        mapTextLine(parseText(post.text))
                    }
                </div>
            </div>
        )
    )
    );

    const mapBlogOnePost = (post:any) => (
            <div>
                <div className="Blog_Date">
                    <span className="userAvatar">
                        <img src="user-default.svg" alt="image"/>
                    </span>
                    <span className="userInfo">
                        {post.blogger.firstname} {post.blogger.lastname} { formatDate(post.created)}
                    </span>
                </div>
                <div className="Blog_Title">
                    <h2> <a href="#" onClick={() => NaviToPost(post.id) }  >{ post.title }</a> </h2>
                </div>

                <div className="Blog_Text">
                    {
                        mapTextLine(parseText(post.text))
                    }
                </div>
            </div>
    );


    return (
        <>
            {
                params.isOnePost === "true" ?  mapBlogOnePost(params.data) :  mapBlogPosts(params.data)
            }
        </>
    )
}

export default DraftJSParser;