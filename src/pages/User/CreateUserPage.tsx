import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../api/api";
import { toast } from "sonner";

export default function CreateUserPage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: ''
    })

    const createMutation = useMutation({
        mutationFn: (userData: typeof formData) => createUser(userData),
        onSuccess: () => {
            toast.success("User created successfully!");
            queryClient.invalidateQueries({ queryKey: ["users"] });
            navigate("/users");
        }
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        createMutation.mutate(formData);
    }
    
  return (
        <div className="w-full max-w-md mx-auto p-6 bg-white shadow-md rounded-2xl border border-gray-100 mt-6">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
                <h1 className="text-xl font-bold text-gray-800">Create User</h1>
                <button 
                    type="button"
                    onClick={() => navigate(`/users`)} 
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
                    disabled={createMutation.isPending}
                    className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 transition shadow-xs"
                >
                    {createMutation.isPending ? 'Saving changes...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
}