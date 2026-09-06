import api from "./apiClient";

export const login = async (username, password) => {
    try {
        const response = await api.post("/auth/login", { username, password });
        return { success: true, user: response.data.user }

    } catch (error) {
        const message = error.response?.data?.message || "Login failed. Please try again.";
        return { success: false, message };
    }
}

export const logOut = async () => {
    try {
        await api.post("/auth/logout");
        return { success: true };
    } catch (error) {
        const message = error.response?.data?.message || "Logout failed. Please try again.";
        return { success: false, message };
    }
}

export const signUp = async (username, password, email) => {
    try {
        const response = await api.post("/auth/register", { username, password, email });

        return { success: true, user: response.data.user }
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