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

// get All Users
export async function fetchAllUsers() {
   try {
      const { data } = await axios.get(`${baseURL}/api/users/allUsers`);
      return data;
   } catch (error) {
      console.log(error);
      return null;
   }
}

// get All Artists
export async function fetchAllArtists() {
   try {
      const { data } = await axios.get(`${baseURL}/api/artists/all`);
      return data;
   } catch (error) {
      console.log(error);
      return null;
   }
}

// get All Albums
export async function fetchAllAlbums() {
   try {
      const { data } = await axios.get(`${baseURL}/api/albums/all`);
      return data;
   } catch (error) {
      console.log(error);
      return null;
   }
}

// get All Songs
export async function fetchAllSongs() {
   try {
      const { data } = await axios.get(`${baseURL}/api/songs/all`);
      return data;
   } catch (error) {
      console.log(error);
      return null;
   }
}

// change User Role
export async function changeUserRole(userId, role) {
   try {
      const { data } = await axios.put(`${baseURL}/api/users/updateRole/${userId}`, {
         data: { role },
      });
      return data;
   } catch (error) {
      console.log(error);
      return null;
   }
}

// Delete user
export async function deleteSingleUser(userId) {
   try {
      const { data } = await axios.delete(`${baseURL}/api/users/delete/${userId}`);
      return data;
   } catch (error) {
      console.log(error);
      return null;
   }
}
