import { useEffect, useInsertionEffect } from 'react'

// Each page keeps its original stylesheet, which styles global tags (body, button).
// Mounting only the active page's CSS stops those rules from colliding across pages.
export default function usePage(css, title) {
  useInsertionEffect(() => {
    const style = document.createElement('style')
    style.textContent = css
    document.head.append(style)
    return () => style.remove()
  }, [css])

  useEffect(() => {
    document.title = title
    window.scrollTo(0, 0)
  }, [title])
}
