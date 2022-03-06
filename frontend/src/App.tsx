import {
  AuthenticationResult,
  PublicClientApplication,
} from "@azure/msal-browser";
import "./App.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import { config } from "./Config";
import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

const App = () => {
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

  const [isAdult, setIsAdult] = useState<boolean | undefined>(undefined);

  const acquireToken = () => {
    const accessTokenRequest = {
      scopes: [
        "User.Read",
        "profile",
        "email",
        "Presence.Read",
        "offline_access",
      ],
    };

    client
      .acquireTokenSilent(accessTokenRequest)
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
    }).then((response: AxiosResponse) => {
      const age = response?.data?.value[0]?.ageGroup;
      setIsAdult(age == 3 ? true : false);
    });
  };

  useEffect(() => {
    if (!!!client) return;
    acquireToken();
  }, [client]);

  const login = async () => {
    const loginRequest = {
      scopes: [
        "User.Read",
        "profile",
        "email",
        "Presence.Read",
        "offline_access",
      ],
    };

    client.loginRedirect(loginRequest);
  };

  const logout = async () => {
    client.logoutRedirect();
  };

  return (
    <div className="App">
      <Navbar login={login} logout={logout} client={client} isAdult={isAdult} />
      <Home client={client} isAdult={isAdult} />
    </div>
  );
};

export default App;
