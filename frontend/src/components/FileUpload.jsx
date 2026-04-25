import { useState, useRef } from 'react'

// Props:
//   onFileSelect(file) — called when a valid file is chosen
//   accept — file types string, default ".pdf"

function FileUpload({ onFileSelect, accept = '.pdf' }) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  // Validate and set the file
  function handleFile(file) {
    if (!file) return

    // Check file extension matches accept prop
    const acceptedTypes = accept.split(',').map(t => t.trim().toLowerCase())
    const fileExt = '.' + file.name.split('.').pop().toLowerCase()
    const isValid = acceptedTypes.includes(fileExt) || acceptedTypes.includes(file.type)

    if (!isValid) {
      setError(`Invalid file type. Please upload a ${accept} file.`)
      setSelectedFile(null)
      return
    }

    setError('')
    setSelectedFile(file)
    onFileSelect(file)
  }

  // Click on the drop zone to open file dialog
  function handleClick() {
    inputRef.current?.click()
  }

  // File selected via input
  function handleInputChange(e) {
    handleFile(e.target.files[0])
  }

  // Drag and drop handlers
  function handleDragOver(e) {
    e.preventDefault()
    setDragging(true)
  }

  function handleDragLeave(e) {
    e.preventDefault()
    setDragging(false)
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  return (
    <div className="w-full">
      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
      />

      {/* Drop zone */}
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer
          transition-all duration-300
          ${dragging
            ? 'border-cyan-500 bg-cyan-50 shadow-[0_0_0_5px_rgba(6,182,212,0.14)]'
            : selectedFile
              ? 'border-emerald-400 bg-emerald-50'
              : 'border-slate-300 bg-white/90 hover:border-cyan-400 hover:bg-cyan-50/70'
          }
        `}
      >
        {selectedFile ? (
          // File selected — show filename
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-emerald-700 font-medium">{selectedFile.name}</p>
            <p className="text-emerald-600 text-sm">
              {(selectedFile.size / 1024).toFixed(1)} KB — Click to change file
            </p>
          </div>
        ) : (
          // No file selected — show instructions
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <p className="text-slate-700 font-semibold">
                {dragging ? 'Drop your file here' : 'Drag & drop or click to upload'}
              </p>
              <p className="text-slate-500 text-sm mt-1">Supported format: {accept.toUpperCase()}</p>
            </div>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="mt-2 text-red-500 text-sm flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}

export default FileUpload
