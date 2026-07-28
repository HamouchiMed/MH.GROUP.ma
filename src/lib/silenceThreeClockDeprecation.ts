import { setConsoleFunction } from 'three'

/**
 * React Three Fiber (9.x) constructs `new THREE.Clock()` for its render loop,
 * and three r183+ prints a one-time deprecation notice straight from the Clock
 * constructor ("Please use THREE.Timer instead"). Clock is load-bearing inside
 * fiber — we don't own that call — so until fiber migrates to Timer, we route
 * three's own logging through a filter that drops that single message and
 * forwards everything else (real warnings, errors) to the console untouched.
 *
 * This only intercepts three's logger, never the global `console`. Imported for
 * its side effect by CanvasContainer, which runs before <Canvas> mounts and
 * creates the clock.
 */
if (typeof window !== 'undefined') {
  setConsoleFunction((type, message, ...params) => {
    if (type === 'warn' && message.includes('Clock: This module has been deprecated')) return
    console[type](message, ...params)
  })
}
