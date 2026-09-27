import api from "./apiClient";

export const login = async (username, password) => {
    try {
        const response = await api.post("/auth/login", { username, password });
        const token =
            response.data?.token ||
            response.data?.jwt ||
            response.data?.accessToken ||
            response.data?.data?.token;

        if (token) {
            localStorage.setItem("token", token);
        }

        return {
            success: true,
            user: response.data.user,
            token,
        };
    } catch (error) {
        const message = error.response?.data?.message || "Login failed. Please try again.";
        return { success: false, message };
    }
}

export const logOut = async () => {
    try {
        await api.post("/auth/logout");
    } catch (error) {
        const message = error.response?.data?.message || "Logout failed. Please try again.";
        return { success: false, message };
    } finally {
        localStorage.removeItem("token");
    }
    return { success: true };
}

export const signUp = async (username, password, email) => {
    try {
        const response = await api.post("/auth/register", { username, password, email });
        const token =
            response.data?.token ||
            response.data?.jwt ||
            response.data?.accessToken ||
            response.data?.data?.token;

        if (token) {
            localStorage.setItem("token", token);
        }

        return {
            success: true,
            user: response.data.user,
            token,
        };
    } catch (error) {
        const message =
            error.response?.data?.message || "Signup failed. Please try again.";
        return { success: false, message };
    }
}

const authService = {
    login,
    logOut,
    signUp,
};

export default authService;