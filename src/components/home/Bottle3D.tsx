import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Bottle3DProps {
  interactive?: boolean;
  className?: string;
}

export const Bottle3D: React.FC<Bottle3DProps> = ({ interactive = true, className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 0.2, 5.2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Lighting (Warm luxury studio aesthetic)
    const ambientLight = new THREE.AmbientLight(0xfff8f0, 1.4);
    scene.add(ambientLight);

    // Key Light (warm soft light)
    const keyLight = new THREE.DirectionalLight(0xfff3e0, 2.8);
    keyLight.position.set(4, 6, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Rim Light (cool champagne highlight for edge definition)
    const rimLight = new THREE.DirectionalLight(0xd4af37, 2.2);
    rimLight.position.set(-4, 3, -3);
    scene.add(rimLight);

    // Soft Bottom Bounce Light (reflecting off ivory table)
    const bounceLight = new THREE.DirectionalLight(0xf5ebe0, 1.2);
    bounceLight.position.set(0, -5, 2);
    scene.add(bounceLight);

    // Skincare Bottle Assembly Group
    const bottleGroup = new THREE.Group();

    // 1. Frosted / Smoked Glass Bottle Body
    const bodyGeometry = new THREE.CylinderGeometry(0.85, 0.85, 2.6, 64, 1);
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x22201d, // Dark smoked amber-charcoal apothecary luxury glass
      metalness: 0.1,
      roughness: 0.25,
      transmission: 0.65, // Semi-translucent luxury frosted glass
      thickness: 1.2,
      ior: 1.52,
      specularIntensity: 0.9,
      specularColor: 0xf5ebe0
    });
    const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
    bodyMesh.position.y = 0;
    bottleGroup.add(bodyMesh);

    // 2. Rounded Base / Chamfer
    const baseGeometry = new THREE.CylinderGeometry(0.85, 0.8, 0.15, 64);
    const baseMesh = new THREE.Mesh(baseGeometry, bodyMaterial);
    baseMesh.position.y = -1.35;
    bottleGroup.add(baseMesh);

    // 3. Rounded Shoulder
    const shoulderGeometry = new THREE.SphereGeometry(0.85, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2.8);
    const shoulderMesh = new THREE.Mesh(shoulderGeometry, bodyMaterial);
    shoulderMesh.position.y = 1.3;
    bottleGroup.add(shoulderMesh);

    // 4. Bottle Neck
    const neckGeometry = new THREE.CylinderGeometry(0.38, 0.42, 0.45, 64);
    const neckMesh = new THREE.Mesh(neckGeometry, bodyMaterial);
    neckMesh.position.y = 1.75;
    bottleGroup.add(neckMesh);

    // 5. Luxury Brushed Gold Dropper Collar
    const collarGeometry = new THREE.CylinderGeometry(0.44, 0.44, 0.65, 64);
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Champagne gold
      metalness: 0.88,
      roughness: 0.28
    });
    const collarMesh = new THREE.Mesh(collarGeometry, goldMaterial);
    collarMesh.position.y = 2.05;
    bottleGroup.add(collarMesh);

    // 6. Dropper Rubber Bulb (Matte Charcoal)
    const bulbGeometry = new THREE.SphereGeometry(0.36, 32, 32);
    bulbGeometry.scale(1, 1.4, 1);
    const bulbMaterial = new THREE.MeshStandardMaterial({
      color: 0x1c1917,
      roughness: 0.7,
      metalness: 0.05
    });
    const bulbMesh = new THREE.Mesh(bulbGeometry, bulbMaterial);
    bulbMesh.position.y = 2.65;
    bottleGroup.add(bulbMesh);

    // 7. Inner Golden Serum Core (Simulating formula inside the glass)
    const serumGeometry = new THREE.CylinderGeometry(0.72, 0.72, 1.9, 32);
    const serumMaterial = new THREE.MeshStandardMaterial({
      color: 0xc89d66,
      roughness: 0.3,
      metalness: 0.15,
      transparent: true,
      opacity: 0.85
    });
    const serumMesh = new THREE.Mesh(serumGeometry, serumMaterial);
    serumMesh.position.y = -0.25;
    bottleGroup.add(serumMesh);

    // 8. Luxury Minimal Paper Label on the front
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Warm ivory label paper background
      ctx.fillStyle = '#FAF6F0';
      ctx.fillRect(0, 0, 512, 512);

      // Fine gold frame border
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 4;
      ctx.strokeRect(20, 20, 472, 472);

      // Subtle inner hairline
      ctx.strokeStyle = '#E8DFD3';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(28, 28, 456, 456);

      // Brand mark
      ctx.fillStyle = '#1C1917';
      ctx.font = '300 48px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText('VERA', 256, 150);

      // Category label
      ctx.fillStyle = '#78716C';
      ctx.font = '500 15px sans-serif';
      ctx.fillText('CELLULAR RESTORATIVE', 256, 185);

      // Thin divider
      ctx.fillStyle = '#D4AF37';
      ctx.fillRect(216, 215, 80, 2);

      // Product name
      ctx.fillStyle = '#1C1917';
      ctx.font = '400 32px Georgia, serif';
      ctx.fillText('Renewal Serum', 256, 275);

      // Active notes
      ctx.fillStyle = '#57534E';
      ctx.font = '400 17px sans-serif';
      ctx.fillText('Niacinamide + Bio-Peptides', 256, 315);
      ctx.fillText('Tri-Molecular Hyaluronate', 256, 342);

      // Bottom volume & batch
      ctx.fillStyle = '#A8A29E';
      ctx.font = '500 13px sans-serif';
      ctx.fillText('30 ML / 1.0 FL. OZ.  •  LAB 01', 256, 440);
    }

    const labelTexture = new THREE.CanvasTexture(canvas);
    labelTexture.anisotropy = 8;

    const labelGeometry = new THREE.CylinderGeometry(0.86, 0.86, 1.45, 64, 1, true, -Math.PI / 3.2, (2 * Math.PI) / 3.2);
    const labelMaterial = new THREE.MeshStandardMaterial({
      map: labelTexture,
      roughness: 0.65,
      metalness: 0.05,
      side: THREE.DoubleSide
    });
    const labelMesh = new THREE.Mesh(labelGeometry, labelMaterial);
    labelMesh.position.y = 0.05;
    bottleGroup.add(labelMesh);

    // Initial position & tilt
    bottleGroup.position.set(0, -0.2, 0);
    bottleGroup.rotation.y = 0.2;
    bottleGroup.rotation.x = 0.05;
    scene.add(bottleGroup);

    setIsLoaded(true);

    // Interactive mouse / touch tracking
    let targetRotY = 0.2;
    let targetRotX = 0.05;
    let targetPosY = -0.2;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      targetRotY = 0.2 + mouseX * 0.45;
      targetRotX = 0.05 - mouseY * 0.25;
    };

    let touchStartX = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!interactive || e.touches.length === 0) return;
      const deltaX = e.touches[0].clientX - touchStartX;
      targetRotY = 0.2 + (deltaX / 150);
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Render loop with subtle floating oscillation
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle continuous floating breath
      const floatOffset = Math.sin(elapsedTime * 1.4) * 0.08;
      bottleGroup.position.y = THREE.MathUtils.lerp(bottleGroup.position.y, targetPosY + floatOffset, 0.06);

      // Smooth damped rotation towards cursor target
      bottleGroup.rotation.y = THREE.MathUtils.lerp(bottleGroup.rotation.y, targetRotY, 0.05);
      bottleGroup.rotation.x = THREE.MathUtils.lerp(bottleGroup.rotation.x, targetRotX, 0.05);

      // Subtle lighting reflection movement
      keyLight.position.x = 4 + Math.sin(elapsedTime * 0.8) * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      renderer.dispose();
      bodyGeometry.dispose();
      bodyMaterial.dispose();
      collarGeometry.dispose();
      goldMaterial.dispose();
      bulbGeometry.dispose();
      bulbMaterial.dispose();
      labelGeometry.dispose();
      labelMaterial.dispose();
      labelTexture.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [interactive]);

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      
      {/* Editorial Interactive Tooltip badge */}
      <div
        className={`absolute bottom-4 right-4 md:bottom-6 md:right-6 pointer-events-none transition-all duration-700 ${
          isLoaded ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF7F2]/80 backdrop-blur-md border border-[#E8E2D8] text-[11px] font-sans tracking-wider-editorial text-[#57534E] uppercase shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
          <span>{isHovered ? 'Drag to rotate' : 'Interactive 3D Vessel'}</span>
        </div>
      </div>
    </div>
  );
};
