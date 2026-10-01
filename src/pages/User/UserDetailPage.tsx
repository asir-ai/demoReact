import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import type { User } from "../../types/user";
import { useNavigate, useParams } from "react-router-dom";
import { deleteUser, fetchUserById } from "../../api/api";
import { toast } from "sonner";

export default function UserDetailPage() {
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();
    
    const { data: user, isPending, isError, error } = useQuery<User>({
        queryKey: ["user", userId],
        queryFn: () => fetchUserById(userId!),
        enabled: !!userId,
    });

    const queryClient = new QueryClient();

    const deleteMutation = useMutation({
        mutationFn: () => deleteUser(String(userId)),
        onSuccess: () => {
            toast.success("User profile deleted successfully.");
            queryClient.invalidateQueries({ queryKey: ["users"] });
            navigate('/users');
        }
    });

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to permanently delete this user?")) {
            deleteMutation.mutate();
        }
    };

    if (isPending) {
        return (
            <div className="flex h-64 items-center justify-center">
                <h2 className="text-xl font-medium text-gray-600 animate-pulse">Loading profile settings...</h2>
            </div>
        );
    }

    if (isError || !user) {
        return (
            <div className="flex flex-col items-center gap-4 p-8 text-center">
                <h2 className="text-xl font-semibold text-red-600">
                    Error Loading User: {error?.message || "User profile not found"}
                </h2>
                <button
                    onClick={() => navigate('/users')}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition"
                >
                    Back to Users List
                </button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-white shadow-md rounded-2xl border border-gray-100 mt-6">
            {/* Header Actions */}
            <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
                <button
                    onClick={() => navigate('/users')}
                    className="text-sm font-medium text-gray-500 hover:text-gray-800 transition flex items-center gap-1"
                >
                    ← Back to List
                </button>
                <h1 className="text-xl font-bold text-gray-800">User Profile</h1>
                <button
                    onClick={() => navigate(`/users/${userId}/edit`)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl shadow-xs transition"
                >
                    Edit Profile
                </button>
                <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-xl shadow-xs transition"
                >
                    Delete Profile
                </button>
            </div>

            {/* Profile Info Card */}
            <div className="space-y-6">
                <div className="flex items-center justify-around gap-4">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 flex items-center justify-center rounded-full text-2xl font-bold uppercase">
                        {user?.name}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{`${user?.name}`}</h2>
                        <p className="text-sm text-gray-500">{'Member'}</p>
                    </div>
                </div>

                {/* Data Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-50 pt-6">
                    <div>
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</label>
                        <p className="text-gray-700 mt-1 font-medium">{user.email}</p>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Phone Number</label>
                        <p className="text-gray-700 mt-1 font-medium">{'N/A'}</p>
                    </div>
                    {/* {user.company && (
                        <div className="md:col-span-2">
                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Company</label>
                            <p className="text-gray-700 mt-1 font-medium">{user.company.name}</p>
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    );
}