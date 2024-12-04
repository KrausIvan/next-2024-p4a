import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';
import { type ListResult } from '@/types/results';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name') || '';
  const sortBy = searchParams.get('sortBy') || 'name';
  const order = searchParams.get('order') || 'asc';
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');

  try {
    const allowedSortFields = ['name', 'id'];
    if (!allowedSortFields.includes(sortBy)) {
      return NextResponse.json(
        { error: `Invalid sort field: ${sortBy}` },
        { status: 400 }
      );
    }

    const classesFilter = {
      where: {
        name: { contains: name },
      },
    };

    const totalClasses = await prisma.class.count();
    const filteredCount = await prisma.class.count(classesFilter);

    const classes = await prisma.class.findMany({
      ...classesFilter,
      orderBy: { [sortBy]: order },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const response: ListResult<typeof classes> = {
        total: totalClasses,
        filtered: filteredCount,
        page,
        size: pageSize,
        data: classes,
      };
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching classes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch classes' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { name } = await request.json();

  try {
    const newClass = await prisma.class.create({
      data: {
        name,
      },
    });
    return NextResponse.json(newClass, { status: 201 });
  } catch (error) {
    console.error('Error creating class:', error);
    return NextResponse.json(
      { error: 'Failed to create class' },
      { status: 500 }
    );
  }
}