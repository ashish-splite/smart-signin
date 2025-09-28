const PREFIX = "SMART_SIGNIN_";

export const setItem = (key: string, value: any) => {
  const json = JSON.stringify(value);
  localStorage.setItem(`${PREFIX}${key}`, json);
};

export const getItem = (key: string) => {
  const json = localStorage.getItem(`${PREFIX}${key}`);
  return json && JSON.parse(json);
};

export const saveReturnUrl = (url: string) => {
  localStorage.setItem("RETURN_URL", url);
};

export const sendJwtToParent = (jwt: string) => {
  const returnURL = getItem("RETURN_URL");
  window.parent.postMessage({ jwt }, returnURL);
};
