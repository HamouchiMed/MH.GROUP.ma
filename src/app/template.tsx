'use client'

export default function Template({ children }: { children: React.ReactNode }) {
  // Removed the DOM curtain as we now use WebGL Liquid Transition
  return <>{children}</>
}
