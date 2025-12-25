// src/components/Hero.jsx
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "framer-motion";

// GLSL SHADER: Karanlık Dijital Sıvı (Dark Digital Fluid)
// Dışarıdan görsel yüklemez, tamamen kodla üretilir (Hata riski %0)
const FluidMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#CCFF00") }, // Neon Green Accent
    uMouse: { value: new THREE.Vector2(0, 0) }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor;
    uniform vec2 uMouse;
    varying vec2 vUv;

    // Basit Gürültü Fonksiyonu (Noise)
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ; m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = vUv;
      
      // Sıvı Hareketi
      float noise1 = snoise(uv * 3.0 + uTime * 0.1);
      float noise2 = snoise(uv * 10.0 - uTime * 0.2 + noise1);
      
      // Mouse Etkileşimi
      float dist = distance(uv, uMouse);
      float interaction = smoothstep(0.4, 0.0, dist) * 0.5;
      
      // Renk Karışımı (Siyah Zemin + Neon Dokunuşlar)
      vec3 baseColor = vec3(0.02, 0.02, 0.02); // Neredeyse Siyah
      vec3 fluidColor = mix(baseColor, uColor, noise2 * 0.15 + interaction); 
      
      // Tarama Çizgileri (Scanlines) - Siber hissi verir
      float scanline = sin(uv.y * 200.0 + uTime * 2.0) * 0.02;
      
      gl_FragColor = vec4(fluidColor + scanline, 1.0);
    }
  `
};

const FluidBackground = () => {
  const mesh = useRef();
  
  useFrame((state) => {
    if (mesh.current) {
      // Zamanı gönder (Akış için)
      mesh.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
      // Mouse pozisyonunu yumuşakça gönder (Etkileşim için)
      // (0,0) sol alt köşe yerine (0.5, 0.5) merkez bazlı normalize ediyoruz
      mesh.current.material.uniforms.uMouse.value.x = (state.mouse.x + 1) / 2;
      mesh.current.material.uniforms.uMouse.value.y = (state.mouse.y + 1) / 2;
    }
  });

  // Materiali bir kez oluştur (Performans için)
  const materialArgs = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#CCFF00") },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) }
    },
    vertexShader: FluidMaterial.vertexShader,
    fragmentShader: FluidMaterial.fragmentShader,
  }), []);

  return (
    <mesh ref={mesh} scale={[10, 10, 1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial args={[materialArgs]} />
    </mesh>
  );
};

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      
      {/* KATMAN 1: DİJİTAL SIVI (CANVAS) */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <FluidBackground />
        </Canvas>
      </div>

      {/* KATMAN 2: HTML İÇERİK (ASLA ÇÖKMEZ) */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-4 pointer-events-none">
        
        {/* Sol Üst HUD Bilgisi */}
        <div className="absolute top-8 left-8 text-[10px] font-mono text-[#CCFF00] opacity-60">
           SYSTEM: ONLINE <br/>
           PROTOCOL: LIQUID_REALITY
        </div>

        <motion.div 
           initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
           animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
           transition={{ duration: 1.2 }}
           className="text-center mix-blend-difference"
        >
          <h1 className="text-[14vw] font-black text-white leading-[0.85] tracking-tighter font-clash select-none">
            DIGITAL
          </h1>
          <h1 className="text-[14vw] font-black text-transparent leading-[0.85] tracking-tighter font-clash bg-clip-text bg-gradient-to-b from-[#CCFF00] to-transparent select-none">
            ALCHEMY
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-10 text-xs md:text-sm font-mono text-[#CCFF00] uppercase tracking-[0.3em] bg-black/80 backdrop-blur-md px-6 py-3 border border-[#CCFF00]/20 rounded-full"
        >
          // Transmuting Code into Reality
        </motion.p>
      </div>

    </section>
  );
};

export default Hero;