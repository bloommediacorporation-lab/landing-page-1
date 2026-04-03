import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import { Suspense, useRef as useThreeRef } from "react";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

function AbstractShape() {
  const ref = useThreeRef<THREE.Mesh>(null);
  const mat = useThreeRef<any>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = t * 0.15;
      ref.current.rotation.z = t * 0.1;
    }
    if (mat.current) {
      mat.current.distort = 0.3 + Math.sin(t * 0.5) * 0.15;
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.2}>
      <mesh ref={ref} scale={1.5}>
        <torusKnotGeometry args={[1, 0.35, 200, 32]} />
        <MeshDistortMaterial
          ref={mat}
          color="#0a0020"
          emissive="#4c1d95"
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.9}
          distort={0.3}
          speed={1.5}
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    if (imageRef.current) {
      gsap.to(imageRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    if (textRef.current) {
      const lines = textRef.current.querySelectorAll(".about-line");
      lines.forEach((line, i) => {
        gsap.fromTo(
          line,
          { y: 40, opacity: 0, filter: "blur(8px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: line,
              start: "top 85%",
              once: true,
            },
            delay: i * 0.1,
          }
        );
      });
    }

    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        padding: "clamp(8rem, 15vh, 16rem) clamp(2rem, 6vw, 8rem)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(4rem, 8vw, 10rem)",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div ref={textRef}>
        <span
          className="about-line"
          style={{
            fontSize: "0.7rem",
            color: "#8b5cf6",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            display: "block",
            marginBottom: "2rem",
            opacity: 0,
          }}
        >
          Despre noi
        </span>

        <h2
          className="about-line"
          style={{
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 200,
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            marginBottom: "2rem",
            opacity: 0,
          }}
        >
          Nu suntem o agenție.
          <br />
          <span style={{ color: "#8b5cf6" }}>
            Suntem un sistem.
          </span>
        </h2>

        <div
          ref={lineRef}
          style={{
            width: "60px",
            height: "1px",
            background: "rgba(139,92,246,0.5)",
            marginBottom: "2rem",
            transformOrigin: "left",
            transform: "scaleX(0)",
          }}
        />

        <p
          className="about-line"
          style={{
            fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)",
            color: "#666",
            lineHeight: 1.8,
            maxWidth: "440px",
            opacity: 0,
          }}
        >
          Majoritatea agențiilor îți vând promisiuni.
          Noi construim infrastructura digitală care
          aduce clienți în mod predictibil — landing pages
          care convertesc, automatizări care nu dorm,
          și campanii optimizate zilnic.
        </p>

        <p
          className="about-line"
          style={{
            fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)",
            color: "#555",
            lineHeight: 1.8,
            maxWidth: "440px",
            marginTop: "1.5rem",
            opacity: 0,
          }}
        >
          Rezultatul? Un flux constant de clienți noi,
          fără să depinzi de recomandări sau noroc.
        </p>

        <div
          className="about-line"
          style={{
            display: "flex",
            gap: "3rem",
            marginTop: "3rem",
            opacity: 0,
          }}
        >
          {[
            { num: "50+", label: "Clienți activi" },
            { num: "3x", label: "ROI mediu" },
            { num: "2019", label: "Din anul" },
          ].map((s) => (
            <div key={s.label}>
              <span
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 300,
                  color: "white",
                  display: "block",
                }}
              >
                {s.num}
              </span>
              <span
                style={{
                  fontSize: "0.6rem",
                  color: "#444",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          position: "relative",
          height: "clamp(400px, 60vh, 700px)",
          borderRadius: "12px",
          overflow: "hidden",
          background: "#0a0015",
        }}
      >
        <div ref={imageRef} style={{ position: "absolute", inset: 0 }}>
          <Canvas
            camera={{ position: [0, 0, 4], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
            style={{ position: "absolute", inset: 0 }}
            dpr={[1, 1.5]}
          >
            <Suspense fallback={null}>
              <Environment preset="night" background={false} />
              <ambientLight intensity={0.15} />
              <spotLight position={[5, 5, 5]} intensity={2} color="#7c3aed" penumbra={1} />
              <spotLight position={[-5, -3, -3]} intensity={1} color="#ec4899" penumbra={1} />
              <AbstractShape />
            </Suspense>
          </Canvas>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "1.5rem",
            left: "1.5rem",
            fontSize: "0.6rem",
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Est. 2019 — România
        </div>
      </div>
    </section>
  );
}
