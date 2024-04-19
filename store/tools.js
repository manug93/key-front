//export const baseUrl="https://avatar-erp.com/backend/";


//export const baseUrl=process.env.NODE_ENV==='development'?'https://127.0.0.1:8000':process.env.BASE_URL;
export const baseUrl=process.env.NODE_ENV==='development'?process.env.BASE_URL:process.env.BASE_URL;
export const apiUrl=process.env.BASE_URL+'/api';
export const keybaseUrl=process.env.BASE_URL+'/keycafe';
export const stripebaseUrl=process.env.BASE_URL+'/stripe';

export const avatars = [
    "/assets/images/avatars/1.png",
    "/assets/images/avatars/2.png",
    "/assets/images/avatars/3.png",
    "/assets/images/avatars/4.png",
    "/assets/images/avatars/5.png",
    "/assets/images/avatars/6.png",
    "/assets/images/avatars/7.png",
    "/assets/images/avatars/8.png",
    "/assets/images/avatars/9.png",
    "/assets/images/avatars/10.png",
    "/assets/images/avatars/11.png",
    "/assets/images/avatars/12.png",
  ];


export function formatMoney(amount){    
    let amt=""+amount;
    var result="";
    var i=1;
    while(i<amt.length+1){
        if((amt.length-i)%3===0){ 
            result+=amt.substring(i-1,i)+" ";
        }else{
            result+=amt.substring(i-1,i);
        }
        i++;
    }
    return result;
}