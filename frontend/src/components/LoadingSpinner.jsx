// Props:
//   message — string shown below the spinner

function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      {/* Spinning circle */}
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-4 border-slate-200" />
        <div className="absolute inset-0 rounded-full border-4 border-cyan-600 border-t-transparent animate-spin" />
      </div>

      {/* Message */}
      <p className="text-slate-600 font-medium text-center max-w-xs">{message}</p>

      {/* Subtle hint */}
      <p className="text-slate-400 text-sm text-center">This may take 10-20 seconds</p>
    </div>
  )
}

export default LoadingSpinner
