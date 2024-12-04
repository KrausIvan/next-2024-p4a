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

    return NextResponse.json(classInfo);
}

export async function PUT(request: NextRequest, {params}: {params: {id: number}}) {
    const id = Number(params.id);
    const { name } = await request.json();

    const updatedClass = await prisma.class.update({
        where: { id },
        data: { name },
    });

    return NextResponse.json(updatedClass);
}

export async function DELETE(request: NextRequest, {params}: {params: {id: number}}) {
    const id = Number(params.id);

    const deletedClass = await prisma.class.delete({
        where: { id },
    });

    return NextResponse.json(deletedClass);
}