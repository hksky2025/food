/* ============================================================
   小廚料理手帳 — components.js
   所有 UI 組件：Icons, RecipeCard, DetailView, RecipeForm,
                 Dashboard, ShoppingList, Calendar
   ============================================================ */

// ── SVG Icon System ───────────────────────────────────────────────────────────
const Ico = ({ size = 18, children, style, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
       strokeLinejoin="round" style={style} className={className}>
    {children}
  </svg>
);

window.Icons = {
  Plus:    (p) => <Ico {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Ico>,
  X:       (p) => <Ico {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></Ico>,
  Link:    (p) => <Ico {...p}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></Ico>,
  Trash:   (p) => <Ico {...p}><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></Ico>,
  Edit:    (p) => <Ico {...p}><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></Ico>,
  Chef:    (p) => <Ico {...p}><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 9.08 0A5.11 5.11 0 0 1 18.59 6 4 4 0 0 1 20 13.87V21H6Z"/><line x1="6" y1="17" x2="20" y2="17"/></Ico>,
  Camera:  (p) => <Ico {...p}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></Ico>,
  Image:   (p) => <Ico {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></Ico>,
  Search:  (p) => <Ico {...p}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Ico>,
  Clock:   (p) => <Ico {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></Ico>,
  Book:    (p) => <Ico {...p}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></Ico>,
  Chart:   (p) => <Ico {...p}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></Ico>,
  Cart:    (p) => <Ico {...p}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></Ico>,
  Cal:     (p) => <Ico {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></Ico>,
  Star:    (p) => <Ico {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></Ico>,
  Heart:   (p) => <Ico {...p}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></Ico>,
  Home:    (p) => <Ico {...p}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></Ico>,
  Sparkle: (p) => <Ico {...p}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L12 3Z"/></Ico>,
  ChevL:   (p) => <Ico {...p}><polyline points="15 18 9 12 15 6"/></Ico>,
  ChevR:   (p) => <Ico {...p}><polyline points="9 18 15 12 9 6"/></Ico>,
  Copy:    (p) => <Ico {...p}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></Ico>,
  Notes:   (p) => <Ico {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></Ico>,
};

// ── Constants ─────────────────────────────────────────────────────────────────
window.CATEGORIES = [
  '家常小菜','肉類料理','海鮮料理','蔬菜/素食',
  '湯水/糖水','粉麵飯(主食)','快速料理(15分)',
  '減脂/健康','早餐/烘焙','日韓料理','西式料理','其他'
];
window.DIFFICULTIES = ['簡單','中等','困難'];

const catEmoji = (c = '') => {
  if (c.includes('肉'))  return '🥩';
  if (c.includes('海鮮')) return '🦐';
  if (c.includes('蔬菜') || c.includes('素')) return '🥦';
  if (c.includes('湯'))  return '🍲';
  if (c.includes('粉麵') || c.includes('主食')) return '🍜';
  if (c.includes('快速')) return '⚡';
  if (c.includes('減脂') || c.includes('健康')) return '🥗';
  if (c.includes('早餐') || c.includes('烘焙')) return '🥐';
  if (c.includes('日') || c.includes('韓')) return '🍱';
  if (c.includes('西')) return '🍝';
  return '🍳';
};
window.catEmoji = catEmoji;

const diffClass = (d) => d === '簡單' ? 'meta-easy' : d === '困難' ? 'meta-hard' : 'meta-medium';
window.diffClass = diffClass;

// ── Image Compression ─────────────────────────────────────────────────────────
window.compressImage = (file) => new Promise((res, rej) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (e) => {
    const img = new Image();
    img.src = e.target.result;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const MAX = 800;
      let w = img.width, h = img.height;
      if (w > MAX) { h = h * MAX / w; w = MAX; }
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      res(canvas.toDataURL('image/jpeg', 0.65));
    };
    img.onerror = rej;
  };
  reader.onerror = rej;
});

// ── Traditional Chinese ───────────────────────────────────────────────────────
window.toTrad = (text, cb) => {
  if (!text) return;
  try {
    if (window.OpenCC) { cb(window.OpenCC.Converter({ from:'cn', to:'t' })(text)); }
  } catch(e) {}
};

// ── Toast helper ──────────────────────────────────────────────────────────────
window.showToast = (msg) => {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2400);
};

// ═══════════════════════════════════════════════════════════════════════════════
// RecipeCard
// ═══════════════════════════════════════════════════════════════════════════════
window.RecipeCard = function({ recipe, onClick, onToggleFav }) {
  const { Icons, catEmoji, diffClass } = window;
  const isFav = recipe.fav === true;
  return (
    <div className="recipe-card" onClick={onClick}>
      <div className="card-thumb">
        {recipe.image
          ? <><img src={recipe.image} alt={recipe.name}/><div className="card-overlay"/></>
          : <div className="card-thumb-empty">{catEmoji(recipe.category)}</div>
        }
        <span className="card-cat-badge">{catEmoji(recipe.category)} {recipe.category || '私房'}</span>
        <button className="card-fav-btn"
          onClick={e => { e.stopPropagation(); onToggleFav(recipe.id); }}
          title={isFav ? '取消收藏' : '加入收藏'}>
          {isFav ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="card-body">
        <div className="card-title">{recipe.name}</div>
        <div className="card-meta">
          <span className={`meta-tag ${diffClass(recipe.difficulty)}`}>
            {recipe.difficulty === '簡單' ? '🌱' : recipe.difficulty === '困難' ? '🔥' : '⚡'} {recipe.difficulty}
          </span>
          {recipe.cookingTime && (
            <span className="meta-tag meta-time"><Icons.Clock size={10}/> {recipe.cookingTime}</span>
          )}
          {recipe.rating > 0 && (
            <span className="meta-tag" style={{background:'#fff8e1',color:'#b8860b',borderColor:'#e0c97a'}}>
              {'★'.repeat(recipe.rating)}{'☆'.repeat(5 - recipe.rating)}
            </span>
          )}
        </div>
        <div className="card-footer">
          <span className="card-footer-stat">🥕 {recipe.ingredients?.length || 0} 種食材</span>
          <div style={{display:'flex',gap:'8px'}}>
            {recipe.steps?.length > 0 && (
              <span className="card-footer-stat">📋 {recipe.steps.length} 步驟</span>
            )}
            {recipe.notes?.length > 0 && (
              <span className="card-footer-stat">📝 {recipe.notes.length} 筆記</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// DetailView
// ═══════════════════════════════════════════════════════════════════════════════
window.DetailView = function({ recipe, onEdit, onDelete, onAddToCart, onAddToCalendar }) {
  const { Icons, catEmoji, diffClass } = window;
  const [rating, setRating] = React.useState(recipe.rating || 0);
  const [hoverStar, setHoverStar] = React.useState(0);

  const handleRating = async (r) => {
    setRating(r);
    try {
      const updated = { ...recipe, rating: r };
      await window.db_api.save(updated);
      window.showToast(`已評 ${r} 星 ✨`);
    } catch(e) {}
  };

  return (
    <div>
      {/* Hero */}
      {recipe.image ? (
        <div className="detail-hero">
          <img src={recipe.image} alt={recipe.name}/>
          <div className="detail-hero-overlay"/>
          <div className="detail-hero-title">{recipe.name}</div>
        </div>
      ) : (
        <div style={{textAlign:'center',fontSize:'3.5rem',padding:'24px 0',marginBottom:'12px'}}>
          {catEmoji(recipe.category)}
          <h2 style={{fontFamily:'Shippori Mincho, serif',fontSize:'1.4rem',fontWeight:800,marginTop:'8px',color:'var(--ink)'}}>{recipe.name}</h2>
        </div>
      )}

      {/* Meta */}
      <div style={{display:'flex',flexWrap:'wrap',gap:'8px',marginBottom:'20px'}}>
        <span className="meta-tag" style={{fontSize:'0.8rem',padding:'5px 12px',background:'var(--stone)',color:'var(--ink-soft)',borderColor:'var(--stone-mid)'}}>{catEmoji(recipe.category)} {recipe.category}</span>
        <span className={`meta-tag ${diffClass(recipe.difficulty)}`} style={{fontSize:'0.8rem',padding:'5px 12px'}}>{recipe.difficulty}</span>
        {recipe.cookingTime && <span className="meta-tag meta-time" style={{fontSize:'0.8rem',padding:'5px 12px'}}><Icons.Clock size={12}/> {recipe.cookingTime}</span>}
      </div>

      {/* Star rating */}
      <div style={{marginBottom:'20px',padding:'14px 16px',background:'var(--stone)',borderRadius:'var(--radius)',display:'flex',alignItems:'center',gap:'12px'}}>
        <span style={{fontSize:'0.8rem',fontWeight:700,color:'var(--ink-muted)'}}>評分</span>
        <div className="star-rating">
          {[1,2,3,4,5].map(i => (
            <span key={i} className="star"
              onMouseEnter={() => setHoverStar(i)}
              onMouseLeave={() => setHoverStar(0)}
              onClick={() => handleRating(i)}
              style={{color: i <= (hoverStar || rating) ? '#f59e0b' : '#d1d5db'}}>
              ★
            </span>
          ))}
        </div>
        {rating > 0 && <span style={{fontSize:'0.78rem',color:'var(--ink-muted)'}}>{rating}/5</span>}
      </div>

      {/* Ingredients */}
      <div style={{marginBottom:'20px'}}>
        <div className="section-tag"><Icons.Book size={12}/> 食材清單</div>
        <div className="ingredient-grid">
          {recipe.ingredients?.map((ing, i) => (
            <div key={i} className="ingredient-item">
              <div className="ingredient-dot"/>
              <span>{ing}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      {recipe.steps?.length > 0 && (
        <div style={{marginBottom:'20px'}}>
          <div className="section-tag"><Icons.Chef size={12}/> 烹飪步驟</div>
          <div className="steps-list">
            {recipe.steps.map((step, i) => (
              <div key={i} className="step-view-item">
                <div className="step-view-num">{i+1}</div>
                <div className="step-view-body">
                  <p className="step-view-text">{step.text}</p>
                  {step.image && <img src={step.image} alt={`步驟${i+1}`} style={{marginTop:'10px',borderRadius:'10px',border:'1px solid var(--stone-mid)',maxWidth:'100%',maxHeight:'200px',objectFit:'cover'}}/>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cooking Notes */}
      <CookingNotes recipe={recipe} />

      {/* Actions */}
      <div style={{display:'flex',gap:'8px',flexWrap:'wrap',paddingTop:'16px',borderTop:'1px solid var(--stone-mid)'}}>
        <a href={recipe.fbLink} target="_blank" rel="noreferrer"
           className="btn btn-moss" style={{flex:1,minWidth:'140px',textDecoration:'none'}}>
          <Icons.Link size={15}/> 觀看影片
        </a>
        <button className="btn btn-secondary" onClick={() => onAddToCart(recipe)} title="加入購物清單">
          <Icons.Cart size={15}/> 購物
        </button>
        <button className="btn btn-secondary" onClick={() => onAddToCalendar(recipe)} title="加入煮食計劃">
          <Icons.Cal size={15}/> 計劃
        </button>
        <button className="btn btn-icon-sq" onClick={() => onEdit(recipe)} title="編輯"><Icons.Edit size={15}/></button>
        <button className="btn btn-danger" onClick={() => onDelete(recipe.id)} title="刪除"><Icons.Trash size={15}/></button>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// RecipeForm
// ═══════════════════════════════════════════════════════════════════════════════
window.RecipeForm = function({ formData, setFormData, imagePreview, processingImage, isLoading, editMode,
                               handleImageUpload, addStep, removeStep, updateStepText, updateStepImage,
                               removeStepImage, saveRecipe }) {
  const { Icons, CATEGORIES, DIFFICULTIES, toTrad, compressImage } = window;
  const set = (k, v) => setFormData(p => ({ ...p, [k]: v }));

  return (
    <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>

      {/* Photo */}
      <div>
        <div className="form-label">料理照片</div>
        <label className="img-upload">
          <input type="file" accept="image/*" onChange={handleImageUpload} style={{display:'none'}}/>
          {imagePreview
            ? <><img src={imagePreview} alt="preview"/><div className="img-hover-overlay"><span>更換照片 📸</span></div></>
            : <div className="img-upload-hint">
                <Icons.Camera size={32}/>
                <p>{processingImage ? '壓縮中…' : '點擊上傳照片'}</p>
                <small>圖片會自動縮小</small>
              </div>
          }
        </label>
      </div>

      {/* Name */}
      <div className="form-group">
        <div className="form-label">
          <span>菜名 *</span>
          <button type="button" className="btn-convert" onClick={()=>toTrad(formData.name, v=>set('name',v))}>
            <Icons.Sparkle size={10}/> 簡 → 繁
          </button>
        </div>
        <input className="form-input" value={formData.name} placeholder="例如：番茄炒蛋" onChange={e=>set('name',e.target.value)}/>
      </div>

      {/* Link */}
      <div className="form-group">
        <div className="form-label">影片連結 *</div>
        <input className="form-input" value={formData.fbLink} placeholder="https://facebook.com/..." onChange={e=>set('fbLink',e.target.value)} style={{color:'var(--sky)'}}/>
      </div>

      {/* Category / Difficulty / Time */}
      <div className="form-row cols-3">
        <div className="form-group" style={{margin:0}}>
          <div className="form-label">類別</div>
          <select className="form-input" value={formData.category} onChange={e=>set('category',e.target.value)}>
            {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="form-group" style={{margin:0}}>
          <div className="form-label">難度</div>
          <select className="form-input" value={formData.difficulty} onChange={e=>set('difficulty',e.target.value)}>
            {DIFFICULTIES.map(d=><option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div className="form-group" style={{margin:0}}>
          <div className="form-label">烹飪時間</div>
          <input className="form-input" value={formData.cookingTime} placeholder="15分鐘" onChange={e=>set('cookingTime',e.target.value)}/>
        </div>
      </div>

      {/* Ingredients */}
      <div className="form-group">
        <div className="form-label">
          <span>食材清單 * <small style={{fontSize:'0.68rem',background:'#fffde7',color:'#b8860b',padding:'2px 6px',borderRadius:'4px',textTransform:'none',letterSpacing:0,fontWeight:600}}>每行一項</small></span>
          <button type="button" className="btn-convert" onClick={()=>toTrad(formData.ingredients, v=>set('ingredients',v))}>
            <Icons.Sparkle size={10}/> 簡 → 繁
          </button>
        </div>
        <textarea className="form-input lines-textarea" rows="7" value={formData.ingredients}
          placeholder={"拉麵 1份\n叉燒 2片\n溏心蛋 1隻\n蔥花 適量"} onChange={e=>set('ingredients',e.target.value)}/>
      </div>

      {/* Steps */}
      <div className="form-group">
        <div className="form-label">
          <span>烹飪步驟</span>
          <button type="button" className="btn btn-secondary" onClick={addStep} style={{padding:'4px 10px',fontSize:'0.75rem',display:'flex',alignItems:'center',gap:'4px'}}>
            <Icons.Plus size={12}/> 新增步驟
          </button>
        </div>
        {(!formData.steps || formData.steps.length === 0) ? (
          <button type="button" className="step-add-btn" onClick={addStep}>
            <Icons.Plus size={14}/> 點擊新增第一個步驟
          </button>
        ) : (
          <div className="step-list">
            {formData.steps.map((step, i) => (
              <div key={i} className="step-card">
                <div className="step-num">{i+1}</div>
                <div className="step-body">
                  <textarea className="form-input" rows="2" value={step.text}
                    placeholder="輸入步驟說明…" onChange={e=>updateStepText(i,e.target.value)}
                    style={{marginBottom:'8px'}}/>
                  {step.image
                    ? <div className="step-img-preview">
                        <img src={step.image} alt="step"/>
                        <button type="button" onClick={()=>removeStepImage(i)} style={{position:'absolute',top:'6px',right:'6px',background:'rgba(0,0,0,0.55)',color:'#fff',border:'none',borderRadius:'6px',padding:'3px 6px',cursor:'pointer',display:'flex',alignItems:'center'}}>
                          <Icons.X size={12}/>
                        </button>
                      </div>
                    : <label style={{display:'inline-flex',alignItems:'center',gap:'5px',fontSize:'0.76rem',fontWeight:600,color:'var(--ink-muted)',background:'var(--white)',border:'1px solid var(--stone-mid)',borderRadius:'6px',padding:'5px 10px',cursor:'pointer'}}>
                        <input type="file" accept="image/*" style={{display:'none'}} onChange={e=>updateStepImage(i,e)}/>
                        <Icons.Image size={12}/> 加入圖片
                      </label>
                  }
                </div>
                <button type="button" onClick={()=>removeStep(i)} className="btn-icon-sq" style={{background:'var(--red-light)',borderColor:'#f0c8c4',color:'var(--red)',flexShrink:0}}>
                  <Icons.Trash size={14}/>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Save */}
      <button type="button" className="btn btn-primary btn-full" onClick={saveRecipe} disabled={isLoading||processingImage}>
        {isLoading
          ? <><div style={{width:16,height:16,border:'2px solid rgba(255,255,255,0.3)',borderTopColor:'#fff',borderRadius:'50%'}} className="animate-spin"/><span>儲存中…</span></>
          : <><Icons.Book size={16}/><span>{editMode ? '更新食譜' : '放入手帳 🎉'}</span></>
        }
      </button>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// Dashboard
// ═══════════════════════════════════════════════════════════════════════════════
window.Dashboard = function({ recipes }) {
  const { Icons, CATEGORIES, catEmoji } = window;

  const total       = recipes.length;
  const favCount    = recipes.filter(r => r.fav).length;
  const avgRating   = total ? (recipes.reduce((s,r) => s+(r.rating||0), 0) / total).toFixed(1) : '—';
  const topCat      = (() => {
    const freq = {}; recipes.forEach(r => { freq[r.category] = (freq[r.category]||0)+1; });
    return Object.entries(freq).sort((a,b)=>b[1]-a[1])[0]?.[0] || '—';
  })();

  const catData = CATEGORIES.map(c => ({ name: c, count: recipes.filter(r=>r.category===c).length }))
    .filter(d=>d.count>0).sort((a,b)=>b.count-a.count);
  const maxCat = catData[0]?.count || 1;

  const diffData = ['簡單','中等','困難'].map(d => ({
    name: d, count: recipes.filter(r=>r.difficulty===d).length
  }));

  const recentRecipes = [...recipes].sort((a,b)=>b.timestamp-a.timestamp).slice(0,5);

  return (
    <div style={{padding:'28px 24px 60px',maxWidth:1140,margin:'0 auto'}}>
      <h2 style={{fontFamily:'Shippori Mincho, serif',fontSize:'1.3rem',fontWeight:700,marginBottom:'20px',color:'var(--ink)'}}>📊 食譜統計</h2>

      {/* Stats grid */}
      <div className="dashboard-grid">
        {[
          { icon:'📖', num:total,      label:'食譜總數',   color:'var(--ink)' },
          { icon:'❤️', num:favCount,   label:'收藏食譜',   color:'#e74c3c' },
          { icon:'⭐', num:avgRating,  label:'平均評分',   color:'#f59e0b' },
          { icon:'🏆', num:catEmoji(topCat), label:`最多：${topCat}`, color:'var(--moss)' },
        ].map((s,i)=>(
          <div key={i} className="stat-card">
            <span className="stat-icon">{s.icon}</span>
            <div className="stat-number" style={{color:s.color}}>{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'24px'}}>

        {/* Category chart */}
        <div className="chart-card">
          <div className="chart-title">📂 分類分佈</div>
          {catData.length === 0
            ? <p style={{color:'var(--ink-muted)',fontSize:'0.85rem'}}>暫無資料</p>
            : catData.slice(0,8).map(d=>(
              <div key={d.name} className="bar-chart-row">
                <span className="bar-chart-label">{catEmoji(d.name)} {d.name}</span>
                <div className="bar-chart-track"><div className="bar-chart-fill" style={{width:`${(d.count/maxCat)*100}%`}}/></div>
                <span className="bar-chart-val">{d.count}</span>
              </div>
            ))
          }
        </div>

        {/* Difficulty + Recent */}
        <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
          <div className="chart-card">
            <div className="chart-title">🔥 難度分佈</div>
            <div style={{display:'flex',gap:'8px'}}>
              {diffData.map(d=>(
                <div key={d.name} style={{flex:1,textAlign:'center',padding:'12px 8px',background:'var(--stone)',borderRadius:'var(--radius-sm)'}}>
                  <div style={{fontSize:'1.3rem',fontWeight:800,fontFamily:'Shippori Mincho, serif',color:'var(--ink)'}}>{d.count}</div>
                  <div style={{fontSize:'0.72rem',color:'var(--ink-muted)',fontWeight:600,marginTop:'3px'}}>{d.name}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="chart-card" style={{flex:1}}>
            <div className="chart-title">🕐 最近新增</div>
            {recentRecipes.map(r=>(
              <div key={r.id} style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'8px',fontSize:'0.82rem'}}>
                <span>{catEmoji(r.category)}</span>
                <span style={{flex:1,fontWeight:600,color:'var(--ink)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{r.name}</span>
                <span style={{color:'var(--ink-muted)',fontSize:'0.72rem',flexShrink:0}}>{r.rating ? '★'.repeat(r.rating) : '—'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// ShoppingList
// ═══════════════════════════════════════════════════════════════════════════════
window.ShoppingList = function({ cart, setCart }) {
  const { Icons } = window;
  const [checked, setChecked] = React.useState({});

  // Group by recipe
  const groups = cart.reduce((acc, item) => {
    if (!acc[item.recipeName]) acc[item.recipeName] = [];
    acc[item.recipeName].push(item.ingredient);
    return acc;
  }, {});

  const allItems = cart.map(item => `${item.ingredient}（${item.recipeName}）`).join('\n');

  const toggleCheck = (key) => setChecked(p => ({ ...p, [key]: !p[key] }));

  const copyAll = () => {
    navigator.clipboard?.writeText(allItems).then(()=>window.showToast('已複製到剪貼板 📋'));
  };

  if (cart.length === 0) return (
    <div style={{padding:'60px 24px',textAlign:'center',maxWidth:600,margin:'0 auto'}}>
      <span style={{fontSize:'3rem',display:'block',marginBottom:'16px',opacity:.4}}>🛒</span>
      <h3 style={{fontFamily:'Shippori Mincho, serif',fontSize:'1.2rem',fontWeight:700,color:'var(--ink)',marginBottom:'8px'}}>購物清單是空的</h3>
      <p style={{color:'var(--ink-muted)',fontSize:'0.88rem'}}>在食譜頁面點擊「購物」按鈕，食材會自動加入這裡</p>
    </div>
  );

  return (
    <div style={{padding:'28px 24px 60px',maxWidth:680,margin:'0 auto'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'20px'}}>
        <h2 style={{fontFamily:'Shippori Mincho, serif',fontSize:'1.3rem',fontWeight:700,color:'var(--ink)'}}>🛒 購物清單</h2>
        <div style={{display:'flex',gap:'8px'}}>
          <button className="btn btn-secondary" onClick={copyAll} style={{fontSize:'0.8rem',padding:'7px 12px'}}>
            <Icons.Copy size={13}/> 複製全部
          </button>
          <button className="btn btn-danger" onClick={()=>{setCart([]);setChecked({});}} style={{fontSize:'0.8rem',padding:'7px 12px'}}>
            <Icons.Trash size={13}/> 清空
          </button>
        </div>
      </div>

      <div style={{marginBottom:'12px',padding:'10px 14px',background:'var(--moss-light)',borderRadius:'var(--radius-sm)',fontSize:'0.8rem',color:'var(--moss)',fontWeight:600}}>
        共 {cart.length} 項食材 · {Object.keys(groups).length} 道食譜
      </div>

      {Object.entries(groups).map(([recipeName, ings]) => (
        <div key={recipeName} style={{marginBottom:'16px'}}>
          <div className="shop-section-head">{window.catEmoji('') } {recipeName}</div>
          {ings.map((ing, i) => {
            const key = `${recipeName}-${ing}-${i}`;
            return (
              <div key={key} className="shop-item">
                <input type="checkbox" checked={!!checked[key]} onChange={()=>toggleCheck(key)}/>
                <span className={`shop-item-label ${checked[key]?'checked':''}`}>{ing}</span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// CookingCalendar
// ═══════════════════════════════════════════════════════════════════════════════
window.CookingCalendar = function({ recipes, calPlan, setCalPlan }) {
  const { Icons } = window;
  const today = new Date();
  const [viewYear,  setViewYear]  = React.useState(today.getFullYear());
  const [viewMonth, setViewMonth] = React.useState(today.getMonth());
  const [pickDay,   setPickDay]   = React.useState(null); // {year,month,day}
  const [showPicker,setShowPicker]= React.useState(false);
  const [pickRecipe,setPickRecipe]= React.useState('');

  const daysInMonth = new Date(viewYear, viewMonth+1, 0).getDate();
  const firstDow    = new Date(viewYear, viewMonth, 1).getDay();
  const prevDays    = new Date(viewYear, viewMonth, 0).getDate();

  const monthNames  = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
  const dowNames    = ['日','一','二','三','四','五','六'];

  const makeKey = (y,m,d) => `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;

  const prevMonth = () => { if (viewMonth===0){setViewYear(y=>y-1);setViewMonth(11);}else setViewMonth(m=>m-1); };
  const nextMonth = () => { if (viewMonth===11){setViewYear(y=>y+1);setViewMonth(0);}else setViewMonth(m=>m+1); };

  const openPicker = (y,m,d) => { setPickDay({y,m,d}); setPickRecipe(''); setShowPicker(true); };

  const assignRecipe = () => {
    if (!pickRecipe || !pickDay) return;
    const key = makeKey(pickDay.y, pickDay.m, pickDay.d);
    const recipe = recipes.find(r=>r.id===pickRecipe);
    setCalPlan(p => ({ ...p, [key]: [...(p[key]||[]), { id:recipe.id, name:recipe.name }] }));
    setShowPicker(false);
    window.showToast(`已加入 ${recipe.name} 到 ${key} 🗓️`);
  };

  const removeFromDay = (key, idx) => {
    setCalPlan(p => {
      const updated = [...(p[key]||[])];
      updated.splice(idx, 1);
      return { ...p, [key]: updated };
    });
  };

  // Build cells
  const cells = [];
  for (let i = 0; i < firstDow; i++) cells.push({ day: prevDays - firstDow + i + 1, type:'prev' });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, type:'cur' });
  while (cells.length % 7 !== 0) cells.push({ day: cells.length - firstDow - daysInMonth + 1, type:'next' });

  return (
    <div style={{padding:'28px 24px 60px',maxWidth:900,margin:'0 auto'}}>
      <h2 style={{fontFamily:'Shippori Mincho, serif',fontSize:'1.3rem',fontWeight:700,marginBottom:'20px',color:'var(--ink)'}}>📅 煮食計劃日曆</h2>

      {/* Calendar header */}
      <div className="chart-card" style={{marginBottom:'16px'}}>
        <div className="cal-header">
          <button className="btn btn-secondary" onClick={prevMonth} style={{padding:'7px 12px'}}><Icons.ChevL size={15}/></button>
          <span className="cal-month">{viewYear} 年 {monthNames[viewMonth]}</span>
          <button className="btn btn-secondary" onClick={nextMonth} style={{padding:'7px 12px'}}><Icons.ChevR size={15}/></button>
        </div>

        {/* Day of week header */}
        <div className="cal-grid" style={{marginBottom:'4px'}}>
          {dowNames.map(d=><div key={d} className="cal-dow">{d}</div>)}
        </div>

        {/* Cells */}
        <div className="cal-grid">
          {cells.map((cell,i) => {
            const key   = cell.type==='cur' ? makeKey(viewYear,viewMonth,cell.day) : null;
            const plans = key ? (calPlan[key]||[]) : [];
            const isTod = cell.type==='cur' && viewYear===today.getFullYear() && viewMonth===today.getMonth() && cell.day===today.getDate();
            return (
              <div key={i}
                className={`cal-cell ${cell.type!=='cur'?'other-month':''} ${isTod?'today':''} ${plans.length>0?'has-plan':''}`}
                onClick={()=> cell.type==='cur' && openPicker(viewYear,viewMonth,cell.day)}>
                <span className="cal-date">{cell.day}</span>
                {plans.slice(0,2).map((p,pi)=>(
                  <span key={pi} className="cal-recipe-name">{p.name}</span>
                ))}
                {plans.length > 2 && <span style={{fontSize:'0.58rem',color:'var(--gold)'}}>+{plans.length-2}</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming plans */}
      {Object.keys(calPlan).length > 0 && (
        <div className="chart-card">
          <div className="chart-title">📋 已計劃食譜</div>
          {Object.entries(calPlan)
            .filter(([,v])=>v.length>0)
            .sort(([a],[b])=>a.localeCompare(b))
            .slice(0,10)
            .map(([date, plans])=>(
              <div key={date} style={{display:'flex',alignItems:'flex-start',gap:'12px',marginBottom:'10px',paddingBottom:'10px',borderBottom:'1px solid var(--stone)'}}>
                <span style={{fontSize:'0.8rem',fontWeight:700,color:'var(--ink-muted)',minWidth:'88px',paddingTop:'2px'}}>{date}</span>
                <div style={{flex:1,display:'flex',flexWrap:'wrap',gap:'6px'}}>
                  {plans.map((p,pi)=>(
                    <span key={pi} style={{display:'inline-flex',alignItems:'center',gap:'5px',background:'var(--gold-light)',color:'var(--gold)',border:'1px solid #e0c97a',borderRadius:'99px',padding:'3px 10px',fontSize:'0.78rem',fontWeight:600}}>
                      {p.name}
                      <button onClick={()=>removeFromDay(date,pi)} style={{background:'none',border:'none',cursor:'pointer',color:'#b8860b',padding:'0',lineHeight:1,fontSize:'0.9rem'}}>×</button>
                    </span>
                  ))}
                </div>
              </div>
            ))
          }
        </div>
      )}

      {/* Pick modal */}
      {showPicker && pickDay && (
        <div className="modal-mask" onClick={()=>setShowPicker(false)}>
          <div className="modal-panel" style={{maxWidth:400}} onClick={e=>e.stopPropagation()}>
            <div className="modal-head">
              <span className="modal-title">🗓 {pickDay.y}-{String(pickDay.m+1).padStart(2,'0')}-{String(pickDay.d).padStart(2,'0')}</span>
              <button className="btn-close" onClick={()=>setShowPicker(false)}><Icons.X size={15}/></button>
            </div>
            <div className="modal-body">
              {(calPlan[makeKey(pickDay.y,pickDay.m,pickDay.d)]||[]).length > 0 && (
                <div style={{marginBottom:'14px'}}>
                  <div style={{fontSize:'0.78rem',fontWeight:700,color:'var(--ink-muted)',marginBottom:'8px',textTransform:'uppercase',letterSpacing:'0.08em'}}>已計劃</div>
                  {(calPlan[makeKey(pickDay.y,pickDay.m,pickDay.d)]||[]).map((p,pi)=>(
                    <div key={pi} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'7px 10px',background:'var(--stone)',borderRadius:'var(--radius-sm)',marginBottom:'5px'}}>
                      <span style={{fontSize:'0.85rem',fontWeight:600}}>{p.name}</span>
                      <button onClick={()=>removeFromDay(makeKey(pickDay.y,pickDay.m,pickDay.d),pi)} style={{background:'none',border:'none',cursor:'pointer',color:'var(--red)',fontSize:'1rem'}}>×</button>
                    </div>
                  ))}
                </div>
              )}
              <div style={{marginBottom:'14px'}}>
                <div className="form-label" style={{marginBottom:'8px'}}>加入食譜</div>
                <select className="form-input" value={pickRecipe} onChange={e=>setPickRecipe(e.target.value)}>
                  <option value="">— 選擇食譜 —</option>
                  {recipes.map(r=><option key={r.id} value={r.id}>{r.name}</option>)}
                </select>
              </div>
              <button className="btn btn-moss btn-full" onClick={assignRecipe} disabled={!pickRecipe}>
                <Icons.Plus size={15}/> 加入計劃
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// CookingNotes  —  烹飪筆記（嵌入 DetailView 內）
// 筆記儲存在 recipe.notes[] 陣列，每筆記包含 { id, text, date }
// ═══════════════════════════════════════════════════════════════════════════════
function CookingNotes({ recipe }) {
  const { Icons } = window;
  const [notes,    setNotes]    = React.useState(recipe.notes || []);
  const [draft,    setDraft]    = React.useState('');
  const [saving,   setSaving]   = React.useState(false);
  const [editId,   setEditId]   = React.useState(null);
  const [editText, setEditText] = React.useState('');
  const taRef = React.useRef(null);

  const saveNotes = async (updated) => {
    setSaving(true);
    try {
      await window.db_api.save({ ...recipe, notes: updated });
      setNotes(updated);
    } catch { window.showToast('筆記儲存失敗 😢'); }
    setSaving(false);
  };

  const addNote = async () => {
    if (!draft.trim()) return;
    const newNote = { id: Date.now().toString(), text: draft.trim(), date: new Date().toLocaleDateString('zh-HK') };
    await saveNotes([newNote, ...notes]);
    setDraft('');
    window.showToast('筆記已儲存 📝');
  };

  const deleteNote = async (id) => {
    await saveNotes(notes.filter(n => n.id !== id));
    window.showToast('筆記已刪除');
  };

  const startEdit = (note) => { setEditId(note.id); setEditText(note.text); };
  const saveEdit  = async () => {
    if (!editText.trim()) return;
    await saveNotes(notes.map(n => n.id === editId ? { ...n, text: editText.trim() } : n));
    setEditId(null); setEditText('');
    window.showToast('筆記已更新 ✓');
  };

  return (
    <div style={{marginBottom:'20px'}}>
      <div className="section-tag"><Icons.Notes size={12}/> 烹飪筆記</div>

      {/* Input area */}
      <div style={{background:'var(--stone)',borderRadius:'var(--radius)',padding:'14px',marginBottom:'12px',border:'1px solid var(--stone-mid)'}}>
        <textarea
          ref={taRef}
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) addNote(); }}
          placeholder="記錄今次烹飪的心得… (Cmd/Ctrl+Enter 儲存)"
          rows={3}
          className="form-input"
          style={{marginBottom:'10px',background:'var(--white)',fontSize:'0.88rem',resize:'none'}}
        />
        <div style={{display:'flex',justifyContent:'flex-end'}}>
          <button
            className="btn btn-primary"
            onClick={addNote}
            disabled={saving || !draft.trim()}
            style={{padding:'8px 18px',fontSize:'0.82rem',display:'flex',alignItems:'center',gap:'6px'}}>
            {saving
              ? <><div style={{width:13,height:13,border:'2px solid rgba(255,255,255,0.3)',borderTopColor:'#fff',borderRadius:'50%'}} className="animate-spin"/><span>儲存中</span></>
              : <><Icons.Notes size={13}/><span>記低心得</span></>
            }
          </button>
        </div>
      </div>

      {/* Notes list */}
      {notes.length === 0
        ? <p style={{fontSize:'0.82rem',color:'var(--ink-muted)',textAlign:'center',padding:'12px 0'}}>未有筆記，記錄你第一個心得吧！</p>
        : <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
            {notes.map(note => (
              <div key={note.id} style={{background:'var(--white)',borderRadius:'var(--radius)',border:'1px solid var(--stone-mid)',padding:'12px 14px',position:'relative'}}>
                {editId === note.id
                  ? <div>
                      <textarea
                        className="form-input"
                        value={editText}
                        onChange={e=>setEditText(e.target.value)}
                        rows={3}
                        style={{marginBottom:'8px',fontSize:'0.88rem',resize:'none'}}
                        autoFocus
                      />
                      <div style={{display:'flex',gap:'6px',justifyContent:'flex-end'}}>
                        <button className="btn btn-secondary" onClick={()=>setEditId(null)} style={{padding:'5px 12px',fontSize:'0.78rem'}}>取消</button>
                        <button className="btn btn-primary"   onClick={saveEdit}           style={{padding:'5px 12px',fontSize:'0.78rem'}}>儲存</button>
                      </div>
                    </div>
                  : <>
                      <p style={{fontSize:'0.88rem',color:'var(--ink-soft)',lineHeight:1.7,whiteSpace:'pre-wrap',marginBottom:'8px'}}>{note.text}</p>
                      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <span style={{fontSize:'0.7rem',color:'var(--ink-muted)',fontWeight:500}}>📅 {note.date}</span>
                        <div style={{display:'flex',gap:'4px'}}>
                          <button className="btn-icon-sq" style={{width:28,height:28,borderRadius:6}} onClick={()=>startEdit(note)}><Icons.Edit size={12}/></button>
                          <button className="btn-icon-sq" style={{width:28,height:28,borderRadius:6,background:'var(--red-light)',borderColor:'#f0c8c4',color:'var(--red)'}} onClick={()=>deleteNote(note.id)}><Icons.Trash size={12}/></button>
                        </div>
                      </div>
                    </>
                }
              </div>
            ))}
          </div>
      }
    </div>
  );
}
