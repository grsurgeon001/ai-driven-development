import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

const UPLOAD_DIR = join(process.cwd(), "public", "uploads");

export async function saveFile(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // 파일 확장자 추출
  const ext = file.name.split(".").pop();
  const fileName = `${uuidv4()}.${ext}`;
  const filePath = join(UPLOAD_DIR, fileName);

  // 파일 저장
  await writeFile(filePath, buffer);

  // DB에 저장할 경로 반환
  return `/uploads/${fileName}`;
}

export async function saveClipboardImage(base64Data: string): Promise<string> {
  // base64 데이터에서 실제 이미지 데이터 추출
  const matches = base64Data.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);

  if (!matches || matches.length !== 3) {
    throw new Error("Invalid image data");
  }

  const imageType = matches[1];
  const imageData = matches[2];
  const buffer = Buffer.from(imageData, "base64");

  const fileName = `${uuidv4()}.${imageType}`;
  const filePath = join(UPLOAD_DIR, fileName);

  // 파일 저장
  await writeFile(filePath, buffer);

  // DB에 저장할 경로 반환
  return `/uploads/${fileName}`;
}
