import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { shaderMaterial, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useSpring, AnimatePresence } from 'framer-motion';
import ShowreelModal from './ShowreelModal';

// --- GLSL NOISE & SHADER ---
// A simple 3D noise function for the vertex shader
const noiseGLSL = `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    
    // First corner
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;
    
    // Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    
    //   x0 = x0 - 0.0 + 0.0 * C.xxx;
    //   x1 = x0 - i1  + 1.0 * C.xxx;
    //   x2 = x0 - i2  + 2.0 * C.xxx;
    //   x3 = x0 - 1.0 + 3.0 * C.xxx;
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
    vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y
    
    // Permutations
    i = mod289(i); 
    vec4 p = permute( permute( permute( 
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
             
    // Gradients: 7x7 points over a square, mapped onto an octahedron.
    // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
    float n_ = 0.142857142857; // 1.0/7.0
    vec3  ns = n_ * D.wyz - D.xzx;
    
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)
    
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)
    
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    
    //Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    
    // Mix final noise value
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                  dot(p2,x2), dot(p3,x3) ) );
  }
`;

const LiquidMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uResolution: new THREE.Vector2(1, 1),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying float vElevation;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    
    uniform float uTime;
    uniform vec2 uMouse;

    ${noiseGLSL}

    void main() {
      vUv = uv;
      vec3 pos = position; // Start with plane geometry position

      // Calculate distance to mouse in world space (mapped approximately)
      // Since plane is centered, uMouse is roughly -1 to 1? 
      // We'll normalize uMouse in React to -scale/2 to scale/2 or similar, 
      // but let's assume uMouse is passed as UV coordinates (0 to 1) or Normalized Device Coords (-1 to 1).
      // Let's assume uMouse is in UV space (0 to 1) for simplicity in shader.
      
      float dist = distance(uv, uMouse);
      
      // Interaction Wave
      // Create a localized wave based on mouse proximity
      float interaction = smoothstep(0.5, 0.0, dist); 
      
      // General Fluid Motion
      float noiseVal = snoise(vec3(pos.x * 1.5, pos.y * 1.5, uTime * 0.2));
      
      // Combine:
      // The mouse interaction adds extra turbulence/height
      float elevation = noiseVal * 0.5 + (interaction * sin(uTime * 5.0 - dist * 20.0) * 0.3);
      
      pos.z += elevation;
      
      vElevation = elevation;
      
      // Compute normal for lighting approximation (simple finite difference or analytically usually, 
      // but provided normal is flat plane, so we rely on varying or standard attributes if we deform significantly)
      // Here we just pass the standard model normal but let's recompute or fake it in fragment for performance.
      vNormal = normal; // Simplified

      vec4 modelViewPosition = modelViewMatrix * vec4(pos, 1.0);
      vViewPosition = -modelViewPosition.xyz;
      gl_Position = projectionMatrix * modelViewPosition;
    }
  `,
  // Fragment Shader
  `
    varying vec2 vUv;
    varying float vElevation;
    uniform vec2 uMouse;
    uniform float uTime;

    void main() {
      // Base color: Ferrofluid Black/Dark Metal
      vec3 baseColor = vec3(0.02, 0.02, 0.02);
      
      // Highlights based on elevation (fake reflections)
      float highlight = smoothstep(0.2, 0.8, vElevation);
      vec3 reflection = vec3(0.1) * highlight;
      
      // Emissive Neon Green Logic
      // Glow where elevation is high or close to mouse?
      // Let's make the "rips" or high points glow green
      
      float distToMouse = distance(vUv, uMouse);
      float glowIntensity = smoothstep(0.3, 0.0, distToMouse);
      
      // Dynamic pulsing glow
      vec3 glowColor = vec3(0.8, 1.0, 0.0); // Neon Green-ish #CCFF00
      
      // Mix them
      vec3 finalColor = baseColor + reflection;
      
      // Add glow only near mouse and slightly on ridges
      finalColor += glowColor * glowIntensity * 0.4 * (vElevation + 0.5);
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

extend({ LiquidMaterial });

const LiquidPlane = () => {
  const ref = useRef();
  const { viewport } = useThree();
  
  // Calculate Plane size to cover viewport
  // At z=0 with perspective camera, we need to adapt size.
  // Or just make it huge.
  
  useFrame((state) => {
    if (ref.current) {
        ref.current.uTime = state.clock.elapsedTime;
        
        // Convert mouse (-1 to 1) to UV space (0 to 1) roughly for the shader
        // state.pointer.x is -1 to 1
        const u = (state.pointer.x + 1) / 2;
        const v = (state.pointer.y + 1) / 2;
        
        // Lerp for smoothness
        ref.current.uMouse.x += (u - ref.current.uMouse.x) * 0.1;
        ref.current.uMouse.y += (v - ref.current.uMouse.y) * 0.1;
    }
  });

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[viewport.width * 1.5, viewport.height * 1.5, 128, 128]} />
      <liquidMaterial ref={ref} transparent />
    </mesh>
  );
};

// --- HELPER COMPONENTS ---
const MagneticButton = ({ children }) => {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    x.set(distanceX * 0.35);
    y.set(distanceY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className="relative z-20"
    >
      {children}
    </motion.div>
  );
};

// --- MAIN SHOWREEL COMPONENT ---
const Showreel = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      
      {/* 3D LIQUID BACKGROUND */}
      <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 2], fov: 75 }}>
              <color attach="background" args={['#000000']} />
              <LiquidPlane />
          </Canvas>
      </div>

      {/* OVERLAY CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center pointer-events-none">
          {/* Typography */}
          <div className="mb-12 select-none mix-blend-difference">
               <h2 className="text-sm md:text-base font-mono text-[#CCFF00] tracking-[0.5em] uppercase mb-6 opacity-80">
                 // Liquid Intelligence
               </h2>
               <h2 className="text-5xl md:text-8xl lg:text-9xl font-black text-white font-clash uppercase tracking-tighter leading-none">
                  WATCH THE <br/> REVOLUTION
               </h2>
          </div>

          {/* Interaction Button */}
          <div className="pointer-events-auto">
              <MagneticButton>
                  <button 
                      onClick={() => setModalOpen(true)}
                      className="group relative w-32 h-32 flex items-center justify-center rounded-full bg-transparent"
                  >
                      {/* Animated Border/Glow */}
                      <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-[#CCFF00] group-hover:bg-[#CCFF00]/10 transition-all duration-300" />
                      
                      {/* Play Icon */}
                      <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-2 group-hover:border-l-[#CCFF00] transition-colors duration-300 transform group-hover:scale-110" />
                      
                      {/* Radial Ripple */}
                      <div className="absolute inset-0 rounded-full border border-[#CCFF00] opacity-0 group-hover:animate-ping" style={{ animationDuration: '2s' }} />
                  </button>
              </MagneticButton>
          </div>
      </div>

      {/* MODAL (Safe Version without hero.mp4) */}
      <AnimatePresence>
          {modalOpen && <ShowreelModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />}
      </AnimatePresence>

    </section>
  );
};

export default Showreel;