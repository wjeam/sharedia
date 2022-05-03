import { PublicClientApplication } from "@azure/msal-browser";
import "./App.css";
import Home from "./components/Home/Home";
import { config } from "./Config";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

const client = new PublicClientApplication({
  auth: {
    clientId: config.clientId,
    redirectUri: config.redirectUri,
    authority: config.authority,
  },
  cache: {
    cacheLocation: "sessionStorage",
    secureCookies: true,
    storeAuthStateInCookie: true,
  },
});

const App = () => {
  const loginRequest = {
    scopes: [
      "User.Read",
      "profile",
      "email",
      "Presence.Read",
      "offline_access",
    ],
  };

  const accessTokenRequest = {
    scopes: [
      "User.Read",
      "profile",
      "email",
      "Presence.Read",
      "offline_access",
    ],
  };

  const [isAdult, setIsAdult] = useState<boolean | null>(null);

  const acquireToken = () => {
    client
      ?.acquireTokenSilent(accessTokenRequest)
      .then((accessTokenResponse: any) => {
        fetchAge(accessTokenResponse?.accessToken);
      });
  };

  const fetchAge = (token: string) => {
    axios({
      method: "GET",
      url: "https://graph.microsoft.com/v1.0/users?$select=ageGroup",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response: AxiosResponse) => {
        const age = response?.data?.value[0]?.ageGroup;
        setIsAdult(age == 3 ? true : false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (client === null) return;

    if (client?.getAllAccounts().length === 0) {
      console.log(client?.getActiveAccount());
      console.log(client?.getAllAccounts());
      setIsAdult(false);
    } else {
      acquireToken();
    }
  }, [client]);

  const login = async () => {
    client?.loginRedirect(loginRequest);
  };

  const logout = async () => {
    client?.logoutRedirect();
  };

  return (
    <div className="App">
      <Home client={client} isAdult={isAdult} login={login} logout={logout} />
    </div>
  );
};

export default App;
