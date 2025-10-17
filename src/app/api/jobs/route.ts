import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  const apps = await prisma.application.findMany({
    where: { userId: user!.id },
    orderBy: { appliedAt: "desc" },
  });
  return NextResponse.json(apps);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, company, status, notes } = await req.json();
  if (!title || !company)
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  const app = await prisma.application.create({
    data: {
      title,
      company,
      status: status ?? "applied",
      notes,
      userId: user!.id,
    },
  });
  return NextResponse.json(app, { status: 201 });
}
