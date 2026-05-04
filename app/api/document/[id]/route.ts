import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse, type NextRequest } from "next/server";
import documents from "@/data/documents.json";
import { requireUser } from "@/lib/auth";
import type { CompanyDocument } from "@/lib/types";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await requireUser();
  const { id } = await params;
  const document = (documents as CompanyDocument[]).find(
    (item) => item.id === id,
  );

  if (!document) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }

  const fileName = path.basename(document.path);
  const filePath = path.join(process.cwd(), "public", "documents", fileName);
  const mode = request.nextUrl.searchParams.get("mode");

  try {
    const file = await readFile(filePath);
    return new NextResponse(file, {
      headers: {
        "content-type": "application/pdf",
        "content-disposition":
          mode === "download"
            ? `attachment; filename="${fileName}"`
            : `inline; filename="${fileName}"`,
      },
    });
  } catch {
    return new NextResponse(
      `Placeholder for ${document.title}. Add the real file at public/documents/${fileName}.`,
      {
        headers: {
          "content-type": "text/plain; charset=utf-8",
          "content-disposition":
            mode === "download"
              ? `attachment; filename="${fileName}.txt"`
              : "inline",
        },
      },
    );
  }
}
