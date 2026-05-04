import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse, type NextRequest } from "next/server";
import documents from "@/data/documents.json";
import { requireUser } from "@/lib/auth";
import type { CompanyDocument } from "@/lib/types";

const contentTypes: Record<string, string> = {
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

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

  const relativeDocumentPath = document.path.replace(/^\/documents\//, "");
  const fileName = path.basename(relativeDocumentPath);
  const documentsRoot = path.join(process.cwd(), "public", "documents");
  const filePath = path.join(documentsRoot, relativeDocumentPath);
  const mode = request.nextUrl.searchParams.get("mode");

  if (!filePath.startsWith(documentsRoot)) {
    return NextResponse.json({ error: "Invalid document path" }, { status: 400 });
  }

  try {
    const file = await readFile(filePath);
    const extension = path.extname(fileName).toLowerCase();
    return new NextResponse(file, {
      headers: {
        "content-type": contentTypes[extension] ?? "application/octet-stream",
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
