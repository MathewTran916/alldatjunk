"use client"

import type React from "react"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, CheckCircle2, X } from "lucide-react"

async function compressImage(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      const img = new Image()
      img.src = e.target?.result as string
      img.onload = () => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        if (!ctx) {
          reject(new Error("Could not get canvas context"))
          return
        }

        // Resize to max 1920px width while maintaining aspect ratio
        const maxWidth = 1920
        const scale = Math.min(1, maxWidth / img.width)
        canvas.width = img.width * scale
        canvas.height = img.height * scale

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              })
              resolve(compressedFile)
            } else {
              reject(new Error("Could not compress image"))
            }
          },
          "image/jpeg",
          0.7,
        )
      }
      img.onerror = () => reject(new Error("Could not load image"))
    }
    reader.onerror = () => reject(new Error("Could not read file"))
  })
}

async function uploadWithRetry(file: File, maxRetries = 3): Promise<string> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const fileFormData = new FormData()
      fileFormData.append("file", file)

      const uploadPromise = fetch("/api/upload-photo", {
        method: "POST",
        body: fileFormData,
      })

      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Upload timed out")), 120000))

      const uploadResponse = (await Promise.race([uploadPromise, timeoutPromise])) as Response

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text()
        throw new Error(`Upload failed: ${errorText}`)
      }

      const uploadResult = await uploadResponse.json()
      return uploadResult.url
    } catch (error) {
      if (attempt === maxRetries) {
        throw error
      }
      const delay = Math.pow(2, attempt) * 1000
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }
  throw new Error("Upload failed after retries")
}

export function HeroForm() {
  const [submitted, setSubmitted] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState("")
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (selectedFiles.length === 0) {
      alert("Please upload at least one photo to receive an accurate quote.")
      return
    }

    setIsSubmitting(true)
    setUploadProgress(`Compressing ${selectedFiles.length} photo${selectedFiles.length > 1 ? "s" : ""}...`)

    try {
      const photoUrls: string[] = []

      const compressedFiles: File[] = []
      for (let i = 0; i < selectedFiles.length; i++) {
        try {
          const compressed = await compressImage(selectedFiles[i])
          compressedFiles.push(compressed)
        } catch (compressError) {
          alert(`Failed to compress ${selectedFiles[i].name}. Using original file.`)
          compressedFiles.push(selectedFiles[i])
        }
      }

      for (let index = 0; index < compressedFiles.length; index++) {
        const file = compressedFiles[index]
        setUploadProgress(`Uploading photo ${index + 1} of ${compressedFiles.length}...`)

        if (index > 0) {
          await new Promise((resolve) => setTimeout(resolve, 3000))
        }

        try {
          const url = await uploadWithRetry(file)
          photoUrls.push(url)
        } catch (uploadError) {
          const errorMsg = uploadError instanceof Error ? uploadError.message : "Unknown error"
          alert(
            `Failed to upload photo ${index + 1} (${selectedFiles[index].name}):\n${errorMsg}\n\nPlease try again with smaller photos or call us at 279-282-9386`,
          )
          setIsSubmitting(false)
          setUploadProgress("")
          return
        }
      }

      setUploadProgress("Sending your request...")

      const formData = new FormData()
      formData.append("name", formValues.name)
      formData.append("email", formValues.email)
      formData.append("phone", formValues.phone)
      formData.append("address", formValues.address)
      formData.append("notes", formValues.notes)

      photoUrls.forEach((url) => {
        formData.append("photoUrls", url)
      })

      const response = await fetch("/api/submit-quote", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        setSubmitted(true)
        setUploadProgress("")
      } else {
        alert(`There was an error submitting your request. Please try calling us directly at 279-282-9386`)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      alert(`Error: ${errorMessage}\n\nPlease try calling us directly at 279-282-9386`)
    } finally {
      setIsSubmitting(false)
      setUploadProgress("")
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)

      const maxSizePerFile = 10 * 1024 * 1024 // 10MB per file
      const validFiles: File[] = []
      const invalidFiles: string[] = []

      newFiles.forEach((file) => {
        if (file.size > maxSizePerFile) {
          invalidFiles.push(`${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB - max 10MB per file)`)
        } else {
          validFiles.push(file)
        }
      })

      if (invalidFiles.length > 0) {
        alert(
          `The following files are too large:\n${invalidFiles.join("\n")}\n\nPlease select smaller files (max 10MB each) or take new photos.`,
        )
      }

      if (validFiles.length > 0) {
        setSelectedFiles((prev) => [...prev, ...validFiles])
      }

      e.target.value = ""
    }
  }

  const removeFile = (indexToRemove: number) => {
    setSelectedFiles((prev) => prev.filter((_, index) => index !== indexToRemove))
  }

  return (
    <div className="w-full">
      {submitted ? (
        <div className="flex flex-col items-center justify-center space-y-3 py-4">
          <CheckCircle2 className="h-10 w-10 text-accent" />
          <p className="text-center text-sm font-medium text-foreground">
            Thanks! We've received your request and will reach out shortly.
          </p>
          <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="sm">
            <a href="tel:279-282-9386">Call Us Now: 279-282-9386</a>
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="name" className="text-xs">
              Full Name *
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="John Smith"
              required
              className="h-8 text-sm"
              value={formValues.name}
              onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="email" className="text-xs">
              Email *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              required
              className="h-8 text-sm"
              value={formValues.email}
              onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="phone" className="text-xs">
              Phone *
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="(555) 123-4567"
              required
              className="h-8 text-sm"
              value={formValues.phone}
              onChange={(e) => setFormValues({ ...formValues, phone: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="address" className="text-xs">
              Service Address *
            </Label>
            <Input
              id="address"
              name="address"
              placeholder="123 Main St, Sacramento, CA 95814"
              required
              className="h-8 text-sm"
              value={formValues.address}
              onChange={(e) => setFormValues({ ...formValues, address: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="notes" className="text-xs">
              Job Notes
            </Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Tell us what you need hauled…"
              rows={2}
              className="text-sm"
              value={formValues.notes}
              onChange={(e) => setFormValues({ ...formValues, notes: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="photos" className="text-xs">
              Upload Photos *
            </Label>
            <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/50 p-3 transition-colors hover:bg-secondary">
              <label htmlFor="photos" className="flex cursor-pointer flex-col items-center">
                <Upload className="mb-1 h-5 w-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground text-center">
                  {selectedFiles.length > 0
                    ? `${selectedFiles.length} file${selectedFiles.length > 1 ? "s" : ""} selected`
                    : "Click to upload photos"}
                </span>
                <input
                  id="photos"
                  name="photos"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </label>
            </div>
            {selectedFiles.length > 0 && (
              <div className="space-y-1 mt-2">
                {selectedFiles.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="flex items-center justify-between rounded bg-secondary px-2 py-1 text-xs"
                  >
                    <span className="truncate flex-1">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="ml-2 text-muted-foreground hover:text-destructive"
                      aria-label="Remove file"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            size="sm"
            disabled={isSubmitting}
          >
            {isSubmitting ? uploadProgress || "Uploading..." : "Get My Free Estimate"}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Photos are required to provide you with an accurate quote.
          </p>
        </form>
      )}
    </div>
  )
}
