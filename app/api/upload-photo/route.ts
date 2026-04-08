import { put } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"
export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      console.error("[v0] No file provided in request")
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      console.error("[v0] File too large:", file.name, file.size, "bytes")
      return NextResponse.json(
        { error: `File too large: ${(file.size / 1024 / 1024).toFixed(2)}MB (max 10MB)` },
        { status: 400 },
      )
    }

    console.log("[v0] Uploading file to Blob:", file.name, `${(file.size / 1024 / 1024).toFixed(2)}MB`, file.type)

    const uploadTimeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Upload timeout after 30 seconds")), 30000),
    )

    const uploadPromise = put(file.name, file, {
      access: "public",
      addRandomSuffix: true,
    })

    const blob = (await Promise.race([uploadPromise, uploadTimeout])) as Awaited<typeof uploadPromise>

    console.log("[v0] File uploaded successfully to Blob:", blob.url)

    return NextResponse.json({
      url: blob.url,
      filename: file.name,
      size: file.size,
      type: file.type,
    })
  } catch (error) {
    console.error("[v0] Upload error:", error)
    const errorMessage = error instanceof Error ? error.message : "Upload failed"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
