import prisma from '@/libs/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { StudentWithClass } from '@/types/entities';

export async function GET(request: NextRequest, {params}: {params: {id: number}}) {
    const id = Number(params.id);

    const studentInfo: StudentWithClass = await prisma.student.findUnique({
        where: { id },
        include: { class: true },
    });

    if (!studentInfo) {
        return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json(studentInfo);
}

export async function PUT(request: NextRequest, {params}: {params: {id: number}}) {
    const id = Number(params.id);
    const { name, age, classId } = await request.json();

    const updatedStudent = await prisma.student.update({
        where: { id },
        data: { name, age, classId },
    });

    return NextResponse.json(updatedStudent);
}

export async function DELETE(request: NextRequest, {params}: {params: {id: number}}) {
    const id = Number(params.id);

    const deletedStudent = await prisma.student.delete({
        where: { id },
    });

    return NextResponse.json(deletedStudent);
}