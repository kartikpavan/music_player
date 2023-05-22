import axios from "axios";

const baseURL = "http://localhost:3001";

// Validate the user using Token provided by Firebase
export async function validateUser(token) {
   try {
      const { data } = await axios.get(`${baseURL}/api/users/login`, {
         headers: { Authorization: "Bearer " + token },
      });
      return data;
   } catch (error) {
      console.log(error);
   }
}
