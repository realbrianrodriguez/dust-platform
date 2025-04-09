import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLITTER_CONFIG } from '@/lib/solana';
import { useTransactionData } from '@/hooks/useTransactionData';

interface GlitterAnimationProps {
  width?: number;
  height?: number;
}

export const GlitterAnimation: React.FC<GlitterAnimationProps> = ({
  width = 800,
  height = 600,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { txSpeed, gasFees } = useTransactionData();
  
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    // Particle system
    const particles = new THREE.BufferGeometry();
    const particleCount = GLITTER_CONFIG.PARTICLE_COUNT;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;
      
      velocities[i3] = (Math.random() - 0.5) * GLITTER_CONFIG.MAX_VELOCITY;
      velocities[i3 + 1] = (Math.random() - 0.5) * GLITTER_CONFIG.MAX_VELOCITY;
      velocities[i3 + 2] = (Math.random() - 0.5) * GLITTER_CONFIG.MAX_VELOCITY;
      
      const color = new THREE.Color();
      color.setHSL(Math.random(), 1, 0.5);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Material
    const material = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    // Points
    const points = new THREE.Points(particles, material);
    scene.add(points);

    // Camera position
    camera.position.z = 5;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Update particle positions based on blockchain data
      const positions = particles.attributes.position.array as Float32Array;
      const velocities = particles.attributes.velocity.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Update velocity based on transaction speed
        velocities[i3] *= (txSpeed / 100);
        velocities[i3 + 1] *= (txSpeed / 100);
        velocities[i3 + 2] *= (txSpeed / 100);

        // Update position
        positions[i3] += velocities[i3];
        positions[i3 + 1] += velocities[i3 + 1];
        positions[i3 + 2] += velocities[i3 + 2];

        // Boundary check
        if (Math.abs(positions[i3]) > 5) velocities[i3] *= -1;
        if (Math.abs(positions[i3 + 1]) > 5) velocities[i3 + 1] *= -1;
        if (Math.abs(positions[i3 + 2]) > 5) velocities[i3 + 2] *= -1;
      }

      particles.attributes.position.needsUpdate = true;
      particles.attributes.velocity.needsUpdate = true;

      // Update particle size based on gas fees
      material.size = 0.1 + (gasFees / 1000000);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      containerRef.current?.removeChild(renderer.domElement);
      scene.remove(points);
      particles.dispose();
      material.dispose();
    };
  }, [width, height, txSpeed, gasFees]);

  return <div ref={containerRef} />;
}; 