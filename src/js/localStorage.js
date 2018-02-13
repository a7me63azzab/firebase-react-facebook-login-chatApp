export const getUserData=()=>{
    try{
        const serializedState=localStorage.getItem('userData');
        if(serializedState === null){
            return undefined;
        }
        return JSON.parse(serializedState);
    }catch(err){
        return undefined
    }
}

export const saveUserData=(userData)=>{
    try{
        const serializedState = JSON.stringify(userData);
        localStorage.setItem('userData',serializedState);
    }catch(err){
        console.log(err);
    };
};
