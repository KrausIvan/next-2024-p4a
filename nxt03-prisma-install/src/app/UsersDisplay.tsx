"use client"

import React, { useState, useEffect } from 'react';
import { User } from '@prisma/client';

const UsersDisplay = () => {
    const [data, setData] = useState<User>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const fetchData = async () => {
        try {
            const response = await fetch('/api/users');
            const data = await response.json();
            setData(data);
        } catch (error) {
            if (error instanceof Error) {
                setError(error);
            }
            else {
                setError(new Error('An unknown error occurred'));
            }
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    return (
        <div>
            <h1>Users</h1>
            {data.map((user: User) => (
                <div key={user.id}>{user.email}</div>
            ))}
        </div>
    );
}

export default UsersDisplay;