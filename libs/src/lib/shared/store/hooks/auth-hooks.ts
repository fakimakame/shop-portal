import { useDispatch,TypedUseSelectorHook, useSelector } from "react-redux";
import { AuthDispatch, AuthState } from "../index-store";

export const useAuthDispatch = () => useDispatch<AuthDispatch>()
export const useAuthSelector:TypedUseSelectorHook<AuthState> = useSelector