/*
    mediatizr, adds media queries support to incapable browsers
    
    Version     : 0.1.0
    Author      : Aurélien Delogu (dev@dreamysource.fr)
    Homepage    : https://github.com/pyrsmk/mediatizr
    License     : MIT
    
    Dependencies
        
        Sheethub
        W
*/

(function(){
    
    var doc=document,
        html=doc.documentElement,
        a,
        b='test-mqs',
        Sheethub=window.Sheethub,
        mqs=function(){
        
            var sheets=Sheethub.get(),
                stylesheets=[],
                id,
                name,
                node,
                contents,
                start,
                end,
                mq,
                index,
                indexOf='indexOf',
                /*
                    The core function: evaluate stylesheets for showing
                */
                evalMedias=function(){
                    var i,j,conditions,condition,first,second;
                    // Browse registered stylesheets
                    for(i in stylesheets){
                        // Evaluate expression
                        conditions=stylesheets[i].split('and');
                        j=conditions.length;
                        while(j){
                            condition=conditions[--j].match(/\(\s*(.+?)\s*:\s*(.+?)(px|em)\s*\)/);
                            if(condition){
                                // Format values
                                first=W();
                                second=condition[2];
                                if(condition[3]=='em'){
                                    first=W(first);
                                }
                                // Enable/disable stylesheet
                                Sheethub.get(i).node().disabled=
                                    !condition[1][indexOf]('min')?
                                    first<second:
                                    first>second;
                            }
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
                
            b=0;
            for(id in sheets){
                if(!/mq\d+$/.test(id)){
                    contents=sheets[id].get();
                    index=0;
                    do{
                        // Find a new media query
                        start=contents[indexOf]('@media',index);
                        if(start==-1){
                            break;
                        }
                        end=indexOfMatchedBracket(contents.substr(start));
                        // ################ test with breaklines #########################
                        mq=contents.substr(start,end).match(/@media\s+(.+)and(.+)\{([\S\s]+)/i);
                        if(mq){
                            // Create the new stylesheet
                            Sheethub.add(name=id+'.mq'+(++b),mq[3]);
                            node=Sheethub.get(name).node();
                            // Define media type
                            node.media=mq[1];
                            // Register this styidlesheet
                            stylesheets[name]=(mq[2]+'').toLowerCase();
                            // Disable it for the time
                            node.disabled=true;
                        }
                    }
                    while(index=start+end);
                }
            }
            
            // Catch responsive events
            W(evalMedias);
            evalMedias();
            
        };
    
    // Test if media queries are supported or not
    a=doc.createElement('div');
    a.id=b;
    a.style.position='absolute';
    a.style.top='-99em';
    html.appendChild(a);
    Sheethub.add(b,'#'+b+'{width:9px}');
    Sheethub.get(b).node().media='only all';
    if(a.offsetWidth!=9){
        // Launch script
        if(Sheethub.ready()){
            mqs();
        }
        else{
            Sheethub.listen(mqs);
        }
    }
    Sheethub.remove(b);
    html.removeChild(a);
    
})();