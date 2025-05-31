

'use client'

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-6">
      <div className="w-8 h-8 border-4 border-[#0C3B5D] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}