import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { checkoutUser, editUser, fetchUserById } from "../../api/api";
import { useEffect, useState, type FormEvent } from "react";
import type { User } from "../../types/user";
import { toast } from "sonner";

export default function EditUserPage() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: ''
    });

    const { data: user, isPending, isError } = useQuery<User>({
        queryKey: ["user", userId],
        queryFn: () => fetchUserById(userId!),
        enabled: !!userId,
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                username: user.username || '',
                email: user.email || ''
            });
        }
    }, [user]);

    const editMutation = useMutation({
        mutationFn: (updatedData: Partial<User>) => editUser(userId!, updatedData),
        onSuccess: () => {
            toast.success("User updated successfully!");
            queryClient.invalidateQueries({ queryKey: ["user"] });
            queryClient.invalidateQueries({ queryKey: ["user", userId] });

            navigate(`/users/${userId}`);
        }
    });

    const checkoutMutation = useMutation({
        mutationFn: (updatedData: Partial<User>) => checkoutUser(userId!, updatedData),
        onSuccess: (data) =>{
            if (data.url) {
                window.location.href = data.url;
            }
            toast.success("Checkout successful!");
            queryClient.invalidateQueries({ queryKey: ["user"] });
            queryClient.invalidateQueries({ queryKey: ["user", userId] });
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // editMutation.mutate(formData);
        checkoutMutation.mutate(formData);
    };
    
    if (isPending) return <h2 className="text-center mt-10">Loading profile data...</h2>;
    if (isError) return <h2 className="text-center text-red-500 mt-10">Failed to load user form.</h2>;

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white shadow-md rounded-2xl border border-gray-100 mt-6">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
                <h1 className="text-xl font-bold text-gray-800">Edit Profile</h1>
                <button 
                    type="button"
                    onClick={() => navigate(`/users/${userId}`)} 
                    className="text-sm font-medium text-gray-400 hover:text-gray-600 transition"
                >
                    Cancel
                </button>
            </div>

            <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={checkoutMutation.isPending}
                    className="w-full py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400 transition shadow-xs"
                >
                    {checkoutMutation.isPending ? 'Processing checkout...' : 'Checkout'}
                </button>
            </form>
        </div>
    );
}