import React, {Component} from "react";
import { Layout, Button, notification } from 'antd';
import Message from "../components/Message/Message";
import UserList from "../components/UserList";
import MessageBox from "../components/MessageBox";
import topbar from "topbar";
import axios from "../axios_base";
import {connect} from "react-redux";
import firebaseApp from "../js/firebase";
import uuidv4 from "uuid/v4";
import {withRouter} from "react-router-dom";
import * as actionCreators from "../store/actions/index";
import _ from "lodash";
import {getUserData} from "../js/localStorage";
import messageModel from "../js/models/message";
import userModel from "../js/models/user";
import notificationModel from "../js/models/notification";


var database= firebaseApp.database();

const { Content,Footer} = Layout;

class Chat extends Component{
    state={
        users:[],
        messages:[],
        chatId:null,
        notificationId:null
    };

    componentWillMount(){
        var userAuthData = getUserData();
        console.log('before auth',userAuthData.token,userAuthData.id);
        if(userAuthData.id === null&& userAuthData.token === null){
            topbar.show();
        }else{
            topbar.hide();
            axios.get(`/user/${userAuthData.id}`,{ headers: { 'X-auth':userAuthData.token } }).then(res=>{
                console.log(res.data);
                console.log('owner-id',userAuthData.id);
                    database.ref('/users').on('value',(snapshot)=>{
                        if(snapshot.val() !== null){
                            this.getAllUsers(snapshot.val());
                        }
                    });
    
    
    
                    //list all messages added in the current chat id
                    if(this.state.chatId !==null){
                        let app = database.ref(`${this.state.chatId}`);
                        app.on('value', snapshot => {
                            if(snapshot.val() !== null){
                                this.getAllData(snapshot.val());
                            }
                        
                        });
                    }
    
                    // listen to all changes in notifications model
                    database.ref('/notifications').on('value',(snapshot)=>{
                        if(snapshot.val() !== null){
                            this.getAllNotifications(snapshot.val());
                        }
                    });
            }).catch(err=>{
                console.log('err [not authenticated]',err);
                this.props.history.push('/login');
            });
        }
        
    }


    //  componentWillMount(){
    //     console.log('before auth',this.props.ownerId,this.props.token);
    //     if(this.props.ownerId === null&& !this.props.token === null){
    //         topbar.show();
    //     }else{
    //         topbar.hide();
    //         axios.get(`/user/${this.props.ownerId}`,{ headers: { 'X-auth':this.props.token } }).then(res=>{
    //             console.log(res.data);
    //             console.log('owner-id',this.props.ownerId);
    //                 database.ref('/users').on('value',(snapshot)=>{
    //                     if(snapshot.val() !== null){
    //                         this.getAllUsers(snapshot.val());
    //                     }
    //                 });
    
    
    
    //                 //list all messages added in the current chat id
    //                 if(this.state.chatId !==null){
    //                     let app = database.ref(`${this.state.chatId}`);
    //                     app.on('value', snapshot => {
    //                         if(snapshot.val() !== null){
    //                             this.getAllData(snapshot.val());
    //                         }
                        
    //                     });
    //                 }
    
    //                 // listen to all changes in notifications model
    //                 database.ref('/notifications').on('value',(snapshot)=>{
    //                     if(snapshot.val() !== null){
    //                         this.getAllNotifications(snapshot.val());
    //                     }
    //                 });
    //         }).catch(err=>{
    //             console.log('err [not authenticated]',err);
    //             this.props.history.push('/login');
    //         });
    //     }
        
    // }

//     componentWillMount(){
        
//         console.log('owner-id',this.props.ownerId);
//         database.ref('/users').on('value',(snapshot)=>{
//             if(snapshot.val() !== null){
//                 this.getAllUsers(snapshot.val());
//             }
//         });



//         //list all messages added in the current chat id
//         if(this.state.chatId !==null){
//             let app = database.ref(`${this.state.chatId}`);
//             app.on('value', snapshot => {
//                 if(snapshot.val() !== null){
//                     this.getAllData(snapshot.val());
//                 }
            
//             });
//         }

//         // listen to all changes in notifications model
//         database.ref('/notifications').on('value',(snapshot)=>{
//             if(snapshot.val() !== null){
//                 this.getAllNotifications(snapshot.val());
//             }
//         });





// }

