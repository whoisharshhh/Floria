import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const { frameNum, dataUrl, dirName } = await req.json();
    const base64Data = dataUrl.replace(/^data:image\/jpeg;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    const folder = dirName || "frames-part1";
    const dir = path.join(process.cwd(), "public", folder);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const filePath = path.join(dir, `frame-${frameNum}.jpg`);
    fs.writeFileSync(filePath, buffer);
    return NextResponse.json({ success: true, frameNum });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
