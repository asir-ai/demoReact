import axios from "axios";
import { toast } from "sonner";
import type { User } from "../types/user";

const api = axios.create({
    baseURL: import.meta.env.BACKEND_URL,
});

export const fetchUsers = async () => {
    try {
        const res = await api.get('/user');
        return res.status === 200 ? res.data : [];
    } catch (error) {
        toast.error(`Error fetching users: ${error}`);
        throw error;
    }
};

export const fetchUserById = async (userId: string) => {
    try {
        const res = await api.get(`/user/${userId}`);
        return res.data;
    } catch (error) {
        toast.error(`Error fetching user details: ${error}`);
        throw error;
    }
}

export const editUser = async (userId: string, userData: Partial<User>) => {
    try {
        const res = await api.patch(`/user/${userId}`, userData);
        return res.data;
    } catch (error) {
        toast.error(`Error updating user: ${error}`);
        throw error;
    }
}

export const checkoutUser = async (userId: string, userData: Partial<User>) => {
    try {
        const res = await api.post(`/user/${userId}/checkout`, userData);
        return res.data;
    } catch (error) {
        toast.error(`Error during checkout: ${error}`);
        throw error;
    }
}

export const createUser = async (userData: Omit<User, 'id'>) => {
    try {
        const res = await api.post('/user', userData);
        return res.data;
    } catch (error) {
        toast.error(`Error creating new user: ${error}`);
        throw error;
    }
}

export const deleteUser = async (userId: string) => {
    try {
        const res = await api.delete(`/user/${userId}`);
        return res.data;
    } catch (error) {
        toast.error(`Error deleting user: ${error}`);
        throw error;
    }
}