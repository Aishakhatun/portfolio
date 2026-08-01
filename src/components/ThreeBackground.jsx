'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext.jsx';

export default function ThreeBackground() {
  const mountRef = useRef(null);
  const { isDark } = useTheme();
  const sceneRef = useRef({});

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Scene ──────────────────────────────────────────────────
    const scene = new THREE.Scene();

    // ── Camera ─────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 200);
    camera.position.set(0, 0, 30);

    // ── Renderer ───────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // ── COLORS ─────────────────────────────────────────────────
    const COLORS = [0x6366f1, 0x8b5cf6, 0x06b6d4, 0xec4899, 0x10b981, 0xf59e0b];

    // ── 1. Star field ───────────────────────────────────────────
    const starGeo = new THREE.BufferGeometry();
    const starCount = 1800;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) starPos[i] = (Math.random() - 0.5) * 280;
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0x8888cc, size: 0.2, transparent: true });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // ── 2. Coloured floating particles ─────────────────────────
    const particleGroups = [];
    COLORS.forEach((color) => {
      const geo = new THREE.BufferGeometry();
      const count = 100;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 80;
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ color, size: 0.38, transparent: true });
      const pts = new THREE.Points(geo, mat);
      scene.add(pts);
      particleGroups.push({ pts, mat });
    });

    // ── 3. Wireframe geometries ─────────────────────────────────
    const shapes = [];
    const geoTypes = [
      new THREE.IcosahedronGeometry(4, 1),
      new THREE.OctahedronGeometry(3, 0),
      new THREE.TorusGeometry(4, 0.8, 12, 40),
      new THREE.TetrahedronGeometry(3, 0),
      new THREE.TorusKnotGeometry(3, 0.7, 80, 10),
      new THREE.IcosahedronGeometry(2.5, 0),
      new THREE.OctahedronGeometry(2, 1),
    ];
    const positions = [[-20,8,-10],[18,-6,-8],[-12,-12,-5],[22,14,-15],[-5,15,-12],[14,-15,-6],[-18,4,-14]];

    const wireMaterials = [];
    geoTypes.forEach((geo, i) => {
      const mat = new THREE.MeshBasicMaterial({
        color: COLORS[i % COLORS.length],
        wireframe: true,
        transparent: true,
      });
      wireMaterials.push(mat);
      const mesh = new THREE.Mesh(geo, mat);
      const p = positions[i];
      mesh.position.set(p[0], p[1], p[2]);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      scene.add(mesh);
      shapes.push({ mesh, rotX:(Math.random()-0.5)*0.005, rotY:(Math.random()-0.5)*0.006,
        floatAmp: 0.5 + Math.random()*0.8, floatSpeed: 0.3+Math.random()*0.4,
        originY: p[1], phase: Math.random()*Math.PI*2 });
    });

    // ── 4. Node graph ───────────────────────────────────────────
    const nodeCount = 55;
    const nodePositions = [];
    for (let i = 0; i < nodeCount; i++) {
      nodePositions.push(new THREE.Vector3(
        (Math.random()-0.5)*70, (Math.random()-0.5)*50, (Math.random()-0.5)*30-5
      ));
    }
    const lineVerts = [];
    const MAX_DIST = 14;
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i+1; j < nodeCount; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < MAX_DIST) {
          lineVerts.push(nodePositions[i].x, nodePositions[i].y, nodePositions[i].z);
          lineVerts.push(nodePositions[j].x, nodePositions[j].y, nodePositions[j].z);
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(lineVerts), 3));
    const lineMat = new THREE.LineBasicMaterial({ color: 0x6366f1, transparent: true });
    scene.add(new THREE.LineSegments(lineGeo, lineMat));

    const nodeGeo = new THREE.BufferGeometry();
    const nodePosArr = new Float32Array(nodeCount * 3);
    nodePositions.forEach((v,i)=>{ nodePosArr[i*3]=v.x; nodePosArr[i*3+1]=v.y; nodePosArr[i*3+2]=v.z; });
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePosArr, 3));
    const nodeMat = new THREE.PointsMaterial({ color: 0x8b5cf6, size: 0.45, transparent: true });
    scene.add(new THREE.Points(nodeGeo, nodeMat));

    // ── 5. Background rings ─────────────────────────────────────
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x6366f1, transparent: true });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(22,0.12,8,120), ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true });
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(15,0.08,8,100), ring2Mat);
    ring2.rotation.x = -Math.PI / 4; ring2.rotation.y = Math.PI / 6;
    scene.add(ring2);

    // ── Store refs for theme update ─────────────────────────────
    sceneRef.current = { renderer, starMat, particleGroups, wireMaterials, lineMat, nodeMat, ring1Mat, ring2Mat, scene };

    // ── Mouse parallax ──────────────────────────────────────────
    const mouse = { x:0, y:0 };
    const target = { x:0, y:0 };
    const onMouseMove = (e) => {
      mouse.x = (e.clientX/window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY/window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // ── Resize ──────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // ── Clock ───────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      target.x += (mouse.x*2 - target.x) * 0.04;
      target.y += (mouse.y*1.5 - target.y) * 0.04;
      camera.position.x = target.x;
      camera.position.y = target.y;
      camera.lookAt(scene.position);

      shapes.forEach(s => {
        s.mesh.rotation.x += s.rotX;
        s.mesh.rotation.y += s.rotY;
        s.mesh.position.y = s.originY + Math.sin(t*s.floatSpeed + s.phase)*s.floatAmp;
      });

      particleGroups.forEach(({pts}, i) => {
        pts.rotation.y = t * 0.04 * (i%2===0?1:-1);
        pts.rotation.x = t * 0.02 * (i%3===0?1:-1);
      });

      ring1.rotation.z += 0.001;
      ring2.rotation.z -= 0.0008;

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ─────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      sceneRef.current = {};
    };
  }, []);

  // ── React to theme changes without restarting scene ───────────
  useEffect(() => {
    const s = sceneRef.current;
    if (!s.renderer) return;

    if (isDark) {
      // Dark: deep space background
      s.renderer.setClearColor(0x0a0a1a, 1);
      s.starMat.opacity = 0.65;
      s.starMat.visible = true;
      s.particleGroups.forEach(({ mat }) => { mat.opacity = 0.85; });
      s.wireMaterials.forEach(m => { m.opacity = 0.18; });
      s.lineMat.opacity = 0.12;
      s.nodeMat.opacity = 0.70;
      s.ring1Mat.opacity = 0.08;
      s.ring2Mat.opacity = 0.07;
    } else {
      // Light: soft lavender-white — shapes show as coloured sketches
      s.renderer.setClearColor(0xeef2ff, 1);
      s.starMat.opacity = 0.0;  // hide stars on light bg
      s.starMat.visible = false;
      s.particleGroups.forEach(({ mat }) => { mat.opacity = 0.45; });
      s.wireMaterials.forEach(m => { m.opacity = 0.20; });
      s.lineMat.opacity = 0.18;
      s.nodeMat.opacity = 0.55;
      s.ring1Mat.opacity = 0.10;
      s.ring2Mat.opacity = 0.09;
    }
  }, [isDark]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ pointerEvents: 'none' }}
    />
  );
}
