import { AccountInfo, PublicClientApplication } from "@azure/msal-browser";
import axios, { AxiosResponse } from "axios";
import React, {
  FC,
  createContext,
  useReducer,
  useEffect,
  Reducer,
} from "react";
import { config } from "./Config";

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

export const initialValues: any = {
  client: client,
  isAdult: false,
  loggedUser: client?.getActiveAccount(),
};

export const AppContext = createContext(initialValues);

const accessTokenRequest = {
  scopes: ["User.Read", "profile", "email", "Presence.Read", "offline_access"],
};

type State = {
  client: PublicClientApplication | undefined;
  isAdult: boolean;
  loggedUser: AccountInfo | undefined;
};

type Action = {
  type: "login" | "logout" | "refresh" | "loggedIn";
  payload: any;
};

const fetchAgeFromGraphAPI = (token: string) => {
  axios({
    method: "GET",
    url: "https://graph.microsoft.com/v1.0/users?$select=ageGroup",
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((response: AxiosResponse) => {
    const age = response?.data?.value[0]?.ageGroup;
    return age == 3 ? true : false;
  });
};

const fetchAge = () => {
  client
    .acquireTokenSilent(accessTokenRequest)
    .then((accessTokenResponse: any) => {
      return fetchAgeFromGraphAPI(accessTokenResponse?.accessToken);
    });
};

const reducer: any = (state: State, action: Action) => {
  switch (action.type) {
    case "login":
      client.setActiveAccount(action.payload);
      return { ...state, loggedUser: client.getAllAccounts()[0] };
    case "logout":
      client.setActiveAccount(null);
      return { ...state, loggedUser: undefined };
    case "refresh":
      return { ...state, loggedUser: client.getAllAccounts()[0] };

    default:
      return state;
  }
};

const AppProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    reducer,
    initialValues
  );

  useEffect(() => {
    dispatch({ type: "refresh", payload: null });
  }, []);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
