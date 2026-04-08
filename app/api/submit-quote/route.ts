import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const runtime = "nodejs"
export const maxDuration = 60
export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const address = formData.get("address") as string
    const notes = formData.get("notes") as string

    const photoUrls = formData.getAll("photoUrls") as string[]

    console.log("[v0] API Route - Processing submission:", {
      name,
      email,
      phone,
      address,
      photoCount: photoUrls.length,
    })

    const attachments = await Promise.all(
      photoUrls.map(async (url, index) => {
        try {
          const response = await fetch(url)
          const arrayBuffer = await response.arrayBuffer()
          const buffer = Buffer.from(arrayBuffer)
          const base64 = buffer.toString("base64")

          const filename = url.split("/").pop() || `photo-${index + 1}.jpg`

          return {
            filename,
            content: base64,
          }
        } catch (error) {
          console.error(`[v0] Failed to fetch image ${index + 1}:`, error)
          return null
        }
      }),
    )

    const validAttachments = attachments.filter((a) => a !== null)

    await resend.emails.send({
      from: "All Dat Junk <noreply@alldatjunk.com>",
      to: "alldatjunk.916@gmail.com",
      subject: `New quote request from website - ${name}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service Address:</strong> ${address}</p>
        <p><strong>Notes:</strong> ${notes || "No additional notes"}</p>
        <p><strong>Photos Attached:</strong> ${validAttachments.length}</p>
      `,
      attachments: validAttachments,
    })

    console.log("[v0] API Route - Email sent successfully with attachments")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] API Route - Error:", error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
