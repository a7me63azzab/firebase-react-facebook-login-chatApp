import React from "react";
import Styles from "./Message.module.css";


const Message =(props)=>{
    var bubble;
    if(props.sender === props.owner){
     bubble=[Styles.bubble,Styles.me];
    }else{
        bubble=[Styles.bubble,Styles.you];
    }
     
    // const bubbleMe=[Styles.bubble,Styles.me];
    // const bubbleYou=[Styles.bubble,Styles.you];
    return(
        <div className={Styles.chat}>
        <div className={bubble.join(' ')}>{props.message}</div>
        </div>
    );
};

export default Message;


