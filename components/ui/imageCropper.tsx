import React, { useRef, useState } from 'react'
import ReactCrop, { centerCrop, Crop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { Button } from './button'

const ASPECT_RATIO = 1
const MIN_DIMENSION = 150

export default function ImageCropper({
  src,
  onCropComplete,
  onCancel,
}: {
  src: string
  onCropComplete: (dataUrl: string) => void
  onCancel: () => void
}) {
  const [crop, setCrop] = useState<Crop>()
  const imgRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'))

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    const width = img.naturalWidth
    const height = img.naturalHeight
    const crop = makeAspectCrop(
      { unit: '%', width: MIN_DIMENSION },
      ASPECT_RATIO,
      width,
      height
    )
    const centeredCrop = centerCrop(crop, width, height)
    setCrop(centeredCrop)
  }

  const getCroppedImg = async (): Promise<string | null> => {
    if (!imgRef.current || !crop) return null

    const image = imgRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    canvas.width = crop.width!
    canvas.height = crop.height!

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width! * scaleX,
      crop.height! * scaleY,
      0,
      0,
      crop.width!,
      crop.height!
    )

    return canvas.toDataURL('image/png')
  }

  const handleSave = async () => {
    const croppedDataUrl = await getCroppedImg()
    if (croppedDataUrl) onCropComplete(croppedDataUrl)
  }

  return (
    <div className="w-[300px] flex flex-col items-center gap-3">
  <ReactCrop
    crop={crop}
    onChange={(pixelCrop) => setCrop(pixelCrop)}
    circularCrop
    keepSelection
    aspect={ASPECT_RATIO}
    minWidth={MIN_DIMENSION}
  >
    <img
      ref={imgRef}
      src={src}
      onLoad={onImageLoad}
      style={{
        maxHeight: '300px',
        width: 'auto',
        objectFit: 'contain',
        display: 'block',
      }}
    />
  </ReactCrop>

  <div className="flex w-full justify-between">
    <Button
      className="bg-purple-600 cursor-pointer"
      onClick={handleSave}
    >
      Save Cropped Image
    </Button>
    <Button
      className="text-black"
      variant="outline"
      onClick={onCancel}
    >
      Cancel
    </Button>
  </div>
</div>

  )
}
