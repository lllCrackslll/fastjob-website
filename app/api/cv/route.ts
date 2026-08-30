import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createEmptyCvData, parseCvData, type CvData } from "@/lib/cv-types";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email")?.trim().toLowerCase();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    const cv = await prisma.cv.findUnique({ where: { email } });

    if (!cv) {
      return NextResponse.json({ cv: null });
    }

    return NextResponse.json({
      cv: {
        id: cv.id,
        email: cv.email,
        title: cv.title,
        templateId: cv.templateId,
        data: parseCvData(cv.data),
        updatedAt: cv.updatedAt.toISOString(),
        createdAt: cv.createdAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("[GET /api/cv]", error);
    return NextResponse.json(
      { error: "Impossible de charger le CV" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      title?: string;
      templateId?: string;
      data?: CvData;
    };

    const email = body.email?.trim().toLowerCase();
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    if (!body.data) {
      return NextResponse.json({ error: "Données CV manquantes" }, { status: 400 });
    }

    const title = body.title?.trim() || "Mon CV";
    const templateId = body.templateId || "classic";
    const dataJson = JSON.stringify(body.data);

    const cv = await prisma.cv.upsert({
      where: { email },
      create: {
        email,
        title,
        templateId,
        data: dataJson,
      },
      update: {
        title,
        templateId,
        data: dataJson,
      },
    });

    return NextResponse.json({
      cv: {
        id: cv.id,
        email: cv.email,
        title: cv.title,
        templateId: cv.templateId,
        data: parseCvData(cv.data),
        updatedAt: cv.updatedAt.toISOString(),
        createdAt: cv.createdAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("[PUT /api/cv]", error);
    return NextResponse.json(
      { error: "Impossible d'enregistrer le CV" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; name?: string };
    const email = body.email?.trim().toLowerCase();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    const existing = await prisma.cv.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Un CV existe déjà pour cet utilisateur" },
        { status: 409 }
      );
    }

    const data = createEmptyCvData(email, body.name ?? "");
    const cv = await prisma.cv.create({
      data: {
        email,
        title: "Mon CV",
        templateId: "classic",
        data: JSON.stringify(data),
      },
    });

    return NextResponse.json({
      cv: {
        id: cv.id,
        email: cv.email,
        title: cv.title,
        templateId: cv.templateId,
        data,
        updatedAt: cv.updatedAt.toISOString(),
        createdAt: cv.createdAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("[POST /api/cv]", error);
    return NextResponse.json(
      { error: "Impossible de créer le CV" },
      { status: 500 }
    );
  }
}
