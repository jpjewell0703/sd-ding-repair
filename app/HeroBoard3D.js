"use client";

import { useEffect, useRef } from "react";

// Split a (centered) geometry into two halves at y = 0 by sorting each triangle
// into the nose or tail half by its centroid. Lets the board start "snapped"
// and reassemble. Returns [noseGeo, tailGeo].
function splitGeometry(THREE, src) {
  const g = src.index ? src.toNonIndexed() : src;
  const pos = g.attributes.position.array;
  const nor = g.attributes.normal ? g.attributes.normal.array : null;
  const noseP = [];
  const noseN = [];
  const tailP = [];
  const tailN = [];
  for (let i = 0; i < pos.length; i += 9) {
    const cy = (pos[i + 1] + pos[i + 4] + pos[i + 7]) / 3;
    const P = cy >= 0 ? noseP : tailP;
    const N = cy >= 0 ? noseN : tailN;
    for (let k = 0; k < 9; k++) {
      P.push(pos[i + k]);
      if (nor) N.push(nor[i + k]);
    }
  }
  const make = (P, N) => {
    const bg = new THREE.BufferGeometry();
    bg.setAttribute("position", new THREE.Float32BufferAttribute(P, 3));
    if (N.length) bg.setAttribute("normal", new THREE.Float32BufferAttribute(N, 3));
    return bg;
  };
  return [make(noseP, noseN), make(tailP, tailN)];
}

// A real 3D surfboard floating in the hero — glossy resin, lit with the brand
// teal + coral, slowly rotating with a gentle bob and reacting to the cursor.
// three.js is imported dynamically so it's code-split off the initial bundle
// and never runs on the server. Falls back to static (no canvas work) for
// reduced-motion users.
export default function HeroBoard3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const { RoomEnvironment } = await import(
        "three/examples/jsm/environments/RoomEnvironment.js"
      );
      const mount = mountRef.current;
      if (disposed || !mount) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, w / h, 0.1, 100);
      camera.position.set(0, 0, 10);

      // studio reflections for the glossy cl+ coat
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

      // ---- surfboard outline (pointed nose, rounded pin tail) ----
      const L = 3.0; // half length
      const W = 0.6; // half width
      const shape = new THREE.Shape();
      shape.moveTo(0, L);
      shape.bezierCurveTo(0.32, L * 0.6, W, L * 0.25, W, -L * 0.15);
      shape.bezierCurveTo(W, -L * 0.55, W * 0.5, -L * 0.93, 0, -L);
      shape.bezierCurveTo(-W * 0.5, -L * 0.93, -W, -L * 0.55, -W, -L * 0.15);
      shape.bezierCurveTo(-W, L * 0.25, -0.32, L * 0.6, 0, L);

      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: 0.12,
        bevelEnabled: true,
        bevelThickness: 0.16,
        bevelSize: 0.13,
        bevelSegments: 10,
        steps: 1,
      });
      geo.center();

      const mat = new THREE.MeshPhysicalMaterial({
        color: 0x1f2e34,
        roughness: 0.12,
        metalness: 0,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        envMapIntensity: 0.7,
        emissive: 0x0c2e35,
        emissiveIntensity: 0.3,
      });
      // split into two halves so the board can start snapped and repair itself
      const [noseGeo, tailGeo] = splitGeometry(THREE, geo);
      geo.dispose();
      const nose = new THREE.Mesh(noseGeo, mat);
      const tail = new THREE.Mesh(tailGeo, mat);

      // a stringer segment down each half's centerline
      const stringerMat = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        roughness: 0.5,
      });
      const mkStringer = (cy) => {
        const s = new THREE.Mesh(
          new THREE.BoxGeometry(0.025, L * 0.95, 0.02),
          stringerMat
        );
        s.position.set(0, cy, 0.2);
        return s;
      };
      nose.add(mkStringer(L * 0.5));
      tail.add(mkStringer(-L * 0.5));

      const board = new THREE.Group();
      board.add(nose, tail);

      const group = new THREE.Group();
      group.add(board);
      group.rotation.set(-0.35, 0.5, 0.82);
      group.scale.setScalar(1.06);
      scene.add(group);

      // ---- lighting: bold brand-colored rim lights so the dark board glows
      // teal on one rail, coral on the other — the "lit in space" look ----
      scene.add(new THREE.AmbientLight(0xffffff, 0.18));
      const teal = new THREE.DirectionalLight(0x46c5d6, 3.6);
      teal.position.set(-5, 3, 4);
      scene.add(teal);
      const coral = new THREE.DirectionalLight(0xff7a59, 2.8);
      coral.position.set(5, -2, 3);
      scene.add(coral);
      const key = new THREE.DirectionalLight(0xffffff, 0.5);
      key.position.set(0, 6, 3);
      scene.add(key);

      // ---- interaction + animation ----
      let tx = 0;
      let ty = 0;
      let cx = 0;
      let cy = 0;
      const onMove = (e) => {
        tx = e.clientX / window.innerWidth - 0.5;
        ty = e.clientY / window.innerHeight - 0.5;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      const clock = new THREE.Clock();
      const introDur = 2.4; // seconds for the two halves to knit together
      let frame = 0;
      const renderOnce = () => {
        const t = clock.getElapsedTime();
        cx += (tx - cx) * 0.05;
        cy += (ty - cy) * 0.05;

        // intro: halves start apart (snapped) and ease into one whole board
        const p = Math.min(t / introDur, 1);
        const e = 1 - Math.pow(1 - p, 3); // easeOutCubic
        const sep = 1 - e;
        nose.position.set(sep * 0.22, sep * 1.35, sep * 0.5);
        nose.rotation.set(sep * 0.22, 0, sep * 0.4);
        tail.position.set(-sep * 0.22, -sep * 1.35, sep * 0.5);
        tail.rotation.set(-sep * 0.22, 0, -sep * 0.4);

        // the float/spin eases in as the board becomes whole
        group.rotation.y = 0.5 + t * 0.22 * e + cx * 0.7;
        group.rotation.x = -0.35 + Math.sin(t * 0.45) * 0.07 * e + cy * 0.4;
        group.position.y = Math.sin(t * 0.7) * 0.14 * e;
        renderer.render(scene, camera);
      };
      const loop = () => {
        frame = requestAnimationFrame(loop);
        renderOnce();
      };

      // pause the WebGL loop while the hero is scrolled out of view
      let io = null;
      if (reduced) {
        group.rotation.y = 0.5;
        renderer.render(scene, camera);
      } else {
        loop();
        io = new IntersectionObserver(
          ([e]) => {
            if (e.isIntersecting && !frame) {
              loop();
            } else if (!e.isIntersecting && frame) {
              cancelAnimationFrame(frame);
              frame = 0;
            }
          },
          { threshold: 0 }
        );
        io.observe(mount);
      }

      const onResize = () => {
        const nw = mount.clientWidth || 1;
        const nh = mount.clientHeight || 1;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
      };
      window.addEventListener("resize", onResize);

      cleanup = () => {
        if (frame) cancelAnimationFrame(frame);
        if (io) io.disconnect();
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("resize", onResize);
        scene.traverse((o) => {
          if (o.geometry) o.geometry.dispose();
          if (o.material) o.material.dispose();
        });
        pmrem.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div className="hero-board3d" ref={mountRef} aria-hidden="true" />;
}
