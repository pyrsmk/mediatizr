/*! mediatizr 0.4.2 (https://github.com/pyrsmk/mediatizr) */

(function(){

    var win=window,
        doc=document,
        html=doc.documentElement,
        Sheethub=win.Sheethub,
        id='mediatizr',
        get='get',
        node='node',
        element,
        mediatizr=function(){

            var sheets=Sheethub[get](),
                sheet,
                stylesheets={},
                name,
                nod,
                contents,
                start,
                end,
                mq,
                index,
                indexOf='indexOf',
                i,
                /*
                    Evaluate media queries and show stylesheets
                */
                evalMedias=function(){
                    var i,j,condition,conditions,current,required;
                    // Browse registered stylesheets
                    for(i in stylesheets){
                        // Evaluate expression
                        conditions=stylesheets[i].split('and');
                        j=-1;
                        while(conditions[++j]){
                            // Extract data
                            condition=conditions[j].match(/\(\s*(.+?)\s*:\s*(.+?)(px|em)\s*\)/);
                            current=W.px2em(W.getViewportWidth(condition[3]=='em'));
                            required=condition[2];
                            // Enable/disable stylesheet
                            Sheethub[get](i)[node]().disabled=
                                !condition[1][indexOf]('min')?
                                current<required:
                                current>required;
                        }
                    }
                },
                /*
                    Search a corresponding closed bracket

                    Return
                        integer
                */
                indexOfMatchedBracket=function(contents){
                    var open,
                        close,
                        index=0,
                        brackets=0;
                    // Loop until brackets are found
                    while(open!=-1 || close!=-1){
                        // Search brackets
                        open=contents[indexOf]('{',index);
                        close=contents[indexOf]('}',index);
                        // Open
                        if(close>open && open!=-1){
                            ++brackets;
                            index=open+1;
                        }
                        // Close
                        else{
                            --brackets;
                            index=close+1;
                        }
                        // Matching closing bracket found!
                        if(!brackets){
                            return close;
                        }
                    }
                    return -1;
                };

            // Register media queries
            i=0;
            for(sheet in sheets){
                if(!sheet.match('^'+id)){
                    contents=sheets[sheet][get]();
                    index=0;
                    // A new media query was found
                    while((start=contents[indexOf]('@media',index))!=-1){
                        // Search corresponding close bracket
                        end=indexOfMatchedBracket(contents.substr(start));
                        // Extract data
                        if(mq=contents.substr(start+6,end-4).match(/([\S\s]+?)and([\S\s]+?)\{([\S\s]+)/i)){
                            // Create the new stylesheet
                            Sheethub.add(name=id+(++i)+sheet,mq[3]);
                            nod=Sheethub[get](name)[node]();
                            // Define media type
                            nod.media=mq[1];
                            // Register this stylesheet
                            stylesheets[name]=(mq[2]+'').toLowerCase();
                            // Disable it for the time
                            nod.disabled=true;
                        }
                        // Update index
                        index=start+end;
                    }
                }
            }

            // Catch responsive events
            W.addListener(evalMedias);
            evalMedias();

        };

    // Test if media queries are supported or not
    if(!(win.supportMediaQueries=function(){
        if(win.matchMedia){
            return true;
        }
        element=doc.createElement('p');
        element.id=id;
        element.style.position='absolute';
        element.style.top='-99em';
        html.appendChild(element);
        Sheethub.add(id,'#'+id+'{width:9px}');
        Sheethub[get](id)[node]().media='only all';
        return element.offsetWidth==9 &&
               !Sheethub.remove(id) &&
               !!html.removeChild(element);
    }())){
        // Launch script
        if(Sheethub.ready()){
            mediatizr();
        }
        else{
            Sheethub.listen(mediatizr);
        }
    }

})();
