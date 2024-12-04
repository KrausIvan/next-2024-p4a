"use client"

import React, { useState, useEffect } from 'react';
import { Student } from '@prisma/client';
import { ListResult } from '@/types/results';

const StudentsTable = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    
    const fetchData = async (name: string | null, classId: number | null, className: string | null, order: string | null, sort: "asc" | "desc" | null) => {
        setLoading(true);
        try {
            const response = await fetch('/api/students?name=' + (name ?? "") + '&classId=' + (classId ?? "") + '&className=' + (className ?? "") + '&order=' + (order ?? "") + '&sort=' + (sort ?? ""));
            const data = await response.json();
            console.log(data);
            setStudents(data.data);
        } catch (error) {
            if (error instanceof Error) {
                setError(error);
            } else {
                setError(new Error('An unknown error occurred'));
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(null, null, null, null, null);
    }, []);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Class</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {loading && (
                        <tr>
                            <td colSpan={3}>Loading...</td>
                        </tr>
                    )}
                    {error && (
                        <tr>
                            <td colSpan={3}>{error.message}</td>
                        </tr>
                    )}
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.classId}</td>
                            <td>{student.age}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default StudentsTable;