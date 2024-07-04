export const searchUser = async (userName:string)=>{
    try {
        const findUser = await fetch(`api/searchusers?id=${userName}`);
        const users = await findUser.json();
        return users;
    } catch (error:any) {
        console.error(error," Issue while searching user")
        return
    }
};

export const getUser = async(userId:number)=>{
    try {
        const getUser = await fetch(`/api/user?id=${userId}`);
          const data = await getUser.json();
          return data;
    } catch (error:any) {
        console.error(error," Issue while getting user details")
        return
    }
};

export const registerUser=  async(username:string , email:string, phonenumber:string)=>{
    try {
        const dataToSubmit= {
            username,email,phonenumber
        }
        const response = await fetch("/api/adduser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSubmit),
          });
    } 
    catch (error:any) {
        
    }
}