
const WHATSAPP='5491166534625';
let productos=[];
const $=s=>document.querySelector(s);
function fallbackSvg(marca){return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='500'%3E%3Crect width='100%25' height='100%25' fill='%23f4f6f8'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='34' fill='%2398a2b3'%3E${encodeURIComponent(marca)}%3C/text%3E%3C/svg%3E`}
function render(list){
 $('#count').textContent=`Mostrando ${list.length} modelo${list.length!==1?'s':''}`;
 $('#grid').innerHTML=list.map(p=>{
  const sabores=p.sabores||[];
  const top=sabores.slice(0,8).map(s=>`<span class="chip">${s.nombre}</span>`).join('');
  const all=sabores.map(s=>`<li><b>${s.nombre}</b><br><span class="muted">${s.descripcion||''}</span></li>`).join('');
  const msg=encodeURIComponent(`Hola, me interesa ${p.marca} ${p.modelo}. Quisiera consultar disponibilidad, sabores y formas de pago.`);
  return `<article class="card">
   <div class="imgbox"><img src="${p.imagen}" alt="${p.marca} ${p.modelo}" loading="lazy" onerror="this.src='${fallbackSvg(p.marca)}'"></div>
   <div class="body"><div class="tag">${p.marca}</div><div class="title">${p.modelo}</div><div class="muted">${sabores.length} sabores disponibles</div>
   <div class="price">USD ${Number(p.precioMayorista).toFixed(2)}</div><div class="muted">Precio mayorista desde</div>
   <div class="flavors">${top}${sabores.length>8?`<span class="chip">+${sabores.length-8} más</span>`:''}</div>
   <details class="details"><summary>Ver sabores y descripciones</summary><ul class="flavor-list">${all}</ul></details>
   <a class="wa" href="https://wa.me/${WHATSAPP}?text=${msg}" target="_blank" rel="noopener">💬 Consultar por WhatsApp</a></div>
  </article>`
 }).join('');
}
function filter(){const q=$('#search').value.toLowerCase();const b=$('#brand').value;let out=productos.filter(p=>{const text=[p.marca,p.modelo,...(p.sabores||[]).map(s=>s.nombre)].join(' ').toLowerCase();return (!q||text.includes(q))&&(!b||p.marca===b)});render(out)}
async function init(){productos=await fetch('productos.json').then(r=>r.json());const brands=[...new Set(productos.map(p=>p.marca))].sort();$('#brand').innerHTML='<option value="">Todas las marcas</option>'+brands.map(b=>`<option>${b}</option>`).join('');$('#search').addEventListener('input',filter);$('#brand').addEventListener('change',filter);render(productos)}
init();
