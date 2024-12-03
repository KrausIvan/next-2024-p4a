import prisma from '@/libs/prisma';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest, {params}: {params: {id: number}}) {
    const id = Number(params.id);

    const classInfo = await prisma.class.findUnique({
        where: { id },
    });

    if (!classInfo) {
        return NextResponse.json({ error: 'Class not found' }, { status: 404 });
    }

    const students = await prisma.student.findMany({
        where: { classId: id },
    });

    return NextResponse.json(students);
}