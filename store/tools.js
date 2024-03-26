//export const baseUrl="https://avatar-erp.com/backend/";
export const baseUrl="https://127.0.0.1:8000";


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