/* Progressive enhancement: every page and link also works without JavaScript. */
(() => {
  const root = document.querySelector('#zhao-people-scope');
  if (!root) return;
  const scene = root.querySelector('.z-atmosphere');
  const button = root.querySelector('.z-motion-button');
  if (!scene || !button) return;
  const canvas = scene.querySelector('canvas');
  const image = scene.querySelector('img');
  const context = canvas?.getContext('2d');
  if (!context) { button.hidden = true; return; }

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const dark = matchMedia('(prefers-color-scheme: dark)');
  let playing = !reduced.matches;
  let visible = true;
  let frame = 0;
  let previous = 0;
  let elapsed = 0;
  let width = 0;
  let height = 0;
  const curves = [
    [.531,.219,.569,.218,.551,.308,.580,.315],
    [.531,.297,.568,.296,.548,.422,.580,.423],
    [.531,.463,.548,.463,.568,.463,.580,.463],
    [.535,.675,.568,.675,.548,.505,.580,.505],
    [.776,.320,.800,.322,.785,.198,.817,.197],
    [.776,.414,.816,.418,.799,.365,.814,.365],
    [.776,.449,.807,.449,.803,.519,.825,.525],
    [.776,.465,.800,.475,.788,.606,.807,.654]
  ];
  function draw() {
    if (!width || !height) return;
    context.clearRect(0,0,width,height);
    context.fillStyle = getComputedStyle(canvas).color;
    const rgb = getComputedStyle(root).backgroundColor.match(/[\d.]+/g);
    const isDark = rgb && rgb.slice(0,3).map(Number).reduce((a,b)=>a+b,0) < 380;
    image.style.filter = isDark ? 'invert(1) hue-rotate(180deg)' : 'none';
    image.style.mixBlendMode = isDark ? 'screen' : 'normal';
    const contain = getComputedStyle(image).objectFit === 'contain';
    const iw = image.naturalWidth || 1774;
    const ih = image.naturalHeight || 887;
    const scale = (contain ? Math.min : Math.max)(width/iw,height/ih);
    const w = iw*scale, h = ih*scale, x = width-w, y = contain ? 0 : (height-h)/2;
    const dot = (px,py,r,alpha) => {
      context.globalAlpha = alpha;
      context.beginPath(); context.arc(x+px*w,y+py*h,r,0,Math.PI*2); context.fill();
    };
    curves.forEach((c,j) => {
      const t = (0.000045*elapsed+.137*j)%1, u = 1-t;
      dot(u*u*u*c[0]+3*u*u*t*c[2]+3*u*t*t*c[4]+t*t*t*c[6],
          u*u*u*c[1]+3*u*u*t*c[3]+3*u*t*t*c[5]+t*t*t*c[7],
          Math.max(1.2,2.4*scale),.48*Math.sin(t*Math.PI));
    });
    const xs = [.592,.634,.670];
    for (let j=0;j<8;j++) {
      const t=(.000035*elapsed+.157*j)%1, segment=Math.min(1,Math.floor(2*t)), u=2*t-segment;
      const ys=[.274+j%7*.039,.276+3*j%9*.039,.353+2*j%6*.039];
      dot(xs[segment]+(xs[segment+1]-xs[segment])*u,
          ys[segment]+(ys[segment+1]-ys[segment])*u,
          Math.max(1,1.8*scale),.4*Math.sin(t*Math.PI));
    }
    context.globalAlpha=1;
  }
  function tick(time) {
    frame=0;
    if (!playing || reduced.matches || !visible || document.hidden) { previous=0; return; }
    if (previous) elapsed+=Math.min(time-previous,80);
    previous=time; draw(); frame=requestAnimationFrame(tick);
  }
  function update() {
    if (frame) cancelAnimationFrame(frame);
    frame=0; previous=0;
    button.disabled=reduced.matches;
    button.textContent=reduced.matches ? 'Reduced motion' : playing ? 'Pause background' : 'Play background';
    button.setAttribute('aria-pressed',String(playing && !reduced.matches));
    draw();
    if (playing && !reduced.matches && visible && !document.hidden) frame=requestAnimationFrame(tick);
  }
  function resize() {
    const rect=scene.getBoundingClientRect();
    width=rect.width; height=rect.height;
    const ratio=Math.min(devicePixelRatio||1,2);
    canvas.width=Math.round(width*ratio); canvas.height=Math.round(height*ratio);
    context.setTransform(ratio,0,0,ratio,0,0); draw();
  }
  button.addEventListener('click',()=>{playing=!playing;update();});
  reduced.addEventListener('change',()=>{if(reduced.matches) playing=false;update();});
  dark.addEventListener('change',draw);
  document.addEventListener('visibilitychange',update);
  image.addEventListener('load',resize);
  new ResizeObserver(resize).observe(scene);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;update();},{threshold:.01}).observe(scene);
  resize(); update();
})();
