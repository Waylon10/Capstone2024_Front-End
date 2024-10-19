import axios from "axios";

export async function loginUser(loginData, isAdmin) {
  const url = isAdmin ? "http://localhost:5119/ecommerce/admin/login" : "http://localhost:5119/ecommerce/customer/login";
  try {
    const response = await axios.post(url, loginData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data; // Return the response data directly
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Handle invalid credentials error
      throw new Error("Invalid email or password.");
    } else {
      // Handle network or server errors
      throw new Error("Login failed. Please check your connection.");
    }
  }
}