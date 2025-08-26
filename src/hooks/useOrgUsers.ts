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
      
  const response = await fetch('http://localhost:8080/users.php');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      // result.users is the array from PHP
      const orgUsers = Array.isArray(result.users)
        ? result.users.filter((user: User) => user.email.toLowerCase().endsWith('.org'))
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