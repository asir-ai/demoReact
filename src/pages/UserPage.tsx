import { memo, useMemo, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../api/api';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types/user';
import { Plus } from 'lucide-react';

function UserPage () {
    const [searchQuery, setSearchQuery] = useState(''); 
    
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const { data = [], error, isPending, isError } = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: fetchUsers,
    });

    const filteredUsers = useMemo(() => {
        if (!debouncedSearchQuery) return data;
        
        return data.filter((user) => {
            return `${user.name}`.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
        });
    }, [debouncedSearchQuery, data]);

    // const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();
    const handleClick = (userId: string) => {
        navigate(`/users/${userId}`);
    }

    if (isPending) return <h2>Loading Content...</h2>
    if (isError) return <h2>Error Loading Content... {error?.message || "Unknown Error"}</h2>
    
    return (
        <div className='flex flex-col gap-4 items-center'>
            <div className='flex flex-row-reverse justify-between w-full items-center'>
                <input className='p-2 shadow-xs rounded-sm focus:outline-none' type="text" placeholder='Search users...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <h2>UserPage</h2>
                <button className='bg-blue-300 hover:bg-blue-500 rounded-md p-2 flex flex-row gap-2 cursor-pointer' onClick={() => navigate('/users/create')}>Create User <Plus/></button>
            </div>
            <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-y-4 gap-x-16'>
            {filteredUsers.length > 0 ? filteredUsers.map((user) => {
                    return(
                        <div className='cursor-pointer border-2 rounded-2xl p-3 wrap-break-word' key={user.id} onClick={() => handleClick(String(user.id))}>
                            <h2>{user.name}</h2>
                            <p>{user.username}</p>
                            <p>{user.email}</p>
                        </div>
                    )
                }) : (
                <p>No user found.</p>
            )}
            </div>
        </div>
    );
};

export default memo(UserPage);