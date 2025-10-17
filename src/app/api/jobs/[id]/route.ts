import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET a single job by ID
export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  const job = await prisma.application.findUnique({
    where: { id },
  });

  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  return NextResponse.json(job);
}

// PATCH (update) a job by ID
export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const data = await request.json();

  try {
    const updatedJob = await prisma.application.update({
      where: { id },
      data,
    });
    return NextResponse.json(updatedJob);
  } catch (error) {
    return NextResponse.json({ error: "Error updating job" }, { status: 500 });
  }
}

// DELETE a job by ID
export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  try {
    await prisma.application.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Job deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting job" }, { status: 500 });
  }
}
