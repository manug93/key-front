//export const baseUrl="https://avatar-erp.com/backend/";
/*
export const apiUrl="https://keyapp.cnone-tech.com/backend/public/api";
export const keybaseUrl="https://keyapp.cnone-tech.com/backend/public/keycafe";
export const stripebaseUrl="https://keyapp.cnone-tech.com/backend/public/stripe";
export const baseUrl="https://keyapp.cnone-tech.com/backend/public";
*/
export const apiUrl=process.env.API_BASE_URL;
export const keybaseUrl=process.env.KEYCAFE_BASE_URL;
export const stripebaseUrl=process.env.STRIPE_BASE_URL;
export const baseUrl=process.env.BASE_URL;

/*
export const apiUrl="https://127.0.0.1:8000/api";
export const keybaseUrl="https://127.0.0.1:8000/keycafe";
export const stripebaseUrl="https://127.0.0.1:8000/stripe";
export const baseUrl="https://127.0.0.1:8000";
*/


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