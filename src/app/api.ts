import { setItem } from "./utils";

const baseurl = process.env.NEXT_PUBLIC_AUTH_SERVICE_BASE_URL;
const returnURL = process.env.NEXT_PUBLIC_RETURN_URL;
const headers = {
  "Content-Type": "application/json",
};

export const signIn = async (username: string, password: string, handleError: any) => {
  const url = `${baseurl}/auth/signin`;
  const payload = {
    username,
    password,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: headers,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Message: ${errorMessage}`
      );
    }

    const { jwtToken } = await response.json();
    setItem("JWT_TOKEN", jwtToken);

    window.location.href = returnURL ? returnURL :'';

  } catch (e) {
    console.log("error--", e);
    handleError();
  }
};

export const signup = async (
  name: string,
  email: string,
  mobileNo: string,
  username: string,
  password: string,
  handleError: any
) => {
  const url = `${baseurl}/auth/register`;
  const payload = {
    password,
    user: {
      name,
      email,
      mobileNo,
      username,
      password,
    },
  };

  try {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: headers,
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Message: ${errorMessage}`
      );
    }

    const { jwtToken } = await response.json();
    setItem("JWT_TOKEN", jwtToken);

    window.location.href = returnURL ? returnURL :'';

  } catch (e) {
    console.log("error--", e);
    handleError();
  }
};

export const isUsernameExists = async (username: string) => {
  const url = `${baseurl}/auth/exists/${username}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Message: ${errorMessage}`
      );
    }

    return true;

  } catch (e) {
    return false;
  }
};
