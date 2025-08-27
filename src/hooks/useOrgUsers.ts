import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}


interface UseOrgUsersReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useOrgUsers = (): UseOrgUsersReturn => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use environment variable for API URL or fallback to localhost for development
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? 'https://assessment-2-ixst.onrender.com/api/users'
        : 'http://localhost:3001/api/users';
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      // result.data is the array from Node.js API
      const orgUsers = Array.isArray(result.data)
        ? result.data.filter((user: User) => user.email.toLowerCase().endsWith('.org'))
        : [];
      setUsers(orgUsers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const refetch = () => {
    fetchUsers();
  };

  return { users, loading, error, refetch };
};