    otherIdExits=(otherId)=>{
        // check if the user chat with this other user or not 
       //  var chatWithList;
        let exist = false;
        database.ref(`/users/${this.props.ownerId}/chatWith/`).on('value',(snapshot)=>{
            if(snapshot.val() !== null){
               // chatWithList = snapshot.val();
               let otherIdIndex = snapshot.val().findIndex(item => item.otherId === otherId);
               if(otherIdIndex !== -1){
                       exist = true;
                   }
            }
            console.log('chatWith:',snapshot.val());
        });

        return exist;
        
   };




getAllNotifications=(values)=>{
    let notificationsVal = values;
    console.log('before mapping',notificationsVal);
    let notificationsArr = Object.keys(notificationsVal).map(key => notificationsVal[key]);
    console.log('notifications wwwww=>',notificationsArr);
    var x = notificationsArr.map(x=>x.otherId);
    console.log('otherIds',x);
    console.log('ownerId',this.props.ownerId);
    var getIndex = x.indexOf(this.props.ownerId);
    console.log('getIndex',getIndex,typeof(this.props.ownerId),typeof(x[0]));
    if(getIndex !== -1){
        let notificationId = notificationsArr[getIndex].id;
        let senderId = notificationsArr[getIndex].ownerId;
        //get sender name 
        let senderIndex = this.state.users.findIndex(user=> senderId === user.id );
        let senderName = this.state.users[senderIndex].name;
        let chatNotifyId = notificationsArr[getIndex].chatId;
        this.openNotification(notificationId,senderId,senderName,chatNotifyId);
    }else{
        console.log('no notified');
    }

}


close = () => {
    console.log('Notification was closed. Either the close button was clicked or duration time elapsed.');
  };
  
 openNotification = (notificationId,senderId,senderName,chatNotifyId) => {
     console.log('notification opend');
            let user={
                id:senderId,
                name:senderName
            };
            const key = `open${Date.now()}`;
            const btn = (
            <Button type="primary" size="small" onClick={this.openChat(user)}>
                Open Chat
            </Button>
            );
            notification.open({
            message: `New Message`,
            description: `${senderName} send a message to you`,
            btn,
            key,
            onClose: this.close(),
            });
  };

openChat=(user)=>{
    console.log('open chat for this notification');
    this.userClickedHandler(user)
}

getAllData(values){
    let messagesVal = values;
    let messages = _(messagesVal)
                      .keys()
                      .map(messageKey => {
                          let cloned = _.clone(messagesVal[messageKey]);
                          cloned.key = messageKey;
                          return cloned;
                      })
                      .value();
      this.setState({
        messages: messages
      });
  }

  getAllUsers(values){
      let usersVal = values;
      let users = _(usersVal)
      .keys()
      .map(userKey => {
          let clonedUser = _.clone(usersVal[userKey]);
          return clonedUser; 
      }).value();
      console.log('users:=>',users);
      this.setState({
          users:users
      });

  }

