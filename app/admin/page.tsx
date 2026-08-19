"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Montserrat, Poppins } from 'next/font/google';

// 1. Professional E-commerce Fonts
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

// Connect to Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AdminPortal() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Admin Dashboard States
  const [activeTab, setActiveTab] = useState("upload"); // upload, manage, import, testimonials
  const [allProducts, setAllProducts] = useState<any[]>([]);

  // Profile Form States
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");

  // Product Form States (Used for both Upload and Edit)
  const [editingId, setEditingId] = useState<string | null>(null);
  const [cakeName, setCakeName] = useState("");
  const [cakeDesc, setCakeDesc] = useState("");
  const [cakeCategory, setCakeCategory] = useState("Birthday Cakes");
  const [isEggless, setIsEggless] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // NEW: Multiple Images State replacing single cakeImage
  const [cakeImages, setCakeImages] = useState<{ file?: File; url: string }[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState<number>(0);

  // Dynamic Multi-Weight & Pricing State
  const [pricingOptions, setPricingOptions] = useState<any[]>([{ weight: "1 KG", price: "" }]);

  // Testimonial States
  const [testAuthor, setTestAuthor] = useState("");
  const [testText, setTestText] = useState("");
  const [testRating, setTestRating] = useState("5");

  useEffect(() => {
    checkSession();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchProfile(session.user);
      } else {
        setUser(null);
        setProfile(null);
        setLoading(false);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  // Fetch products automatically when switching to the 'manage' or 'import' tab
  useEffect(() => {
    if (activeTab === "manage" || activeTab === "import") {
      fetchProducts();
    }
  }, [activeTab]);

  async function checkSession() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) fetchProfile(user);
    else setLoading(false);
  }

  async function fetchProfile(currentUser: any) {
    setUser(currentUser);
    const { data } = await supabase.from("profiles").select("*").eq("email", currentUser.email).single();
    if (data) setProfile(data);
    setLoading(false);
  }

  async function fetchProducts() {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (data) setAllProducts(data);
  }

  async function loginWithGoogle() {
    await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${window.location.origin}/admin` } });
  }

  async function saveProfile() {
    if (!fullName || !mobile) return alert("Please fill in both fields.");
    const { error } = await supabase.from("profiles").insert([{ email: user.email, full_name: fullName, mobile_number: mobile, is_admin: false }]);
    if (error) alert("Error: " + error.message);
    else fetchProfile(user);
  }

  async function logout() {
    await supabase.auth.signOut();
  }

  // --- 1. DYNAMIC PRICING HANDLERS ---
  const handleAddPricingRow = () => {
    setPricingOptions([...pricingOptions, { weight: "1.5 KG", price: "" }]);
  };

  const handleRemovePricingRow = (index: number) => {
    const newOptions = [...pricingOptions];
    newOptions.splice(index, 1);
    setPricingOptions(newOptions);
  };

  const handlePricingChange = (index: number, field: string, value: string) => {
    const newOptions = [...pricingOptions];
    newOptions[index][field] = value;
    setPricingOptions(newOptions);
  };

  // --- 2. MULTIPLE IMAGES HANDLERS ---
  const handleImageUploadSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newImages = files.map(file => ({
        file,
        url: URL.createObjectURL(file)
      }));
      setCakeImages(prev => [...prev, ...newImages]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...cakeImages];
    updatedImages.splice(index, 1);
    setCakeImages(updatedImages);
    
    // Adjust main index if the removed image was the main one or before it
    if (mainImageIndex === index) {
      setMainImageIndex(0);
    } else if (mainImageIndex > index) {
      setMainImageIndex(mainImageIndex - 1);
    }
  };

  // --- 3. HANDLE UPLOAD & EDIT ---
  async function handleAddOrUpdateProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!cakeName) return alert("Please fill in the cake name.");
    if (cakeImages.length === 0) return alert("At least one image is required.");
    
    // Validate Pricing
    const validPricing = pricingOptions.filter(p => p.weight && p.price && Number(p.price) > 0);
    if (validPricing.length === 0) return alert("Please add at least one valid weight and price combination.");

    setIsUploading(true);

    try {
      let finalGalleryUrls: string[] = [];

      // Loop through and upload only newly added images
      for (let i = 0; i < cakeImages.length; i++) {
        const img = cakeImages[i];
        if (img.file) {
          const fileExt = img.file.name.split('.').pop();
          const fileName = `${Date.now()}_${i}.${fileExt}`;
          const { error: uploadError } = await supabase.storage.from('cake_images').upload(fileName, img.file);
          if (uploadError) throw uploadError;
          const { data } = supabase.storage.from('cake_images').getPublicUrl(fileName);
          finalGalleryUrls.push(data.publicUrl);
        } else {
          // If it doesn't have a file, it's an existing image url from edit mode
          finalGalleryUrls.push(img.url);
        }
      }

      // Automatically determine the lowest price to save to the legacy "price" column
      const startingPrice = Math.min(...validPricing.map(p => Number(p.price)));
      
      // Determine the main image url (fallback to the first image safely)
      const mainImageUrl = finalGalleryUrls.length > 0 ? (finalGalleryUrls[mainImageIndex] || finalGalleryUrls[0]) : null;

      const payload: any = {
        name: cakeName,
        description: cakeDesc,
        price: startingPrice, 
        pricing: validPricing, 
        category: cakeCategory,
        is_eggless: isEggless,
        gallery_images: finalGalleryUrls // NEW JSON array
      };

      // Safely update the legacy main image column
      if (mainImageUrl) payload.image_url = mainImageUrl; 

      if (editingId) {
        const { error: dbError } = await supabase.from('products').update(payload).eq('id', editingId);
        if (dbError) throw dbError;
        alert("Cake updated successfully!");
      } else {
        const { error: dbError } = await supabase.from('products').insert([payload]);
        if (dbError) throw dbError;
        alert("New cake published successfully!");
      }
      
      // Reset form
      setEditingId(null);
      setCakeName("");
      setCakeDesc("");
      setPricingOptions([{ weight: "1 KG", price: "" }]);
      setCakeImages([]);
      setMainImageIndex(0);
      setCakeCategory("Birthday Cakes");
      setIsEggless(false);
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setIsUploading(false);
    }
  }

  // Put form into Edit Mode
  function startEditing(cake: any) {
    setEditingId(cake.id);
    setCakeName(cake.name);
    setCakeDesc(cake.description || "");
    setCakeCategory(cake.category || "Birthday Cakes");
    setIsEggless(cake.is_eggless || false);
    
    if (cake.pricing && Array.isArray(cake.pricing) && cake.pricing.length > 0) {
      setPricingOptions(cake.pricing);
    } else {
      setPricingOptions([{ weight: "1.0 KG", price: cake.price?.toString() || "" }]);
    }

    // Safely populate the multiple images state
    let existingImages: {url: string}[] = [];
    if (cake.gallery_images && Array.isArray(cake.gallery_images) && cake.gallery_images.length > 0) {
      existingImages = cake.gallery_images.map((url: string) => ({ url }));
    } else if (cake.image_url) {
      existingImages = [{ url: cake.image_url }];
    }
    setCakeImages(existingImages);

    // Set correct main image radio button
    const mainIndex = existingImages.findIndex((img) => img.url === cake.image_url);
    setMainImageIndex(mainIndex !== -1 ? mainIndex : 0);

    setActiveTab("upload");
    window.scrollTo(0, 0);
  }

  async function deleteProduct(id: string) {
    if (!window.confirm("Are you sure you want to delete this cake?")) return;
    await supabase.from('products').delete().eq('id', id);
    fetchProducts();
  }

  // --- 4. HANDLE IMPORT / EXPORT (EXCEL/CSV) ---
  function exportToCSV() {
    if (allProducts.length === 0) return alert("No products to export.");
    const header = ["name", "description", "price", "category", "is_eggless"];
    const rows = allProducts.map(p => `"${p.name || ''}","${p.description || ''}",${p.price},"${p.category || ''}",${p.is_eggless ? 'TRUE' : 'FALSE'}`);
    const csvContent = [header.join(","), ...rows].join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CakeByRupali_Catalog_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  }

  async function handleImportCSV(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target?.result as string;
      const rows = text.split('\n').slice(1); 
      const productsToInsert = [];
      
      for (const row of rows) {
        if (!row.trim()) continue;
        const cols = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
        if (cols && cols.length >= 5) {
          const parsedPrice = parseFloat(cols[2]) || 0;
          productsToInsert.push({
            name: cols[0].replace(/"/g, ''),
            description: cols[1].replace(/"/g, ''),
            price: parsedPrice,
            pricing: [{ weight: "1.0 KG", price: parsedPrice }], 
            category: cols[3].replace(/"/g, ''),
            is_eggless: cols[4].toLowerCase().includes('true'),
            gallery_images: [] 
          });
        }
      }
      
      if (productsToInsert.length > 0) {
        setIsUploading(true);
        const { error } = await supabase.from('products').insert(productsToInsert);
        setIsUploading(false);
        if (error) alert("Error importing database: " + error.message);
        else {
          alert(`Successfully imported ${productsToInsert.length} products!`);
          fetchProducts();
        }
      }
    };
    reader.readAsText(file);
  }

  // --- 5. HANDLE TESTIMONIALS ---
  async function handleAddTestimonial(e: React.FormEvent) {
    e.preventDefault();
    setIsUploading(true);
    const { error } = await supabase.from('testimonials').insert([{
      author: testAuthor,
      text: testText,
      rating: parseInt(testRating)
    }]);
    setIsUploading(false);

    if (error) {
      alert("Error adding testimonial. Make sure you created the 'testimonials' table in Supabase! Details: " + error.message);
    } else {
      alert("Testimonial published!");
      setTestAuthor("");
      setTestText("");
      setTestRating("5");
    }
  }

  // ==========================================
  // RENDER HELPERS
  // ==========================================
  
  function renderContent() {
    if (loading) return <div className={`py-32 flex justify-center tracking-widest text-sm uppercase text-stone-500 font-bold ${montserrat.className}`}>Verifying Credentials...</div>;

    if (!user) {
      return (
        <div className="flex flex-col items-center justify-center py-32 px-6">
          <h1 className={`${montserrat.className} text-3xl font-bold mb-8 text-stone-900 uppercase tracking-widest`}>Admin Portal</h1>
          <button onClick={loginWithGoogle} className={`${montserrat.className} bg-stone-900 text-white px-10 py-4 rounded-sm font-bold tracking-widest uppercase hover:bg-[#e70064] transition-colors shadow-md`}>
            Secure Google Sign-In
          </button>
        </div>
      );
    }

    if (!profile) {
      return (
        <div className="flex flex-col items-center justify-center py-20 px-6">
          <div className="bg-white p-10 rounded-sm shadow-md border border-stone-200 max-w-md w-full">
            <h2 className={`${montserrat.className} text-xl font-bold mb-6 text-stone-900 uppercase tracking-widest text-center`}>Complete Setup</h2>
            <div className="space-y-6">
              <input type="text" className="w-full border-b border-stone-300 py-3 focus:outline-none focus:border-[#e70064] text-sm bg-transparent" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Full Name" />
              <input type="text" className="w-full border-b border-stone-300 py-3 focus:outline-none focus:border-[#e70064] text-sm bg-transparent" value={mobile} onChange={e => setMobile(e.target.value)} placeholder="Mobile Number" />
              <button onClick={saveProfile} className={`${montserrat.className} w-full bg-stone-900 text-white p-4 rounded-sm font-bold tracking-widest uppercase hover:bg-[#e70064] transition-colors`}>Submit Details</button>
            </div>
          </div>
        </div>
      );
    }

    if (!profile.is_admin) {
      return (
        <div className="flex flex-col items-center justify-center py-32 px-6">
          <div className="bg-white p-12 rounded-sm shadow-md text-center border border-stone-200 max-w-md">
            <h2 className={`${montserrat.className} text-xl font-bold mb-4 uppercase tracking-widest`}>Welcome, {profile.full_name}</h2>
            <p className="text-stone-500 mb-8 font-light text-sm">Your account is currently pending Admin verification. Contact Rupali for approval.</p>
            <button onClick={logout} className={`${montserrat.className} text-xs font-bold tracking-widest uppercase text-[#e70064] border-b border-[#e70064] pb-1 hover:text-stone-900 hover:border-stone-900 transition-colors`}>Sign out securely</button>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-10">
        
        {/* SIDEBAR TABS */}
        <aside className="w-full md:w-1/4 shrink-0">
          <div className="bg-white p-6 rounded-sm shadow-sm border border-stone-200 sticky top-32">
            <h3 className={`${montserrat.className} text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-6 block border-b border-stone-100 pb-4`}>Dashboard Menu</h3>
            <ul className="space-y-2">
              {[
                { id: "upload", label: editingId ? "✏️ Edit Product" : "+ Add Product" },
                { id: "manage", label: "📦 Manage Catalog" },
                { id: "import", label: "📊 Import / Export" },
                { id: "testimonials", label: "⭐ Testimonials" }
              ].map(tab => (
                <li key={tab.id}>
                  <button 
                    onClick={() => setActiveTab(tab.id)}
                    className={`${montserrat.className} text-xs font-bold uppercase tracking-widest w-full text-left px-4 py-3 rounded-sm transition-colors ${activeTab === tab.id ? 'bg-[#e70064] text-white shadow-sm' : 'text-stone-500 hover:bg-stone-50 hover:text-stone-900'}`}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-stone-100">
              <button onClick={logout} className={`${montserrat.className} text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 hover:text-[#e70064] w-full text-left transition-colors`}>
                ⏏ Secure Logout
              </button>
            </div>
          </div>
        </aside>

        {/* MAIN DASHBOARD CONTENT */}
        <div className="w-full md:w-3/4">
          
          {/* TAB 1: UPLOAD / EDIT */}
          {activeTab === "upload" && (
            <div className="bg-white p-8 md:p-12 rounded-sm border border-stone-200 shadow-sm">
              <div className="flex justify-between items-center mb-8 border-b border-stone-100 pb-4">
                <h2 className={`${montserrat.className} text-2xl font-bold text-stone-900`}>{editingId ? "Edit Cake Details" : "Upload New Cake"}</h2>
                {editingId && (
                  <button onClick={() => { setEditingId(null); setCakeName(""); setCakeDesc(""); setPricingOptions([{ weight: "1 KG", price: "" }]); setCakeImages([]); setMainImageIndex(0); setCakeCategory("Birthday Cakes"); setIsEggless(false); }} className={`${montserrat.className} text-xs font-bold uppercase tracking-widest text-[#e70064]`}>Cancel Edit</button>
                )}
              </div>
              
              <form onSubmit={handleAddOrUpdateProduct} className="space-y-8">
                
                {/* CAKE NAME */}
                <div className="mb-6">
                  <label className={`${montserrat.className} block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 mb-3`}>Cake Name *</label>
                  <input type="text" required value={cakeName} onChange={e => setCakeName(e.target.value)} className="w-full border border-stone-200 p-3.5 rounded-sm focus:outline-none focus:border-[#e70064] bg-stone-50 text-sm" placeholder="e.g. Classic Black Forest" />
                </div>

                {/* DYNAMIC MULTI-WEIGHT PRICING SECTION */}
                <div className="bg-stone-50 p-6 rounded-sm border border-stone-200 space-y-4">
                  <label className={`${montserrat.className} block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 border-b border-stone-200 pb-2`}>Weight & Pricing *</label>
                  
                  {pricingOptions.map((option, index) => (
                    <div key={index} className="flex flex-col sm:flex-row gap-4 items-center">
                      <div className="w-full sm:w-1/2">
                        <select 
                          value={option.weight} 
                          onChange={e => handlePricingChange(index, "weight", e.target.value)} 
                          className="w-full border border-stone-200 p-3.5 rounded-sm focus:outline-none focus:border-[#e70064] bg-white text-sm"
                        >
                          <option value="0.5 KG">0.5 KG</option>
                          <option value="1 KG">1 KG</option>
                          <option value="1.5 KG">1.5 KG</option>
                          <option value="2 KG">2 KG</option>
                          <option value="2.5 KG">2.5 KG</option>
                          <option value="3 KG">3 KG</option>
                          <option value="4 KG">4 KG</option>
                          <option value="5 KG">5 KG</option>
                          <option value="Custom Box">Custom Box/Piece</option>
                        </select>
                      </div>
                      <div className="w-full sm:w-1/3">
                        <input 
                          type="number" 
                          placeholder="Price (₹) *" 
                          required 
                          value={option.price} 
                          onChange={e => handlePricingChange(index, "price", e.target.value)} 
                          className="w-full border border-stone-200 p-3.5 rounded-sm focus:outline-none focus:border-[#e70064] text-sm" 
                        />
                      </div>
                      <div className="w-full sm:w-1/6 text-right">
                        {pricingOptions.length > 1 && (
                          <button type="button" onClick={() => handleRemovePricingRow(index)} className={`${montserrat.className} text-[10px] font-bold uppercase tracking-widest text-[#e70064] hover:text-stone-900 transition-colors`}>
                            [Remove]
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  <button type="button" onClick={handleAddPricingRow} className={`${montserrat.className} mt-4 text-[10px] font-bold uppercase tracking-widest border border-stone-300 px-4 py-2 rounded-sm hover:border-[#e70064] hover:text-[#e70064] transition-colors`}>
                    + Add Weight & Price
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-stone-50 p-6 rounded-sm border border-stone-200">
                  <div>
                    <label className={`${montserrat.className} block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 mb-3`}>Category *</label>
                    <select value={cakeCategory} onChange={e => setCakeCategory(e.target.value)} className="w-full border border-stone-200 p-3.5 rounded-sm focus:outline-none focus:border-[#e70064] bg-white text-sm font-medium">
                      <option value="Birthday Cakes">Birthday Cakes</option>
                      <option value="Wedding & Anniversary">Wedding & Anniversary</option>
                      <option value="Kids Theme Cakes">Kids Theme Cakes</option>
                      <option value="Premium Signature">Premium Signature</option>
                      <option value="Dry & Tea Cakes">Dry & Tea Cakes</option>
                      <option value="Festive Specials">Festive Specials</option>
                    </select>
                  </div>
                  <div className="flex items-center pt-6">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-sm border flex items-center justify-center transition-colors ${isEggless ? 'bg-[#e70064] border-[#e70064]' : 'bg-white border-stone-300 group-hover:border-[#e70064]'}`}>
                        {isEggless && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                      </div>
                      <input type="checkbox" className="hidden" checked={isEggless} onChange={() => setIsEggless(!isEggless)} />
                      <span className={`${montserrat.className} text-sm font-bold text-stone-700 tracking-wide uppercase`}>100% Eggless Cake</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className={`${montserrat.className} block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 mb-3`}>Description</label>
                  <textarea value={cakeDesc} onChange={e => setCakeDesc(e.target.value)} className="w-full border border-stone-200 p-3.5 rounded-sm focus:outline-none focus:border-[#e70064] bg-stone-50 text-sm" placeholder="e.g. 1kg sponge with fresh cherries..." rows={3}></textarea>
                </div>

                {/* MULTIPLE IMAGE UPLOAD & GALLERY PREVIEW */}
                <div className="bg-stone-50 p-6 rounded-sm border border-stone-200 space-y-4">
                  <label className={`${montserrat.className} block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 border-b border-stone-200 pb-2`}>Upload Cake Photos *</label>
                  <input 
                    type="file" 
                    id="file-upload" 
                    accept="image/*" 
                    multiple 
                    onChange={handleImageUploadSelect} 
                    className={`${montserrat.className} w-full border border-stone-200 p-3 rounded-sm file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-[10px] file:font-bold file:tracking-widest file:uppercase file:bg-stone-900 file:text-white hover:file:bg-[#e70064] cursor-pointer bg-white text-sm`} 
                  />
                  
                  {cakeImages.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-stone-200">
                      {cakeImages.map((img, index) => (
                        <div key={index} className={`relative p-2 border rounded-sm flex flex-col items-center ${mainImageIndex === index ? 'border-[#e70064] bg-pink-50' : 'border-stone-200 bg-white'}`}>
                          <img src={img.url} alt={`preview ${index}`} className="w-full aspect-square object-cover rounded-sm mb-2" />
                          <div className="flex justify-between items-center w-full mt-auto">
                            <label className="flex items-center gap-1 cursor-pointer">
                              <input 
                                type="radio" 
                                name="mainImage" 
                                checked={mainImageIndex === index} 
                                onChange={() => setMainImageIndex(index)} 
                                className="w-3 h-3 accent-[#e70064]"
                              />
                              <span className={`${montserrat.className} text-[9px] font-bold uppercase tracking-widest text-stone-600`}>Main</span>
                            </label>
                            <button 
                              type="button" 
                              onClick={() => handleRemoveImage(index)} 
                              className={`${montserrat.className} text-[9px] font-bold uppercase tracking-widest text-[#e70064] hover:underline`}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button type="submit" disabled={isUploading} className={`${montserrat.className} w-full bg-stone-900 text-white p-4 rounded-sm font-bold tracking-[0.2em] uppercase hover:bg-[#e70064] transition-colors disabled:bg-stone-300 shadow-md`}>
                  {isUploading ? "Syncing Database..." : editingId ? "Save Changes" : "Publish to Website"}
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: MANAGE CATALOG */}
          {activeTab === "manage" && (
            <div className="bg-white p-8 md:p-12 rounded-sm border border-stone-200 shadow-sm">
              <div className="flex justify-between items-center mb-8 border-b border-stone-100 pb-4">
                <h2 className={`${montserrat.className} text-2xl font-bold text-stone-900`}>Manage Catalog</h2>
                <span className={`${montserrat.className} text-[10px] font-bold uppercase tracking-widest text-stone-400`}>{allProducts.length} Items Live</span>
              </div>
              
              <div className="space-y-4">
                {allProducts.map(cake => (
                  <div key={cake.id} className="flex flex-col sm:flex-row items-center gap-6 p-4 border border-stone-100 bg-stone-50 rounded-sm hover:border-[#e70064] transition-colors">
                    <img src={cake.image_url || ''} className="w-20 h-20 object-cover rounded-sm border border-stone-200" alt="Cake" />
                    <div className="flex-grow text-center sm:text-left">
                      <h4 className={`${montserrat.className} font-bold text-stone-900 text-sm mb-1`}>{cake.name}</h4>
                      <p className={`${montserrat.className} text-[10px] font-bold uppercase tracking-widest text-stone-500`}>{cake.category} | Starts at ₹{cake.price}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => startEditing(cake)} className={`${montserrat.className} text-[10px] font-bold uppercase tracking-widest border border-stone-300 px-4 py-2 rounded-sm hover:bg-stone-900 hover:text-white transition-colors`}>Edit</button>
                      <button onClick={() => deleteProduct(cake.id)} className={`${montserrat.className} text-[10px] font-bold uppercase tracking-widest border border-[#e70064] text-[#e70064] px-4 py-2 rounded-sm hover:bg-[#e70064] hover:text-white transition-colors`}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: IMPORT / EXPORT */}
          {activeTab === "import" && (
            <div className="bg-white p-8 md:p-12 rounded-sm border border-stone-200 shadow-sm">
              <div className="mb-8 border-b border-stone-100 pb-4">
                <h2 className={`${montserrat.className} text-2xl font-bold text-stone-900`}>Database Tools</h2>
                <p className="text-stone-500 font-light text-sm mt-2">Download your catalog to Excel (CSV) or bulk upload new products.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Export Card */}
                <div className="border border-stone-200 bg-stone-50 p-8 rounded-sm text-center flex flex-col items-center justify-center">
                  <div className="text-4xl mb-4">📥</div>
                  <h3 className={`${montserrat.className} font-bold uppercase tracking-widest text-stone-900 text-xs mb-4`}>Export Catalog</h3>
                  <p className="text-xs font-light text-stone-500 mb-6">Download your entire website catalog as a CSV spreadsheet.</p>
                  <button onClick={exportToCSV} className={`${montserrat.className} w-full bg-stone-900 text-white py-3 rounded-sm font-bold text-[10px] tracking-widest uppercase hover:bg-[#e70064] transition-colors`}>
                    Download CSV
                  </button>
                </div>

                {/* Import Card */}
                <div className="border border-stone-200 bg-stone-50 p-8 rounded-sm text-center flex flex-col items-center justify-center">
                  <div className="text-4xl mb-4">📤</div>
                  <h3 className={`${montserrat.className} font-bold uppercase tracking-widest text-stone-900 text-xs mb-4`}>Bulk Import</h3>
                  <p className="text-xs font-light text-stone-500 mb-6">Upload a CSV to instantly add multiple products to the website.</p>
                  <div className="relative w-full">
                    <input type="file" accept=".csv" onChange={handleImportCSV} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <button className={`${montserrat.className} w-full bg-white border border-stone-900 text-stone-900 py-3 rounded-sm font-bold text-[10px] tracking-widest uppercase pointer-events-none`}>
                      {isUploading ? "Uploading..." : "Select CSV File"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TESTIMONIALS */}
          {activeTab === "testimonials" && (
            <div className="bg-white p-8 md:p-12 rounded-sm border border-stone-200 shadow-sm">
              <div className="mb-8 border-b border-stone-100 pb-4">
                <h2 className={`${montserrat.className} text-2xl font-bold text-stone-900`}>Add Testimonial</h2>
                <p className="text-[#e70064] font-medium text-xs mt-2 uppercase tracking-widest">Note: Ensure a 'testimonials' table exists in Supabase.</p>
              </div>

              <form onSubmit={handleAddTestimonial} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className={`${montserrat.className} block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 mb-3`}>Customer Name *</label>
                    <input type="text" required value={testAuthor} onChange={e => setTestAuthor(e.target.value)} className="w-full border border-stone-200 p-3.5 rounded-sm focus:outline-none focus:border-[#e70064] bg-stone-50 text-sm" placeholder="e.g. Priya M." />
                  </div>
                  <div>
                    <label className={`${montserrat.className} block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 mb-3`}>Star Rating (1-5) *</label>
                    <select value={testRating} onChange={e => setTestRating(e.target.value)} className="w-full border border-stone-200 p-3.5 rounded-sm focus:outline-none focus:border-[#e70064] bg-stone-50 text-sm font-medium">
                      <option value="5">5 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="3">3 Stars</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`${montserrat.className} block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 mb-3`}>Review Text *</label>
                  <textarea required value={testText} onChange={e => setTestText(e.target.value)} className="w-full border border-stone-200 p-3.5 rounded-sm focus:outline-none focus:border-[#e70064] bg-stone-50 text-sm" placeholder="The cake was amazing..." rows={4}></textarea>
                </div>

                <button type="submit" disabled={isUploading} className={`${montserrat.className} w-full bg-stone-900 text-white p-4 rounded-sm font-bold tracking-[0.2em] uppercase hover:bg-[#e70064] transition-colors disabled:bg-stone-300 shadow-md`}>
                  {isUploading ? "Publishing..." : "Publish Testimonial"}
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER THE FULL PAGE WRAPPED IN UNIFIED HEADER/FOOTER
  // ==========================================
  return (
    <div className={`min-h-screen bg-[#FAF9F6] text-stone-800 flex flex-col ${poppins.className}`}>
      
      {/* --- UNIFIED GLOBAL HEADER START --- */}
      <header className="sticky top-0 w-full z-50 bg-white shadow-sm border-b border-stone-200">
        <div className={`bg-stone-900 text-white text-[10px] md:text-xs font-light tracking-[0.2em] uppercase text-center py-2.5 ${montserrat.className}`}>
          Delivering Premium Freshness Across Virar & Mumbai
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center py-4">
          <a href="/" className={`${montserrat.className} text-2xl font-bold tracking-tight text-stone-900`}>
            Cake By Rupali.
          </a>
          
          <nav className={`hidden md:flex items-center gap-10 text-xs font-semibold tracking-wide uppercase ${montserrat.className} text-stone-700`}>
            <a href="/" className="hover:text-[#e70064] transition-colors">Home</a>
            
            <div className="group relative py-2">
              <button className="hover:text-[#e70064] transition flex items-center gap-1 outline-none uppercase tracking-wide font-semibold">
                Shop <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              <div className="absolute left-0 top-full pt-4 w-60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col transform group-hover:translate-y-1">
                <div className="bg-white border border-stone-200 shadow-xl flex flex-col py-2">
                  <a href="/shop" className="hover:text-[#e70064] transition text-xs font-bold uppercase tracking-widest border-b border-stone-100 pb-2 px-6 py-3">All Cakes</a>
                  <a href="/shop?category=Birthday+Cakes" className="hover:text-[#e70064] transition text-sm capitalize px-6 py-3">Birthday Cakes</a>
                  <a href="/shop?category=Wedding+%26+Anniversary" className="hover:text-[#e70064] transition text-sm capitalize px-6 py-3">Wedding & Anniversary</a>
                  <a href="/shop?category=Kids+Theme+Cakes" className="hover:text-[#e70064] transition text-sm capitalize px-6 py-3">Kids & Theme Cakes</a>
                  <a href="/shop?category=Premium+Signature" className="hover:text-[#e70064] transition text-sm capitalize px-6 py-3">Premium Signature</a>
                  <a href="/shop?category=Dry+%26+Tea+Cakes" className="hover:text-[#e70064] transition text-sm capitalize px-6 py-3">Dry & Tea Cakes</a>
                </div>
                <div className="bg-stone-50 p-4 border-t border-stone-100">
                  <a href="/shop?category=Festive+Specials" className="text-[#e70064] font-semibold text-sm hover:text-pink-800 transition capitalize block">🎉 Festive Specials</a>
                </div>
              </div>
            </div>

            <a href="/custom-cake" className="hover:text-[#e70064] transition uppercase tracking-wide font-semibold">Custom Cake</a>
            <a href="/about" className="hover:text-[#e70064] transition uppercase tracking-wide font-semibold">About Us</a>
          </nav>

          <div className="flex items-center gap-6">
            <a href="/admin" className={`${montserrat.className} hidden md:block text-xs font-bold tracking-widest uppercase text-[#e70064] transition`}>Admin</a>
            <a href="https://wa.me/917666660036" target="_blank" rel="noopener noreferrer" className={`${montserrat.className} bg-stone-900 text-white px-6 py-3 text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#e70064] transition-colors duration-300 rounded-sm`}>
              Order on WhatsApp
            </a>
          </div>
        </div>
      </header>
      {/* --- UNIFIED GLOBAL HEADER END --- */}

      {/* RENDER DYNAMIC MAIN CONTENT HERE (LOGIN OR DASHBOARD) */}
      <main className="flex-grow">
        {renderContent()}
      </main>

      {/* --- UNIFIED GLOBAL FOOTER START --- */}
      <footer className="bg-stone-900 text-white pt-20 pb-8 border-t border-stone-800 mt-auto">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          <div className="md:col-span-4">
            <h2 className={`${montserrat.className} text-2xl font-bold tracking-tight mb-4`}>Cake By Rupali.</h2>
            <p className="text-stone-400 text-sm font-light leading-relaxed mb-8 max-w-sm">
              Premium handcrafted cakes designed with professional perfection in Virar. Elevating everyday celebrations into unforgettable memories.
            </p>
            <div className="flex gap-4">
              <a href="#" className={`${montserrat.className} w-10 h-10 border border-stone-700 rounded-sm flex items-center justify-center text-xs font-bold hover:bg-[#e70064] hover:border-[#e70064] transition-colors cursor-pointer text-stone-300 hover:text-white`}>IG</a>
              <a href="#" className={`${montserrat.className} w-10 h-10 border border-stone-700 rounded-sm flex items-center justify-center text-xs font-bold hover:bg-[#e70064] hover:border-[#e70064] transition-colors cursor-pointer text-stone-300 hover:text-white`}>FB</a>
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-7">
            <h4 className={`${montserrat.className} font-bold text-xs uppercase tracking-widest mb-6 text-stone-100`}>Quick Links</h4>
            <ul className="space-y-4 text-sm font-light text-stone-400">
              <li><a href="/shop" className="hover:text-white transition">Shop Cakes</a></li>
              <li><a href="/custom-cake" className="hover:text-white transition">Custom Orders</a></li>
              <li><a href="/about" className="hover:text-white transition">Our Story</a></li>
              <li><a href="/admin" className="hover:text-white transition">Admin Portal</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className={`${montserrat.className} font-bold text-xs uppercase tracking-widest mb-6 text-stone-100`}>Contact Us</h4>
            <ul className="space-y-4 text-sm font-light text-stone-400">
              <li className="flex gap-3 items-center"><span className="text-[#e70064]">📍</span> Virar (East), Maharashtra</li>
              <li className="flex gap-3 items-center"><span className="text-[#e70064]">📞</span> +91 76666 60036</li>
            </ul>
            <div className="mt-8 p-4 bg-stone-800/50 rounded-sm border border-stone-800">
              <p className={`${montserrat.className} text-[10px] text-stone-500 mb-1 uppercase tracking-widest font-semibold`}>FSSAI Registration</p>
              <p className="text-sm text-stone-300 font-light">(Update in Admin)</p>
            </div>
          </div>

        </div>
        
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light text-stone-500 tracking-wide">
          <p>&copy; {new Date().getFullYear()} Cake By Rupali. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/admin" className="hover:text-white transition">Admin Portal</a>
            <span>Designed for the modern web.</span>
          </div>
        </div>
      </footer>
      {/* --- UNIFIED GLOBAL FOOTER END --- */}

    </div>
  );
}