
// 3D neon background using Three.js
(function(){
  const canvas = document.getElementById('bg3d');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true });
  function resize(){
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
  }
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, innerWidth/innerHeight, 0.1, 100);
  camera.position.set(0, 0, 10);

  // particles
  const geo = new THREE.BufferGeometry();
  const count = 800;
  const positions = new Float32Array(count * 3);
  for(let i=0;i<count;i++){
    positions[i*3+0] = (Math.random()-0.5)*40;
    positions[i*3+1] = (Math.random()-0.5)*20;
    positions[i*3+2] = (Math.random()-0.5)*20;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({ color:0x66ccff, size:0.03, transparent:true, opacity:0.7 });
  const points = new THREE.Points(geo, mat);
  scene.add(points);

  // floating cubes
  const cubeGeo = new THREE.BoxGeometry(0.8,0.8,0.8);
  const cubeMat = new THREE.MeshBasicMaterial({ color:0x9a4dff, wireframe:true, opacity:0.6, transparent:true });
  const cubes = [];
  for(let i=0;i<12;i++){
    const m = new THREE.Mesh(cubeGeo, cubeMat.clone());
    m.position.set((Math.random()-0.5)*20, (Math.random()-0.5)*10, (Math.random()-0.5)*10);
    m.material.color.setHSL(Math.random(), 0.7, 0.6);
    cubes.push(m); scene.add(m);
  }

  window.addEventListener('resize', resize);

  let t=0;
  function tick(){
    t += 0.002;
    points.rotation.y += 0.0009;
    cubes.forEach((c,i)=>{
      c.rotation.x += 0.004 + i*0.0003;
      c.rotation.y += 0.003 + i*0.0002;
      c.position.y += Math.sin(t + i)*0.002;
    });
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  resize(); tick();
})();

// 3D hover tilt for cards
document.addEventListener('mousemove', (e)=>{
  document.querySelectorAll('.tilt').forEach(el=>{
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left)/r.width - .5;
    const y = (e.clientY - r.top)/r.height - .5;
    el.style.transform = `perspective(600px) rotateY(${-x*6}deg) rotateX(${y*6}deg) translateY(-2px)`;
  });
});
document.querySelectorAll('.tilt').forEach(el=>{
  el.addEventListener('mouseleave', ()=>{
    el.style.transform = 'none';
  });
});
