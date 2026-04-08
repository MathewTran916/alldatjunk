"use server"

export async function submitForm(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const notes = formData.get("notes") as string
    const photosDataString = formData.get("photosData") as string

    console.log("[v0] Processing form submission:", {
      name,
      email,
      phone,
      hasPhotos: !!photosDataString,
    })

    if (!name || !email || !phone || !photosDataString) {
      console.error("[v0] Missing required fields")
      return { success: false, error: "Missing required fields including photos" }
    }

    let attachments: Array<{ filename: string; content: string }> = []

    try {
      const photosData = JSON.parse(photosDataString) as Array<{
        filename: string
        content: string
        type: string
      }>

      if (photosData.length === 0) {
        return { success: false, error: "At least one photo is required" }
      }

      attachments = photosData.map((photo) => ({
        filename: photo.filename,
        content: photo.content,
      }))
      console.log(`[v0] Successfully processed ${attachments.length} attachments`)
    } catch (photoError) {
      console.error("[v0] Error parsing photos:", photoError)
      return { success: false, error: "Failed to process photos" }
    }

    // Create email content
    const emailContent = `
New All Dat Junk Estimate Request

Name: ${name}
Email: ${email}
Phone: ${phone}
Notes: ${notes || "No additional notes"}

Photos: ${attachments.length} file(s) attached

Please respond to this inquiry at your earliest convenience.
    `.trim()

    console.log("[v0] Sending email via Resend...")

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "All Dat Junk <onboarding@resend.dev>",
        to: ["mathewvtran98@gmail.com"],
        subject: `New Estimate Request from ${name}`,
        text: emailContent,
        attachments,
      }),
    })

    const responseData = await response.json()

    if (!response.ok) {
      console.error("[v0] Resend API error:", responseData)
      return {
        success: false,
        error: `Failed to send email: ${JSON.stringify(responseData)}`,
      }
    }

    console.log("[v0] Email sent successfully:", responseData)

    return { success: true, message: "Email sent successfully" }
  } catch (error) {
    console.error("[v0] Error in submitForm:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    }
  }
}
