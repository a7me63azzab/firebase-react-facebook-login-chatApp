import React, {Component} from "react";
import { Layout,Menu } from 'antd';
import _ from "lodash";
import uuidv4 from "uuid/v4";

const {Sider } = Layout;

class UserList extends Component{

    
    render(){
        let allUsersWithoutCurrentUser = _.filter(this.props.users,(user)=> { return (user.id !== this.props.ownerId)});
          console.log('allUsersWithoutCurrentUser:',allUsersWithoutCurrentUser);
          let usersList = allUsersWithoutCurrentUser.map(user => {
              return(
                <Menu.Item key={uuidv4()} ><span  onClick={()=>this.props.userClicked(user)}>{user.name}</span></Menu.Item>
              );
          });
        return(
            <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
            >
                {usersList}
            </Menu>
          </Sider>
        );
    }
};

export default UserList;