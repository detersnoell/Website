"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProductImage } from "@/lib/catalog/types";
import { Icon } from "./Icon";
import styles from "./Gallery.module.css";

/**
 * Produktgalerie.
 * Desktop: Bilder untereinander (1 groß, dann 2er-Raster); Klick → Vollbild,
 *   zweiter Klick → 2×-Zoom, der der Maus gedämpft folgt.
 * Mobile: randloser Swipe (Scroll-Snap) mit segmentierter Fortschrittslinie;
 *   Tap → Vollbild mit nativem Pinch-Zoom.
 */
export function Gallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [viewer, setViewer] = useState<number | null>(null);
  const [slide, setSlide] = useState(0);
  const track = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    setSlide(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <>
      {/* Desktop-Stapel */}
      <div className={styles.stack} data-count={images.length}>
        {images.map((img, i) => (
          <button key={img.src} type="button" className={styles.tile} onClick={() => setViewer(i)} aria-label={`Bild ${i + 1} von ${images.length} vergrößern`}>
            <Image src={img.src} alt={img.alt} fill sizes={i === 0 ? "(max-width: 1199px) 55vw, 760px" : "(max-width: 1199px) 28vw, 380px"} priority={i === 0} />
          </button>
        ))}
      </div>

      {/* Mobile-Swipe */}
      <div className={styles.swipe}>
        <div ref={track} className={styles.track} onScroll={onScroll}>
          {images.map((img, i) => (
            <button key={img.src} type="button" className={styles.slide} onClick={() => setViewer(i)} aria-label={`Bild ${i + 1} von ${images.length} vergrößern`}>
              <Image src={img.src} alt={img.alt} fill sizes="100vw" priority={i === 0} />
            </button>
          ))}
        </div>
        {images.length > 1 && (
          <div className={styles.segments} aria-hidden="true">
            {images.map((img, i) => (
              <span key={img.src} data-active={i === slide} />
            ))}
          </div>
        )}
      </div>

      {viewer !== null && <Viewer images={images} name={name} start={viewer} onClose={() => setViewer(null)} />}
    </>
  );
}

function Viewer({ images, name, start, onClose }: { images: ProductImage[]; name: string; start: number; onClose: () => void }) {
  const [index, setIndex] = useState(start);
  const [zoom, setZoom] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0.5, y: 0.5 });
  const pos = useRef({ x: 0.5, y: 0.5 });
  const frame = useRef(0);
  const dialog = useRef<HTMLDivElement>(null);

  const go = useCallback((d: number) => {
    setZoom(false);
    setIndex((i) => (i + d + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = "hidden";
    dialog.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, [go, onClose]);

  // Gedämpftes Folgen der Maus im Zoom (lerp 0,12 pro Frame)
  useEffect(() => {
    if (!zoom) {
      cancelAnimationFrame(frame.current);
      if (img.current) img.current.style.transform = "";
      return;
    }
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;
      if (img.current) {
        const tx = (0.5 - pos.current.x) * 100;
        const ty = (0.5 - pos.current.y) * 100;
        img.current.style.transform = `translate(${tx}%, ${ty}%) scale(2)`;
      }
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [zoom]);

  const onMove = (e: React.PointerEvent) => {
    const r = stage.current?.getBoundingClientRect();
    if (!r) return;
    target.current = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
  };

  const current = images[index];
  const fine = typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

  return (
    <div ref={dialog} className={styles.viewer} role="dialog" aria-modal="true" aria-label={`${name}: Bildansicht`} tabIndex={-1}>
      <div className={styles.viewerBar}>
        <span className="small num">
          {index + 1} / {images.length}
        </span>
        <button type="button" className={styles.iconBtn} onClick={onClose}>
          <Icon name="close" size={24} />
          <span className="visually-hidden">Schließen</span>
        </button>
      </div>
      <div
        ref={stage}
        className={styles.stage}
        data-zoom={zoom}
        onPointerMove={onMove}
        onClick={(e) => {
          if (!fine) return;
          onMove(e as unknown as React.PointerEvent);
          pos.current = { ...target.current };
          setZoom((z) => !z);
        }}
      >
        <div ref={img} className={styles.stageImg} key={current.src}>
          <Image src={current.src} alt={current.alt} fill sizes="100vw" quality={90} />
        </div>
      </div>
      {images.length > 1 && (
        <>
          <button type="button" className={`${styles.iconBtn} ${styles.prev}`} onClick={() => go(-1)}>
            <Icon name="arrowLeft" size={24} />
            <span className="visually-hidden">Vorheriges Bild</span>
          </button>
          <button type="button" className={`${styles.iconBtn} ${styles.next}`} onClick={() => go(1)}>
            <Icon name="arrow" size={24} />
            <span className="visually-hidden">Nächstes Bild</span>
          </button>
        </>
      )}
    </div>
  );
}
