"use client";

import { useEffect, useRef } from "react";

// A 3D surfboard floating in the hero. Normally it's a glossy solid board, but
// it's also a cloud of ~60k particles sampled from its surface:
//  • on page load it materializes from scattered pixels into the solid board
//  • hovering the board shatters it into pixels
//  • moving the cursor away lets it slowly reform
// A single `progress` value (0 = solid board, 1 = fully shattered) crossfades
// the solid mesh against the particle cloud. three.js is dynamically imported
// (code-split, client-only); reduced-motion users get a static solid board.
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
      const { MeshSurfaceSampler } = await import(
        "three/examples/jsm/math/MeshSurfaceSampler.js"
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
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(pixelRatio);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, w / h, 0.1, 100);
      camera.position.set(0, 0, 10);

      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

      // ---- surfboard outline (pointed nose, rounded pin tail) ----
      const L = 3.0;
      const W = 0.6;
      const shape = new THREE.Shape();
      shape.moveTo(0, L);
      shape.bezierCurveTo(0.32, L * 0.6, W, L * 0.25, W, -L * 0.15);
      shape.bezierCurveTo(W, -L * 0.55, W * 0.5, -L * 0.93, 0, -L);
      shape.bezierCurveTo(-W * 0.5, -L * 0.93, -W, -L * 0.55, -W, -L * 0.15);
      shape.bezierCurveTo(-W, L * 0.25, -0.32, L * 0.6, 0, L);

      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: 0.06,
        bevelEnabled: true,
        bevelThickness: 0.08,
        bevelSize: 0.13,
        bevelSegments: 10,
        steps: 1,
      });
      geo.center();

      // solid glossy board
      const boardMat = new THREE.MeshPhysicalMaterial({
        color: 0x14233f,
        roughness: 0.12,
        metalness: 0,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        envMapIntensity: 0.8,
        emissive: 0x0a1c3a,
        emissiveIntensity: 0.3,
        transparent: true,
      });
      const boardMesh = new THREE.Mesh(geo, boardMat);

      const stringerMat = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        roughness: 0.5,
        transparent: true,
      });
      const stringer = new THREE.Mesh(
        new THREE.BoxGeometry(0.025, L * 1.93, 0.01),
        stringerMat
      );
      stringer.position.z = 0.1;
      boardMesh.add(stringer);

      // ---- particle cloud sampled from the board surface ----
      const COUNT = 60000;
      const sampler = new MeshSurfaceSampler(boardMesh).build();
      const home = new Float32Array(COUNT * 3);
      const scatter = new Float32Array(COUNT * 3);
      const rand = new Float32Array(COUNT);
      const tmp = new THREE.Vector3();
      for (let i = 0; i < COUNT; i++) {
        sampler.sample(tmp);
        home[i * 3] = tmp.x;
        home[i * 3 + 1] = tmp.y;
        home[i * 3 + 2] = tmp.z;
        // random point on a sphere, pushed out to a random distance
        const u = Math.random() * 2 - 1;
        const th = Math.random() * Math.PI * 2;
        const s = Math.sqrt(1 - u * u);
        const dist = 2 + Math.random() * 5;
        scatter[i * 3] = s * Math.cos(th) * dist;
        scatter[i * 3 + 1] = s * Math.sin(th) * dist * 1.4;
        scatter[i * 3 + 2] = u * dist;
        rand[i] = Math.random();
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(home, 3));
      pGeo.setAttribute("aScatter", new THREE.BufferAttribute(scatter, 3));
      pGeo.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));

      const pMat = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uProgress: { value: 1 },
          uAlpha: { value: 1 },
          uSize: { value: 26 * pixelRatio },
          uColorA: { value: new THREE.Color(0x9ec1f0) },
          uColorB: { value: new THREE.Color(0xffffff) },
        },
        vertexShader: `
          uniform float uProgress;
          uniform float uSize;
          attribute vec3 aScatter;
          attribute float aRand;
          varying float vMix;
          void main() {
            // stagger each particle so they don't all move in lockstep
            float p = clamp(uProgress * (0.55 + aRand) * 1.7 - aRand * 0.4, 0.0, 1.0);
            vMix = p;
            vec3 pos = mix(position, position + aScatter, p);
            vec4 mv = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = uSize / -mv.z;
          }
        `,
        fragmentShader: `
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          uniform float uAlpha;
          varying float vMix;
          void main() {
            vec2 c = gl_PointCoord - 0.5;
            if (dot(c, c) > 0.25) discard;        // round pixel
            vec3 col = mix(uColorA, uColorB, vMix); // hotter as it shatters
            gl_FragColor = vec4(col, uAlpha);
          }
        `,
      });
      const points = new THREE.Points(pGeo, pMat);

      const group = new THREE.Group();
      group.add(boardMesh, points);
      group.rotation.set(-0.35, 0.5, 0.82);
      group.scale.setScalar(1.06);
      scene.add(group);

      // ---- lighting ----
      scene.add(new THREE.AmbientLight(0xffffff, 0.2));
      const blue = new THREE.DirectionalLight(0x5b86d6, 3.4);
      blue.position.set(-5, 3, 4);
      scene.add(blue);
      const white = new THREE.DirectionalLight(0xffffff, 2.4);
      white.position.set(5, -2, 3);
      scene.add(white);
      const key = new THREE.DirectionalLight(0xdfe9ff, 0.6);
      key.position.set(0, 6, 3);
      scene.add(key);

      // ---- interaction ----
      let tx = 0;
      let ty = 0;
      let cx = 0;
      let cy = 0;
      const pointer = new THREE.Vector2(2, 2); // start off-canvas (no hover)
      const raycaster = new THREE.Raycaster();
      const onMove = (e) => {
        const rect = renderer.domElement.getBoundingClientRect();
        pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        tx = e.clientX / window.innerWidth - 0.5;
        ty = e.clientY / window.innerHeight - 0.5;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      // progress: 0 = solid board, 1 = fully shattered. Starts shattered so the
      // page-load animation reforms it. Shatter is fast, reform is slow.
      let progress = 1;
      const clock = new THREE.Clock();
      let frame = 0;

      const renderOnce = () => {
        const t = clock.getElapsedTime();
        cx += (tx - cx) * 0.05;
        cy += (ty - cy) * 0.05;
        group.rotation.y = 0.5 + t * 0.18 + cx * 0.7;
        group.rotation.x = -0.35 + Math.sin(t * 0.4) * 0.06 + cy * 0.4;
        group.position.y = Math.sin(t * 0.7) * 0.12;
        group.updateMatrixWorld();

        // hover test against the (possibly invisible) solid board
        raycaster.setFromCamera(pointer, camera);
        const hovered = raycaster.intersectObject(boardMesh, false).length > 0;
        const target = hovered ? 1 : 0;
        const rate = target > progress ? 0.16 : 0.02; // shatter fast, reform slow
        progress += (target - progress) * rate;
        if (progress < 0.0005) progress = 0;

        pMat.uniforms.uProgress.value = progress;
        pMat.uniforms.uAlpha.value = Math.min(progress * 1.4, 1);
        const solid = 1 - Math.min(progress * 1.3, 1);
        boardMat.opacity = solid;
        stringerMat.opacity = solid;
        boardMesh.visible = solid > 0.001;
        points.visible = progress > 0.001; // skip 60k points when fully solid

        renderer.render(scene, camera);
      };

      const loop = () => {
        frame = requestAnimationFrame(loop);
        renderOnce();
      };

      let io = null;
      if (reduced) {
        progress = 0;
        boardMat.opacity = 1;
        stringerMat.opacity = 1;
        pMat.uniforms.uAlpha.value = 0;
        renderer.render(scene, camera);
      } else {
        loop();
        io = new IntersectionObserver(
          ([e]) => {
            if (e.isIntersecting && !frame) loop();
            else if (!e.isIntersecting && frame) {
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
        pGeo.dispose();
        pMat.dispose();
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