  userClickedHandler=(user)=>{
    this.setState({
        messages:[]
    });
    //get owner user id
    let ownerId = this.props.ownerId;

    //get owner user name
    let ownerName = this.props.ownerName;
    let token = this.props.token;
    let ownerMail = this.props.email;

    //get other user id 
    let otherId = user.id;

    // check if the user chat with this other user before or not 
    if(!this.otherIdExits(otherId)) {
            var chatId = database.ref('/').push().key;
            var notificationId = database.ref('/notifications/').push().key;

            //get all chatWith users
            let chatWith; 
            database.ref(`/users/${this.props.ownerId}/chatWith/`).on('value',(snapshot)=>{
                chatWith = snapshot.val();
            });
                
            //update owner user by adding users he talking with them
            let nowChatWith={
                otherId:otherId,
                chatId:chatId
            };

            if(chatWith!==null){
                chatWith.push(nowChatWith);
            }else{
                chatWith=[nowChatWith];
            }
            
            //update owner user by adding users he talking with them
            let ownerUser = userModel(ownerId,ownerName,ownerMail,token,chatWith);
            database.ref('/users/' + ownerId).set(ownerUser).then(()=>{
                console.log('owner user updated successfully');
            }).catch((err)=>{
                console.log('user updated failed',err);
            });

            //update other user by adding users want to talk with him
            //get all otherChatWith users
            let otherChatWith; 
            database.ref(`/users/${user.id}/chatWith/`).on('value',(snapshot)=>{
                otherChatWith = snapshot.val();
            });
                
            //update other user by adding users he talking with them
            let userNeedToChat={
                otherId:ownerId,
                chatId:chatId
            };

            if(otherChatWith!==null){
                otherChatWith.push(userNeedToChat);
            }else{
                otherChatWith=[userNeedToChat];
            }
            let otherUser = userModel(user.id,user.name,user.email,user.token,otherChatWith);
            database.ref('/users/' + user.id).set(otherUser).then(()=>{
                console.log('owner user updated successfully');
            }).catch((err)=>{
                console.log('user updated failed',err);
            });

            
            //add notification into the queue waiting for other user to response 
            var notification = notificationModel(notificationId,ownerId,otherId,chatId);
            database.ref('/notifications/'+notificationId).set(notification).then(()=>{
                console.log('success');
            }).catch((err)=>{
                console.log('conversation error :',err);
            });

            //send welcome message to other user
            let message = messageModel(this.props.ownerId,`Hello, ${user.name}`);
            database.ref(`/${chatId}`).push(message).then(()=>{
                console.log('message sent');
            }).catch((err)=>{
                console.log('message failed',err);
            });



            let app = database.ref(`${chatId}`);
            app.on('value', snapshot => {
                if(snapshot.val() !== null){
                    this.getAllData(snapshot.val());
                }
            
            });

            this.setState({
                    chatId:chatId,
                    notificationId:notificationId
                });

    }else{
        //when select a user he chat with him before

        //get the id of the chat created between them before
        let chatIdBetweenUs;
        database.ref(`/users/${this.props.ownerId}/chatWith/`).on('value',(snapshot)=>{
            let otherIdIndex = snapshot.val().findIndex(item => item.otherId === otherId);
            chatIdBetweenUs = snapshot.val()[otherIdIndex].chatId;
        });

        // list all messages between us
        let app = database.ref(`${chatIdBetweenUs}`);
        app.on('value', snapshot => {
            if(snapshot.val() !== null){
                this.getAllData(snapshot.val());
            }
        });
        this.setState({
            chatId:chatIdBetweenUs
        });

        console.log('>>>>>');
    }
        
   
    
    
};

sendClickedHandler = ()=>{
    let app = database.ref(`${this.state.chatId}`);
        app.on('value', snapshot => {
            if(snapshot.val() !== null){
                this.getAllData(snapshot.val());
            }
        
        });
};

   
    render(){
        let messageNodes = this.state.messages.map((message) => {
            return (
                <Message key={uuidv4()} message={message.message} sender={message.senderId} owner={this.props.ownerId}/>
            )
          });
    
          
        return(
            <Layout style={{ padding: '15px 0', background: '#fff' }}>
            <UserList users={this.state.users} ownerId={this.props.ownerId} userClicked={(user)=>this.userClickedHandler(user)}/>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
             <Content style={{padding: '24px 24px 24px 24px', margin: '0px 0px 10px 0px', minHeight: 285 ,background:'#fff1f0'}}>
                {messageNodes}
             </Content>
             <Footer>
                 <MessageBox db={database} chatId={this.state.chatId} sendClicked={this.sendClickedHandler}/>
             </Footer>
           </Content>
         </Layout>
        );
    }
}

const mapStateToProps = state =>{
    console.log(state);
    return{
        ownerId:state.Register.ownerId,
        ownerName:state.Register.ownerName,
        email:state.Register.email,
        token:state.Register.token,
        auth:state.Auth.isAuth
    };
};
const mapDispatchToProps=dispatch=>{
    return{
        onAuth:(userId,userToken)=>dispatch(actionCreators.onAuth(userId,userToken))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Chat));