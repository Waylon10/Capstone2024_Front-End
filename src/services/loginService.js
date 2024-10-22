import axios from "axios";

export async function loginUser(loginData, isAdmin) {
  const url = isAdmin ? "http://localhost:5119/ecommerce/admin/login" : "http://localhost:5119/ecommerce/customer/login";

  try {
    const response = await axios.post(url, loginData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: false // No credentials in this case
    });

    console.log("Axios response:", response);

    return response.data;
  } catch (error) {
    console.log("Axios error:", error);
    if (error.response && error.response.status === 401) { // Troubleshoot default sign-in
      return { error: "Invalid email or password." };
    } else {
      return { error: "Login failed. Please check your connection." };
    }
  }
}