import { Button } from '@/components/ui/button'
import CropImage from '@/components/ui/imageCropper'
import Tmpfiles from '@/lib/Tmpfiles'
import { User, Save, X, Users } from 'lucide-react'
import { useState, useEffect } from 'react'

interface EditProfileLayoutProps {
  userData: any
}

export default function EditProfileLayout({ userData }: EditProfileLayoutProps) {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    image: '',
    userId: '',
    name: '',
    username: '',
    gender: 'male',
    bio: '',
  })

  useEffect(() => {
    if (userData) {
      setFormData({
        userId: userData.userId || '',
        image: userData.image || '',
        name: userData.name || '',
        username: userData.username || '',
        gender: userData.gender || 'male',
        bio: userData.bio || '',
      })
    }
  }, [userData])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  try {
    let imageUrl = formData.image

    if (formData.image && formData.image.startsWith('data:')) {
      imageUrl = await Tmpfiles(formData.image)
      imageUrl = imageUrl.replace(
        "tmpfiles.org/",
        "tmpfiles.org/dl/"
      )
    }

    const updatedData = {
      ...formData,
      image: imageUrl,
    }

    const res = await fetch('/api/profile/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    })

    const result = await res.json()

    if (result.success) {
      window.location.href = '/profile'
    }
  } catch (err) {
    console.error("Upload failed:", err)
  }
}
  const handleCancel = () => {
    window.history.back()
  }
  

  return (
    <div className="min-h-screen pt-10 md:pt-5 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Edit Profile</h1>
          <p className="text-purple-300 mb-3">Update your profile information</p> 
  
          {/* Crop modal */}
          {imageFile && (
            <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur flex justify-center items-center">
              <div className="bg-white p-4 rounded-xl">
                <CropImage
                  src={URL.createObjectURL(imageFile)}
                  onCropComplete={(dataUrl) => {
                    setFormData((prev) => ({ ...prev, image: dataUrl }))
                    setImageFile(null)
                  }}
                  onCancel={() => setImageFile(null)}
                />
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h2 className="font-bold text-lg mb-4">Profile Picture</h2>
          <div className="flex items-center gap-6">
            {formData.image ? (
              <img
                src={formData.image}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl font-bold">
                {formData.name ? formData.name.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
            {/* Button trigger */}
          <button
            type="button"
            onClick={() => {
              const fileInput = document.getElementById('fileInput') as HTMLInputElement | null
                if (fileInput) {
                  fileInput.click()
                }
            }}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 transition text-white rounded-sm cursor-pointer"
          >
            Upload Image
          </button>
          </div>

          {/* Hidden input */}
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const image = event.target.files?.[0] ?? null
              setImageFile(image)
            }}
          />
          </div>
          {/* Basic Info */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h2 className="font-bold text-lg mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="flex items-center gap-2 text-sm font-semibold mb-2"
                >
                  <User size={16} className="text-purple-400" />
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full h-11 bg-white/10 border border-white/20 rounded-lg px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="flex items-center gap-2 text-sm font-semibold mb-2"
                >
                  <User size={16} className="text-purple-400" />
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full h-11 bg-white/10 border border-white/20 rounded-lg px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label
                  htmlFor="gender"
                  className="flex items-center gap-2 text-sm font-semibold mb-2"
                >
                  <Users size={16} className="text-purple-400" />
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full h-11 bg-white/10 border border-white/20 rounded-lg px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="male" className="bg-slate-900">
                    Male
                  </option>
                  <option value="female" className="bg-slate-900">
                    Female
                  </option>
                  <option value="other" className="bg-slate-900">
                    Other
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h2 className="font-bold text-lg mb-4">Bio</h2>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              placeholder="Tell us about yourself..."
            />
            <p className="text-xs text-purple-300 mt-2">
              {formData.bio.length} / 500 characters
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer"
            >
             Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
