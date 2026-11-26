"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export const PortalScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setWebglSupported(false);
      return;
    }

    const currentMount = mountRef.current;
    if (!currentMount) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let frameId: number;

    // Check WebGL support
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    currentMount.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6.5;

    // Group for the entire portal sculpture
    const portalGroup = new THREE.Group();
    scene.add(portalGroup);

    // 1. Inner Core: Abstract faceted Icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(1.4, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x252522,
      roughness: 0.2,
      metalness: 0.85,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    portalGroup.add(coreMesh);

    // 2. Wireframe Overlay on Core (Orange accents)
    const wireGeo = new THREE.IcosahedronGeometry(1.42, 0);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xE99B3D,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    portalGroup.add(wireMesh);

    // 3. Surrounding Torus Rings (Orbiting Portals)
    const ringGeo1 = new THREE.TorusGeometry(2.3, 0.02, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xE99B3D,
      transparent: true,
      opacity: 0.6,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    portalGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.7, 0.015, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xD9D1C3,
      transparent: true,
      opacity: 0.35,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    portalGroup.add(ring2);

    // 4. Floating Data Nodes / Satellites
    const satelliteGroup = new THREE.Group();
    portalGroup.add(satelliteGroup);

    const satGeo = new THREE.OctahedronGeometry(0.12, 0);
    const satMat = new THREE.MeshStandardMaterial({
      color: 0xE99B3D,
      roughness: 0.1,
      metalness: 0.9,
    });

    const satCount = 8;
    const satellites: THREE.Mesh[] = [];
    for (let i = 0; i < satCount; i++) {
      const sat = new THREE.Mesh(satGeo, satMat);
      const angle = (i / satCount) * Math.PI * 2;
      const radius = 2.5 + (i % 2) * 0.4;
      sat.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, (Math.random() - 0.5) * 1.5);
      satelliteGroup.add(sat);
      satellites.push(sat);
    }

    // 5. Ambient & Point Lighting
    const ambientLight = new THREE.AmbientLight(0xF2EBDD, 0.6);
    scene.add(ambientLight);

    const orangePointLight = new THREE.PointLight(0xE99B3D, 5, 20);
    orangePointLight.position.set(3, 3, 4);
    scene.add(orangePointLight);

    const softBackLight = new THREE.PointLight(0xF2EBDD, 2, 20);
    softBackLight.position.set(-4, -3, -2);
    scene.add(softBackLight);

    // Mouse movement parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = currentMount.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 0.8;
      targetY = y * 0.8;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Handle Window Resize
    const onResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", onResize);

    // Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Rotate portal elements
      coreMesh.rotation.x += delta * 0.25;
      coreMesh.rotation.y += delta * 0.35;
      wireMesh.rotation.x = coreMesh.rotation.x;
      wireMesh.rotation.y = coreMesh.rotation.y;

      ring1.rotation.z += delta * 0.2;
      ring1.rotation.x += delta * 0.1;
      ring2.rotation.z -= delta * 0.15;
      ring2.rotation.y += delta * 0.1;

      satelliteGroup.rotation.z += delta * 0.12;
      satelliteGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.2;

      // Parallax rotation
      portalGroup.rotation.y = mouseX + Math.sin(elapsedTime * 0.3) * 0.1;
      portalGroup.rotation.x = -mouseY + Math.cos(elapsedTime * 0.3) * 0.1;

      // Subtle pulse
      const scale = 1 + Math.sin(elapsedTime * 1.5) * 0.02;
      coreMesh.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }

      // Dispose resources
      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      satGeo.dispose();
      satMat.dispose();
      renderer.dispose();
    };
  }, []);

  if (!webglSupported) {
    // Beautiful CSS geometric fallback
    return (
      <div className="w-full h-full flex items-center justify-center p-8">
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-[#E99B3D]/30 animate-spin-slow" />
          <div className="absolute inset-4 rounded-full border border-dashed border-[#D9D1C3]/30 animate-reverse-spin" />
          <div className="w-36 h-36 rounded-2xl bg-gradient-to-tr from-[#252522] to-[#3D3D38] border border-[#E99B3D]/60 rotate-45 flex items-center justify-center shadow-2xl animate-float-slow">
            <div className="w-16 h-16 rounded-xl border border-[#E99B3D] rotate-12 flex items-center justify-center font-mono text-[#E99B3D] font-bold text-xs">
              PORTAL
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[420px] md:min-h-[520px] flex items-center justify-center pointer-events-auto"
      aria-label="Interactive 3D Abstract Portal Sculpture"
    />
  );
};
