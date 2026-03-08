/* ============================================================
   小廚料理手帳 — app.js
   主要 React App + 狀態管理
   ============================================================ */

const { useState, useEffect, useCallback } = React;

// ── Empty form factory ────────────────────────────────────────────────────────
const emptyForm = () => ({
  name: '', fbLink: '', ingredients: '',
  category: window.CATEGORIES[0],
  cookingTime: '', difficulty: '中等',
  image: null, steps: [], rating: 0, fav: false
});

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════════
function App() {
  // ── Global state ───────────────────────────────────────────────────────────
  const [recipes,        setRecipes]        = useState([]);
  const [isLoading,      setIsLoading]      = useState(false);
  const [activeTab,      setActiveTab]      = useState('home');      // home | dashboard | shopping | calendar
  const [activeCategory, setActiveCategory] = useState('全部');
  const [searchQuery,    setSearchQuery]    = useState('');

  // Modal states
  const [showForm,         setShowForm]         = useState(false);
  const [selectedRecipe,   setSelectedRecipe]   = useState(null);
  const [editMode,         setEditMode]         = useState(false);
  const [imagePreview,     setImagePreview]     = useState(null);
  const [processingImage,  setProcessingImage]  = useState(false);
  const [formData,         setFormData]         = useState(emptyForm());

  // Feature states
  const [cart,    setCart]    = useState(() => {
    try { return JSON.parse(localStorage.getItem('recipe_cart') || '[]'); } catch { return []; }
  });
  const [calPlan, setCalPlan] = useState(() => {
    try { return JSON.parse(localStorage.getItem('recipe_cal') || '{}'); } catch { return {}; }
  });

  // ── Persist cart & calendar locally ────────────────────────────────────────
  useEffect(() => { localStorage.setItem('recipe_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('recipe_cal',  JSON.stringify(calPlan)); }, [calPlan]);

  // ── Load recipes ────────────────────────────────────────────────────────────
  const loadRecipes = useCallback(async () => {
    setIsLoading(true);
    try {
      if (window.db_api) {
        const data = await window.db_api.list();
        setRecipes(data.sort((a, b) => b.timestamp - a.timestamp));
      }
    } catch (e) { console.error('Load error:', e); }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadRecipes();
    window.addEventListener('firebase-ready', loadRecipes);
    return () => window.removeEventListener('firebase-ready', loadRecipes);
  }, [loadRecipes]);

  // ── Image handlers ──────────────────────────────────────────────────────────
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    setProcessingImage(true);
    try {
      const compressed = await window.compressImage(file);
      setImagePreview(compressed);
      setFormData(p => ({ ...p, image: compressed }));
    } catch { alert('圖片處理失敗'); }
    setProcessingImage(false);
  };

  // ── Step handlers ───────────────────────────────────────────────────────────
  const addStep         = () => setFormData(p => ({ ...p, steps: [...(p.steps||[]), { text:'', image:null }] }));
  const removeStep      = (i) => setFormData(p => ({ ...p, steps: p.steps.filter((_,idx)=>idx!==i) }));
  const updateStepText  = (i, text) => setFormData(p => { const s=[...p.steps]; s[i]={...s[i],text}; return {...p,steps:s}; });
  const removeStepImage = (i) => setFormData(p => { const s=[...p.steps]; s[i]={...s[i],image:null}; return {...p,steps:s}; });
  const updateStepImage = async (i, e) => {
    const file = e.target.files[0]; if (!file) return;
    try {
      const c = await window.compressImage(file);
      setFormData(p => { const s=[...p.steps]; s[i]={...s[i],image:c}; return {...p,steps:s}; });
    } catch { alert('步驟圖片失敗'); }
  };

  // ── Save recipe ─────────────────────────────────────────────────────────────
  const saveRecipe = async () => {
    if (!formData.name || !formData.fbLink || !formData.ingredients) {
      alert('請填寫菜名、連結和食材！'); return;
    }
    setIsLoading(true);
    const ings = Array.isArray(formData.ingredients)
      ? formData.ingredients
      : formData.ingredients.split('\n').filter(i => i.trim());

    const recipe = {
      id:        editMode ? selectedRecipe.id : Date.now().toString(),
      ...formData,
      ingredients: ings,
      steps:       formData.steps || [],
      timestamp:   editMode ? selectedRecipe.timestamp : Date.now()
    };
    try {
      await window.db_api.save(recipe);
      await loadRecipes();
      resetForm();
      window.showToast(editMode ? '食譜已更新 ✓' : '食譜已放入手帳 🎉');
    } catch { alert('儲存失敗！'); }
    setIsLoading(false);
  };

  // ── Delete recipe ───────────────────────────────────────────────────────────
  const deleteRecipe = async (id) => {
    if (!confirm('確定要刪除這個食譜？')) return;
    setIsLoading(true);
    try {
      await window.db_api.delete(id);
      await loadRecipes();
      setSelectedRecipe(null);
      window.showToast('食譜已刪除');
    } catch { alert('刪除失敗'); }
    setIsLoading(false);
  };

  // ── Toggle favourite ────────────────────────────────────────────────────────
  const toggleFav = async (id) => {
    const recipe = recipes.find(r => r.id === id); if (!recipe) return;
    const updated = { ...recipe, fav: !recipe.fav };
    try {
      await window.db_api.save(updated);
      await loadRecipes();
      window.showToast(updated.fav ? '已加入收藏 ❤️' : '已取消收藏');
    } catch {}
  };

  // ── Reset form ──────────────────────────────────────────────────────────────
  const resetForm = () => {
    setFormData(emptyForm()); setImagePreview(null);
    setShowForm(false); setEditMode(false);
  };

  // ── Open edit modal ─────────────────────────────────────────────────────────
  const openEditModal = (recipe) => {
    setFormData({
      name:        recipe.name,
      fbLink:      recipe.fbLink,
      ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients.join('\n') : recipe.ingredients,
      category:    recipe.category    || window.CATEGORIES[0],
      cookingTime: recipe.cookingTime || '',
      difficulty:  recipe.difficulty  || '中等',
      image:       recipe.image       || null,
      steps:       recipe.steps       || [],
      rating:      recipe.rating      || 0,
      fav:         recipe.fav         || false,
    });
    setImagePreview(recipe.image || null);
    setEditMode(true); setSelectedRecipe(recipe); setShowForm(true);
  };

  // ── Add to cart ─────────────────────────────────────────────────────────────
  const addToCart = (recipe) => {
    const newItems = (recipe.ingredients || []).map(ing => ({
      ingredient: ing,
      recipeName: recipe.name,
      recipeId:   recipe.id
    }));
    setCart(p => {
      // Remove existing items from this recipe first
      const filtered = p.filter(i => i.recipeId !== recipe.id);
      return [...filtered, ...newItems];
    });
    setActiveTab('shopping');
    window.showToast(`${recipe.ingredients?.length||0} 項食材已加入購物清單 🛒`);
  };

  // ── Add to calendar ─────────────────────────────────────────────────────────
  const addToCalendar = (recipe) => {
    setSelectedRecipe(null);
    setActiveTab('calendar');
    window.showToast('請在日曆選擇日期加入計劃 📅');
  };

  // ── Filter ──────────────────────────────────────────────────────────────────
  const filtered = recipes.filter(r => {
    const matchCat    = activeCategory === '全部' || r.category === activeCategory;
    const q           = searchQuery.toLowerCase();
    const matchSearch = !q ||
      r.name.toLowerCase().includes(q) ||
      (r.ingredients || []).some(i => i.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  // ── Icons (shorthand) ───────────────────────────────────────────────────────
  const I = window.Icons;

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="app-wrapper">
      {isLoading && <div className="top-bar"/>}

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <header className="site-header">
        <div className="header-inner">
          {/* Brand */}
          <div className="header-brand">
            <div className="brand-mark">🍳</div>
            <div>
              <div className="brand-name">小廚料理手帳</div>
              <div className="brand-sub">記錄每一道美味</div>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="nav-tabs">
            {[
              { id:'home',      label:'食譜本',   icon:<I.Home  size={14}/> },
              { id:'dashboard', label:'統計',     icon:<I.Chart size={14}/> },
              { id:'shopping',  label:'購物清單', icon:<I.Cart  size={14}/>, badge: cart.length||null },
              { id:'calendar',  label:'煮食計劃', icon:<I.Cal   size={14}/> },
            ].map(t=>(
              <button key={t.id} className={`nav-tab ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)}>
                {t.icon} {t.label}
                {t.badge ? <span style={{background:'#e74c3c',color:'#fff',fontSize:'0.65rem',borderRadius:'99px',padding:'1px 6px',fontWeight:700,lineHeight:1.4}}>{t.badge}</span> : null}
              </button>
            ))}
          </nav>

          {/* Add button */}
          <button className="btn-add" onClick={()=>{ resetForm(); setShowForm(true); }}>
            <I.Plus size={15}/> <span>新增食譜</span>
          </button>
        </div>
      </header>

      {/* ── Filter bar (home only) ─────────────────────────────────────────── */}
      {activeTab === 'home' && (
        <div className="filter-bar">
          <div className="filter-bar-inner">
            <div className="search-wrap">
              <span className="search-icon"><I.Search size={14}/></span>
              <input placeholder="搜尋食譜或食材…" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}/>
            </div>
            <div className="cats-scroll">
              <button className={`cat-chip ${activeCategory==='全部'?'active':''}`} onClick={()=>setActiveCategory('全部')}>全部 ({recipes.length})</button>
              {window.CATEGORIES.map(c => {
                const count = recipes.filter(r=>r.category===c).length;
                return count > 0 ? (
                  <button key={c} className={`cat-chip ${activeCategory===c?'active':''}`} onClick={()=>setActiveCategory(c)}>
                    {window.catEmoji(c)} {c} ({count})
                  </button>
                ) : null;
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Main content ──────────────────────────────────────────────────── */}
      {activeTab === 'home' && (
        recipes.length === 0
          ? <div className="recipes-grid">
              <div className="empty-state">
                <span className="empty-icon">{isLoading ? '⏳' : '📖'}</span>
                <div className="empty-title">{isLoading ? '載入中…' : '手帳還是空的'}</div>
                <div className="empty-sub">{isLoading ? '正在從雲端讀取食譜' : '快來記錄你的第一道私房菜！'}</div>
                {!isLoading && (
                  <button className="btn btn-primary" onClick={()=>{ resetForm(); setShowForm(true); }} style={{margin:'0 auto',display:'inline-flex',alignItems:'center',gap:'7px'}}>
                    <I.Plus size={15}/> 新增第一道菜
                  </button>
                )}
              </div>
            </div>
          : filtered.length === 0
            ? <div className="recipes-grid">
                <div className="empty-state">
                  <span className="empty-icon">🔍</span>
                  <div className="empty-title">找不到相關食譜</div>
                  <div className="empty-sub">試試其他關鍵字或分類</div>
                  <button onClick={()=>{ setActiveCategory('全部'); setSearchQuery(''); }} style={{color:'var(--moss)',background:'none',border:'none',cursor:'pointer',fontWeight:600,textDecoration:'underline',fontSize:'0.88rem'}}>清除篩選</button>
                </div>
              </div>
            : <div className="recipes-grid">
                {filtered.map(recipe => (
                  <window.RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onClick={() => setSelectedRecipe(recipe)}
                    onToggleFav={toggleFav}
                  />
                ))}
              </div>
      )}

      {activeTab === 'dashboard' && <window.Dashboard recipes={recipes}/>}
      {activeTab === 'shopping'  && <window.ShoppingList cart={cart} setCart={setCart}/>}
      {activeTab === 'calendar'  && <window.CookingCalendar recipes={recipes} calPlan={calPlan} setCalPlan={setCalPlan}/>}

      {/* ── Detail modal ──────────────────────────────────────────────────── */}
      {selectedRecipe && !showForm && (
        <div className="modal-mask" onClick={()=>setSelectedRecipe(null)}>
          <div className="modal-panel" onClick={e=>e.stopPropagation()}>
            <div className="modal-head">
              <span className="modal-title">{window.catEmoji(selectedRecipe.category)} {selectedRecipe.name}</span>
              <button className="btn-close" onClick={()=>setSelectedRecipe(null)}><I.X size={15}/></button>
            </div>
            <div className="modal-body">
              <window.DetailView
                recipe={selectedRecipe}
                onEdit={openEditModal}
                onDelete={deleteRecipe}
                onAddToCart={addToCart}
                onAddToCalendar={addToCalendar}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── Add / Edit modal ──────────────────────────────────────────────── */}
      {showForm && (
        <div className="modal-mask" onClick={resetForm}>
          <div className="modal-panel" onClick={e=>e.stopPropagation()}>
            <div className="modal-head">
              <span className="modal-title">{editMode ? '✏️ 修改食譜' : '📖 記錄新食譜'}</span>
              <button className="btn-close" onClick={resetForm}><I.X size={15}/></button>
            </div>
            <div className="modal-body">
              <window.RecipeForm
                formData={formData}         setFormData={setFormData}
                imagePreview={imagePreview} processingImage={processingImage}
                isLoading={isLoading}       editMode={editMode}
                handleImageUpload={handleImageUpload}
                addStep={addStep}           removeStep={removeStep}
                updateStepText={updateStepText}
                updateStepImage={updateStepImage}
                removeStepImage={removeStepImage}
                saveRecipe={saveRecipe}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile bottom nav ─────────────────────────────────────────────── */}
      <nav className="mobile-nav">
        <div className="mobile-nav-inner">
          {[
            { id:'home',      label:'食譜本', icon:<I.Home  size={20}/> },
            { id:'dashboard', label:'統計',   icon:<I.Chart size={20}/> },
            { id:'shopping',  label:'購物',   icon:<I.Cart  size={20}/> },
            { id:'calendar',  label:'計劃',   icon:<I.Cal   size={20}/> },
          ].map(t=>(
            <button key={t.id} className={`mobile-nav-btn ${activeTab===t.id?'active':''}`} onClick={()=>setActiveTab(t.id)}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ── Toast ─────────────────────────────────────────────────────────── */}
      <div id="toast" className="toast"/>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
