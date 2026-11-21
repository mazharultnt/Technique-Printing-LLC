import { useEffect, useRef, useState } from "react";

/** Renders its children only when the visitor scrolls near it. Used for heavy media (photos, videos, map),
 *  so the first screen loads fast and nothing heavy is downloaded before it is needed. */
export default function LazyMount({ children, minHeight = 320, rootMargin = "500px" }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) { setShow(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShow(true); io.disconnect(); } }, { rootMargin });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [rootMargin]);
  return <div ref={ref} style={show ? undefined : { minHeight }}>{show ? children : null}</div>;
}
