import axios from "../../api/config";
import { loadUser, removeUser } from "../reducers/userSlice";

export const asyncsignupuser = (user) => async (dispatch, getState) => {
  try {
    await axios.post("/users", user);
  } catch (error) {
    console.error("Error during user signup:", error);
  }
};

export const asynccurrentuser = () => async (dispatch, getState) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(loadUser(user));
    } else {
      console.log("No user found!!!");
    }
  } catch (error) {
    console.error("Error fetching current user:", error);
  }
};

export const asyncsigninuser = (user, onSuccess, onError) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `/users?email=${user.email}&password=${user.password}`
    );
    if (data[0]) {
      localStorage.setItem("user", JSON.stringify(data[0]));
      dispatch(asynccurrentuser());
       if (onSuccess) onSuccess();
    } else {
      console.error("Invalid email or password");
      alert("Invalid email or password");
      if (onError) onError();
    }
  } catch (error) {
    console.error("Error during user signin:", error);
  }
};

export const asyncupdateuser = (id, user) => async (dispatch) => {
  try {
    const { data } = await axios.patch(
      `/users/${id}`, user);
      localStorage.setItem("user", JSON.stringify(data));
      dispatch(asynccurrentuser());
      
  } catch (error) {
    console.error("Error during user signin:", error);
  }
};

export const asyncdeleteuser = (id) => async (dispatch) => {
  try {
     await axios.delete(`/users/${id}`);
     localStorage.removeItem("user");
     dispatch(removeUser());
  } catch (error) {
    console.error("Error during user deletion:", error);
  }
};

export const asynclogoutuser = () => async (dispatch) => {
  try {
    localStorage.removeItem("user");
    dispatch(removeUser());
  } catch (error) {
    console.error("Error during user logout:", error);
  }
};
