import * as THREE from 'three';

const cubeLines = [
  //top
  [new THREE.Vector3(-0.5, 0.5, -0.5), new THREE.Vector3(-0.5, 0.5, 0.5)],
  [new THREE.Vector3(-0.5, 0.5, 0.5), new THREE.Vector3(0.5, 0.5, 0.5)],
  [new THREE.Vector3(0.5, 0.5, 0.5), new THREE.Vector3(0.5, 0.5, -0.5)],
  [new THREE.Vector3(0.5, 0.5, -0.5), new THREE.Vector3(-0.5, 0.5, -0.5)],
  //back
  [new THREE.Vector3(-0.5, 0.5, -0.5), new THREE.Vector3(-0.5, -0.5, -0.5)],
  [new THREE.Vector3(-0.5, -0.5, -0.5), new THREE.Vector3(0.5, -0.5, -0.5)],
  [new THREE.Vector3(0.5, -0.5, -0.5), new THREE.Vector3(0.5, 0.5, -0.5)],
  //left
  [new THREE.Vector3(-0.5, 0.5, 0.5), new THREE.Vector3(-0.5, -0.5, 0.5)],
  [new THREE.Vector3(-0.5, -0.5, 0.5), new THREE.Vector3(-0.5, -0.5, -0.5)],
  //right
  [new THREE.Vector3(0.5, 0.5, 0.5), new THREE.Vector3(0.5, -0.5, 0.5)],
  [new THREE.Vector3(0.5, -0.5, 0.5), new THREE.Vector3(0.5, -0.5, -0.5)],
  //front
  [new THREE.Vector3(-0.5, -0.5, 0.5), new THREE.Vector3(0.5, -0.5, 0.5)]
];

export function getCube(): THREE.Group {
  const group = new THREE.Group();

  const ll: THREE.Line<THREE.Geometry, THREE.LineBasicMaterial>[] = [];
  cubeLines.forEach((l, i) => {
    const g = new THREE.Geometry();
    g.vertices.push(l[0], l[1]);
    const line = new THREE.Line(
      g,
      new THREE.LineBasicMaterial({ color: 0xffffff })
    );
    line.name = i.toString();
    ll.push(line);
  });
  group.add(...ll);

  const b = new THREE.BoxGeometry(1, 1, 1);
  const g = new THREE.SphereBufferGeometry(0.1);
  b.vertices.forEach(v => {
    const m = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
    const s = new THREE.Mesh(g, m);
    s.position.set(v.x, v.y, v.z);
    //add connected lines names
    s.userData.lineNames = ll.filter(o =>
      o.geometry.vertices.some(
        vv => vv.x === v.x && vv.y === v.y && vv.z === v.z)
    ).map(e => e.name);
    group.add(s);
  });

  return group;
}