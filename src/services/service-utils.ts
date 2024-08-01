import useAuth from "../stores/useAuth";

export const getAccessCredential = () => {
  const access = useAuth.getState().access;
  if (!!access) return access;
  return localStorage.getItem("access");
};
