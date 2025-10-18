import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        // Здесь можно проверять авторизацию, квоты и т.д.
        return {
          access: "public",                     // сейчас Blob поддерживает только public
          addRandomSuffix: true,                // добавляем случайный суффикс к имени
          allowedContentTypes: ["application/pdf"],
        };
      },
      onUploadCompleted: async ({ blob }) => {
        // будет вызвано Vercel'ем после загрузки
        console.log("Blob uploaded:", blob.url);
        // можно логировать в БД, если нужно
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 } // важно: код != 200 заставит Vercel повторить callback
    );
  }
}
