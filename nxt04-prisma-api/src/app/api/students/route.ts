import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';
import { type ListResult } from '@/types/results';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name') || '';
    const sortBy = searchParams.get('sortBy') || 'name';
    const order = searchParams.get('order') || 'asc';
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');

    const allowedSortFields = ['name', 'id'];
    if (!allowedSortFields.includes(sortBy)) {
        return NextResponse.json({ error: `Invalid sort field: ${sortBy}` }, { status: 400 });
    }

    const studentsFilter = {
        where: {
            name: { contains: name },
        },
    };

    const totalStudents = await prisma.student.count();
    const filteredCount = await prisma.student.count(studentsFilter);

    const students = await prisma.student.findMany({
        ...studentsFilter,
        orderBy: { [sortBy]: order },
        skip: (page - 1) * pageSize,
        take: pageSize,
    });

    const response: ListResult<typeof students> = {
        total: totalStudents,
        filtered: filteredCount,
        page,
        size: pageSize,
        data: students,
    };

    return NextResponse.json(response);
}

export async function POST(request: Request) {
    const { name, age, classId } = await request.json();

    try {
        const student = await prisma.student.create({
            data: {
                name,
                age,
                classId,
            },
        });
        return NextResponse.json(student, { status: 201 });
    } catch (error) {
        console.error('Error creating student:', error);
        return NextResponse.json({ error: 'Failed to create student' }, { status: 500 });
    }
}