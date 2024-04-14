export const PREFIX = 'SMART_SIGNIN_';

export const setItem = (key: string, value: any)=>{
   const json = JSON.stringify(value);
   localStorage.setItem(`${PREFIX}${key}`, json);
}

export const getItem = (key: string)=>{
    const json = localStorage.getItem(`${PREFIX}${key}`);
    return json && JSON.parse(json);
}