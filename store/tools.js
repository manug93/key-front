//export const baseUrl="https://avatar-erp.com/backend/";
export const apiUrl="https://www.keyapi.cnone-tech.com/api";
export const keybaseUrl="https://www.keyapi.cnone-tech.com/keycafe";
export const stripebaseUrl="https://www.keyapi.cnone-tech.com//stripe";
export const baseUrl="https://www.keyapi.cnone-tech.com/";

/*
export const apiUrl="https://127.0.0.1:8000/api";
export const keybaseUrl="https://127.0.0.1:8000/keycafe";
export const stripebaseUrl="https://127.0.0.1:8000/stripe";
export const baseUrl="https://127.0.0.1:8000";*/


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