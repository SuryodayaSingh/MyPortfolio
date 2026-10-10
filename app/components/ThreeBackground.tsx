"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

    camera.position.set(0, 0, 9);

    // Torus Knot
    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(2.2, 0.55, 160, 20),
      new THREE.MeshBasicMaterial({
        color: 0x8b9bff,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      })
    );

    knot.position.x = window.innerWidth < 800 ? 0 : 3;
    scene.add(knot);

    // Icosahedron
    const ico = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1, 1),
      new THREE.MeshBasicMaterial({
        color: 0xff9b7a,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      })
    );

    ico.position.set(-5, -2, -2);
    scene.add(ico);

    // Particles
    const particleCount = 700;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 40;
    }

    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particles = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        color: 0xcfd5ff,
        size: 0.05,
        transparent: true,
        opacity: 0.7,
      })
    );

    scene.add(particles);

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX / window.innerWidth - 0.5;
      mouseY = event.clientY / window.innerHeight - 0.5;
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      renderer.setSize(width, height, false);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      knot.position.x = width < 800 ? 0 : 3;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    handleResize();

    let animationFrame = 0;

    const animate = () => {
      if (!reduceMotion) {
        knot.rotation.x += 0.003;
        knot.rotation.y += 0.005;

        ico.rotation.y += 0.01;
        ico.rotation.x += 0.006;

        particles.rotation.y += 0.0004;
      }

      // Camera position changes only with mouse movement,
      // never with page scrolling.
      camera.position.x +=
        (mouseX * 2 - camera.position.x) * 0.04;

      camera.position.y +=
        (-mouseY * 2 - camera.position.y) * 0.04;

      camera.position.z = 9;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      geometry.dispose();
      (particles.material as THREE.Material).dispose();

      knot.geometry.dispose();
      (knot.material as THREE.Material).dispose();

      ico.geometry.dispose();
      (ico.material as THREE.Material).dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="bg"
      aria-hidden="true"
    />
  );
}