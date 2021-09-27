import { createSlice, PayloadAction  } from "@reduxjs/toolkit"
import authOperations from "./auth-operations"

interface ISubmitData {
  id: string | null;
  email: string | null;
};

type TToken = string | null;
type TRefreshToken = string | null;
type TSid = string | null;
type TIsLoggedIn = boolean;

export interface IAuthInitialState {
  user: ISubmitData;
  token: TToken;
  refreshToken: TRefreshToken;
  sid: TSid;
  isLoggedIn: TIsLoggedIn;
  isFetchingCurrentUser: TIsLoggedIn,
}

interface IAuthData {
  data: ISubmitData;
  accessToken: TToken;
  refreshToken: TRefreshToken;
  sid: TSid;
  isLoggedIn: TIsLoggedIn;
}

interface IAuthNewData {
  newAccessToken: TToken;
  newRefreshToken: TRefreshToken;
  newSid: TSid;
  isLoggedIn: TIsLoggedIn;
}

interface IIsFetching {
  isFetchingCurrentUser:TIsLoggedIn
}



const initialState: IAuthInitialState = {
  user: { id: null, email: null },
  token: null,
  refreshToken: null,
  sid: null,
  isLoggedIn: false,
  isFetchingCurrentUser: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    projectRejected: () => initialState,
  },
  extraReducers: {
    // [authOperations.register.fulfilled](state, action) {},

    [authOperations.logIn.fulfilled](state: IAuthInitialState, action: PayloadAction<IAuthData>) {
      state.user.id = action.payload.data.id
      state.user.email = action.payload.data.email
      state.token = action.payload.accessToken
      state.sid = action.payload.sid
      state.refreshToken = action.payload.refreshToken
      state.isLoggedIn = true
    },
    [authOperations.logOut.fulfilled](state: IAuthInitialState, action: PayloadAction<IAuthData>) {
      state.user = { id: null, email: null }
      state.token = null
      state.refreshToken = null
      state.isLoggedIn = false
      state.sid = null
    },
    [authOperations.refreshToken.pending](state: IIsFetching, action: PayloadAction<TIsLoggedIn>) {
      state.isFetchingCurrentUser = true;
    },
    [authOperations.refreshToken.rejected](state: IIsFetching, action: PayloadAction<TIsLoggedIn>) {
      state.isFetchingCurrentUser = false;
    },
    [authOperations.refreshToken.fulfilled](state: IAuthInitialState, action: PayloadAction<IAuthNewData>) {
      state.token = action.payload.newAccessToken
      state.refreshToken = action.payload.newRefreshToken
      state.sid = action.payload.newSid
      state.isLoggedIn = true
      state.isFetchingCurrentUser = false
    },
  },
})

export const { projectRejected } = authSlice.actions
export default authSlice.reducer
