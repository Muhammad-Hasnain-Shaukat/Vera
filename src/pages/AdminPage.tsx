import React, { useState } from 'react';
import { 
  BarChart3, Package, ShoppingCart, Users, Star, 
  Sparkles, Check, X, Edit2, Plus, ArrowUpRight, 
  TrendingUp, ShieldCheck, Search 
} from 'lucide-react';
import { initialProducts } from '../data/products';
import { Product, Order } from '../types';
import { useAuth } from '../context/AuthContext';

interface AdminPageProps {
  onNavigate: (path: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const { orders: contextOrders } = useAuth();

  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'orders' | 'reviews' | 'quiz' | 'users'>('analytics');
  
  // Product state for admin editing
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState(85);
  const [newProductCategory, setNewProductCategory] = useState<'Skin' | 'Body' | 'Sets'>('Skin');

  // Orders state
  const [orders, setOrders] = useState<Order[]>([
    ...contextOrders,
    {
      id: 'VERA-94102',
      date: 'March 2, 2025',
      customer: {
        firstName: 'Camilla',
        lastName: 'Moreau',
        email: 'camilla.m@lausanne.ch',
        address: '12 Avenue de Rumine',
        city: 'Lausanne',
        state: 'Vaud',
        zip: '1005',
        country: 'Switzerland'
      },
      items: [],
      subtotal: 260,
      shipping: 0,
      discount: 39,
      total: 221,
      status: 'Shipped',
      paymentMethod: 'Visa ending in 9102'
    },
    {
      id: 'VERA-93881',
      date: 'March 1, 2025',
      customer: {
        firstName: 'Arthur',
        lastName: 'Pendelton',
        email: 'arthur.p@harrods-london.co.uk',
        address: '87 Knightsbridge',
        city: 'London',
        state: 'Greater London',
        zip: 'SW1X 7XL',
        country: 'United Kingdom'
      },
      items: [],
      subtotal: 182,
      shipping: 0,
      discount: 0,
      total: 182,
      status: 'Processing',
      paymentMethod: 'American Express ending in 1004'
    }
  ]);

  // Reviews moderation state
  const [reviews, setReviews] = useState([
    {
      id: 'rev-1',
      author: 'Aria Sterling',
      product: 'Renewal Serum',
      rating: 5,
      comment: 'Noticeable reduction in fine dehydration lines within one week of use.',
      approved: true
    },
    {
      id: 'rev-2',
      author: 'Henriette B.',
      product: 'Barrier Recovery Crème',
      rating: 5,
      comment: 'Calmed my rosacea flare up during flight travel. Remarkable texture.',
      approved: true
    },
    {
      id: 'rev-3',
      author: 'Jordan K.',
      product: 'Mineral Veil SPF 50+',
      rating: 4,
      comment: 'No white cast on olive skin, very elegant packaging.',
      approved: false
    }
  ]);

  const updateOrderStatus = (orderId: string, newStatus: 'Processing' | 'Shipped' | 'Delivered') => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const handleUpdatePrice = (productId: string, newPrice: number) => {
    setProducts(prev =>
      prev.map(p => (p.id === productId ? { ...p, price: newPrice } : p))
    );
  };

  const toggleStock = (productId: string) => {
    setProducts(prev =>
      prev.map(p => (p.id === productId ? { ...p, inStock: !p.inStock } : p))
    );
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim()) return;

    const newProd: Product = {
      id: `vera-${Date.now()}`,
      name: newProductName,
      subtitle: 'New Laboratory Clinical Batch',
      slug: newProductName.toLowerCase().replace(/\s+/g, '-'),
      category: newProductCategory,
      price: newProductPrice,
      rating: 5.0,
      reviewsCount: 1,
      size: '50 ml / 1.7 fl. oz.',
      inStock: true,
      stockCount: 50,
      shortDescription: 'Latest formulation engineered at Zurich laboratory.',
      description: 'Engineered with biomimetic active fractions for high-demand barriers.',
      images: [
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
      ],
      keyActives: [{ name: 'Bio-Identical Peptide Complex', purpose: 'Restorative barrier cushion' }],
      fullIngredients: 'Aqua, Glycerin, Sodium Hyaluronate, Niacinamide, Squalane, Phenoxyethanol.',
      skinTypes: ['All', 'Sensitive'],
      concerns: ['Dullness', 'Dryness'],
      ritual: {
        step: '02 — Treat',
        timing: 'Both',
        howToUse: 'Smooth 3 to 4 drops over cleansed face.',
        texture: 'Silky micro-emulsion',
        scent: 'Natural botanical clean'
      }
    };

    setProducts(prev => [newProd, ...prev]);
    setIsAddProductOpen(false);
    setNewProductName('');
  };

  const toggleReviewApproval = (id: string) => {
    setReviews(prev =>
      prev.map(r => (r.id === id ? { ...r, approved: !r.approved } : r))
    );
  };

  const deleteReview = (id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="pb-6 border-b border-[#E8E2D8] mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl tracking-[0.25em] font-light text-[#1C1917]">
                VERA
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#1C1917] text-[#FAF7F2] text-[9px] font-sans tracking-widest-editorial uppercase">
                Laboratory Admin
              </span>
            </div>
            <p className="text-xs font-sans text-[#78716C] mt-1">
              Zurich &amp; Paris Operations, Formulations, Orders, and Clinical Analytics
            </p>
          </div>

          <button
            onClick={() => onNavigate('/')}
            className="text-xs font-sans tracking-wider-editorial uppercase text-[#57534E] hover:text-[#1C1917] underline"
          >
            Exit to Storefront
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-[#E8E2D8] mb-8 overflow-x-auto no-scrollbar space-x-6 text-xs font-sans tracking-widest-editorial uppercase">
          {[
            { id: 'analytics', label: 'Analytics & KPIs', icon: BarChart3 },
            { id: 'products', label: `Products (${products.length})`, icon: Package },
            { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingCart },
            { id: 'reviews', label: `Reviews (${reviews.length})`, icon: Star },
            { id: 'quiz', label: 'Quiz Submissions', icon: Sparkles },
            { id: 'users', label: 'Client Accounts', icon: Users }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-[#1C1917] text-[#1C1917] font-medium'
                    : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 1. Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs space-y-2">
                <span className="text-[10px] font-sans tracking-widest-editorial uppercase text-[#78716C]">
                  Gross Revenue (MTD)
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-3xl font-light text-[#1C1917]">$48,920.00</span>
                  <span className="text-xs font-sans text-[#7D8876] font-medium flex items-center">
                    +18.4% <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
                <span className="text-[11px] font-sans text-[#78716C] block">vs $41,310 last month</span>
              </div>

              <div className="p-6 bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs space-y-2">
                <span className="text-[10px] font-sans tracking-widest-editorial uppercase text-[#78716C]">
                  Total Order Acquisitions
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-3xl font-light text-[#1C1917]">342</span>
                  <span className="text-xs font-sans text-[#7D8876] font-medium flex items-center">
                    +12.1% <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
                <span className="text-[11px] font-sans text-[#78716C] block">Average order frequency 1.8x</span>
              </div>

              <div className="p-6 bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs space-y-2">
                <span className="text-[10px] font-sans tracking-widest-editorial uppercase text-[#78716C]">
                  Conversion Rate
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-3xl font-light text-[#1C1917]">3.82%</span>
                  <span className="text-xs font-sans text-[#7D8876] font-medium flex items-center">
                    +0.6% <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
                <span className="text-[11px] font-sans text-[#78716C] block">Top source: Editorial Journal</span>
              </div>

              <div className="p-6 bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs space-y-2">
                <span className="text-[10px] font-sans tracking-widest-editorial uppercase text-[#78716C]">
                  Average Order Value (AOV)
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-3xl font-light text-[#1C1917]">$143.04</span>
                  <span className="text-xs font-sans text-[#7D8876] font-medium flex items-center">
                    +5.2% <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
                <span className="text-[11px] font-sans text-[#78716C] block">Boosted by Routine Builder</span>
              </div>
            </div>

            {/* Bestselling Formulas & Laboratory Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-6 bg-[#FAF7F2] border border-[#E8E2D8] rounded-xs">
                <h3 className="font-serif text-xl text-[#1C1917] mb-4 pb-2 border-b border-[#E8E2D8]">
                  Bestselling Formulas By Revenue
                </h3>
                <div className="space-y-4">
                  {[
                    { name: 'The Architectural Ritual Set', sales: '88 sets', revenue: '$22,880', share: '46%' },
                    { name: 'Renewal Serum (30ml)', sales: '142 units', revenue: '$12,496', share: '25%' },
                    { name: 'Mineral Veil SPF 50+', sales: '114 units', revenue: '$6,612', share: '13%' },
                    { name: 'Barrier Recovery Crème', sales: '64 units', revenue: '$6,016', share: '12%' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-xs font-sans">
                      <div>
                        <span className="font-serif text-base text-[#1C1917] font-medium block">{item.name}</span>
                        <span className="text-[11px] text-[#78716C]">{item.sales} sold</span>
                      </div>
                      <div className="text-right">
                        <span className="font-medium text-[#1C1917] block">{item.revenue}</span>
                        <span className="text-[11px] text-[#C5A880]">{item.share} of total</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-[#FAF7F2] border border-[#E8E2D8] rounded-xs">
                <h3 className="font-serif text-xl text-[#1C1917] mb-4 pb-2 border-b border-[#E8E2D8]">
                  Regional Delivery Dispatch Volume
                </h3>
                <div className="space-y-4 text-xs font-sans text-[#57534E]">
                  <div className="flex justify-between items-center">
                    <span>European Union (France, Germany, Italy)</span>
                    <span className="font-mono text-[#1C1917] font-medium">42%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Switzerland (Zurich, Geneva, Basel)</span>
                    <span className="font-mono text-[#1C1917] font-medium">28%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>United Kingdom (London, Edinburgh)</span>
                    <span className="font-mono text-[#1C1917] font-medium">18%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>North America (New York, California)</span>
                    <span className="font-mono text-[#1C1917] font-medium">12%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. Products Management Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-xs font-sans tracking-widest-editorial uppercase text-[#78716C]">
                Current Formulations Catalog ({products.length})
              </span>
              <button
                onClick={() => setIsAddProductOpen(true)}
                className="px-4 py-2 bg-[#1C1917] text-[#FAF7F2] text-xs font-sans tracking-widest-editorial uppercase flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Formula</span>
              </button>
            </div>

            <div className="overflow-x-auto border border-[#E8E2D8] rounded-xs bg-[#FAF7F2]">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-[#F4EFE6] border-b border-[#E8E2D8] text-[10px] tracking-widest-editorial uppercase text-[#78716C]">
                  <tr>
                    <th className="p-4">Formula</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Inventory</th>
                    <th className="p-4">Rating</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E2D8]">
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-[#F4EFE6]/50 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <img src={p.images[0]} alt={p.name} className="w-10 h-12 object-cover rounded-xs border border-[#E8E2D8]" />
                        <div>
                          <span className="font-serif text-sm font-medium text-[#1C1917] block">{p.name}</span>
                          <span className="text-[10px] text-[#78716C]">{p.size}</span>
                        </div>
                      </td>
                      <td className="p-4 text-[#57534E]">{p.category}</td>
                      <td className="p-4">
                        <span className="font-medium text-[#1C1917]">${p.price}</span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => toggleStock(p.id)}
                          className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-sans cursor-pointer ${
                            p.inStock
                              ? 'bg-[#7D8876]/15 text-[#7D8876]'
                              : 'bg-[#A25050]/15 text-[#A25050]'
                          }`}
                        >
                          {p.inStock ? 'In Stock' : 'Discontinued'}
                        </button>
                      </td>
                      <td className="p-4 text-[#1C1917] font-mono">
                        ★ {p.rating} ({p.reviewsCount})
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => {
                            const newPrice = prompt(`Update price for ${p.name}:`, p.price.toString());
                            if (newPrice && !isNaN(Number(newPrice))) {
                              handleUpdatePrice(p.id, Number(newPrice));
                            }
                          }}
                          className="text-[#1C1917] underline text-[11px] cursor-pointer"
                        >
                          Edit Price
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Product Modal */}
            {isAddProductOpen && (
              <div className="fixed inset-0 z-50 bg-[#1C1917]/50 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-[#FAF7F2] max-w-md w-full p-6 rounded-xs border border-[#E8E2D8] shadow-2xl">
                  <h3 className="font-serif text-2xl text-[#1C1917] mb-4">Add New Clinical Formulation</h3>
                  <form onSubmit={handleAddProduct} className="space-y-4 text-xs font-sans">
                    <div>
                      <label className="block uppercase text-[#78716C] mb-1">Product Name</label>
                      <input
                        type="text"
                        required
                        value={newProductName}
                        onChange={e => setNewProductName(e.target.value)}
                        placeholder="e.g. Copper Peptide Restorative Gel"
                        className="w-full p-2.5 bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs"
                      />
                    </div>
                    <div>
                      <label className="block uppercase text-[#78716C] mb-1">Category</label>
                      <select
                        value={newProductCategory}
                        onChange={e => setNewProductCategory(e.target.value as any)}
                        className="w-full p-2.5 bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs"
                      >
                        <option value="Skin">Skin</option>
                        <option value="Body">Body</option>
                        <option value="Sets">Sets</option>
                      </select>
                    </div>
                    <div>
                      <label className="block uppercase text-[#78716C] mb-1">Price (USD)</label>
                      <input
                        type="number"
                        required
                        value={newProductPrice}
                        onChange={e => setNewProductPrice(Number(e.target.value))}
                        className="w-full p-2.5 bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddProductOpen(false)}
                        className="px-4 py-2 border border-[#D5CCC0]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2 bg-[#1C1917] text-[#FAF7F2] uppercase tracking-wider-editorial"
                      >
                        Save Formulation
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <span className="text-xs font-sans tracking-widest-editorial uppercase text-[#78716C] block">
              Recent Laboratory Acquisitions ({orders.length})
            </span>
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="p-6 bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-medium text-[#1C1917]">{order.id}</span>
                      <span className="text-xs font-sans text-[#78716C]">• {order.date}</span>
                    </div>
                    <p className="text-xs font-sans text-[#57534E] mt-1">
                      Client: <strong>{order.customer.firstName} {order.customer.lastName}</strong> ({order.customer.email})
                    </p>
                    <p className="text-[11px] font-sans text-[#78716C]">
                      Destination: {order.customer.address}, {order.customer.city}, {order.customer.country}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-sans font-medium text-base text-[#1C1917]">
                      ${order.total.toFixed(2)}
                    </span>
                    
                    <select
                      value={order.status}
                      onChange={e => updateOrderStatus(order.id, e.target.value as any)}
                      className="bg-[#FAF7F2] border border-[#E8E2D8] px-3 py-1.5 rounded-xs text-xs font-sans text-[#1C1917]"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Reviews Moderation */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <span className="text-xs font-sans tracking-widest-editorial uppercase text-[#78716C] block">
              Customer Evaluations Moderation
            </span>
            <div className="space-y-3">
              {reviews.map(rev => (
                <div key={rev.id} className="p-4 bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs flex items-center justify-between gap-4">
                  <div className="space-y-1 text-xs font-sans">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[#1C1917]">{rev.author}</span>
                      <span className="text-[#C5A880]">★ {rev.rating}</span>
                      <span className="text-[#78716C]">for {rev.product}</span>
                    </div>
                    <p className="text-[#57534E] italic">"{rev.comment}"</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleReviewApproval(rev.id)}
                      className={`px-3 py-1 text-[11px] font-sans uppercase rounded-xs border ${
                        rev.approved
                          ? 'bg-[#7D8876]/20 border-[#7D8876] text-[#7D8876]'
                          : 'bg-[#FAF7F2] border-[#E8E2D8] text-[#78716C]'
                      }`}
                    >
                      {rev.approved ? 'Approved' : 'Pending'}
                    </button>
                    <button
                      onClick={() => deleteReview(rev.id)}
                      className="p-1 text-[#A25050] hover:text-[#1C1917]"
                      title="Delete review"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Quiz Submissions Analytics */}
        {activeTab === 'quiz' && (
          <div className="p-6 bg-[#FAF7F2] border border-[#E8E2D8] rounded-xs space-y-6">
            <h3 className="font-serif text-2xl text-[#1C1917] pb-3 border-b border-[#E8E2D8]">
              Client Skin Diagnostic Insights (Last 30 Days: 1,482 Submissions)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-sans">
              <div className="space-y-3">
                <span className="text-[11px] uppercase tracking-wider-editorial text-[#78716C] block">
                  Most Frequent Reported Concerns
                </span>
                {[
                  { name: 'Dullness & Oxidative Fatigue', pct: 36 },
                  { name: 'Compromised Lipid Barrier / Dryness', pct: 28 },
                  { name: 'Fine Mechanical Expression Lines', pct: 18 },
                  { name: 'Transient Erythema & Sensitivity', pct: 18 }
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-[#1C1917]">
                      <span>{item.name}</span>
                      <span>{item.pct}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#E8E2D8] rounded-full overflow-hidden">
                      <div className="h-full bg-[#1C1917]" style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <span className="text-[11px] uppercase tracking-wider-editorial text-[#78716C] block">
                  Skin Constitution Breakdown
                </span>
                {[
                  { name: 'Combination Skin', pct: 38 },
                  { name: 'Dehydrated / Dry Skin', pct: 32 },
                  { name: 'Sensitized / Reactive Skin', pct: 20 },
                  { name: 'Balanced Normal Skin', pct: 10 }
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-[#1C1917]">
                      <span>{item.name}</span>
                      <span>{item.pct}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#E8E2D8] rounded-full overflow-hidden">
                      <div className="h-full bg-[#C5A880]" style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 6. Users / Accounts Tab */}
        {activeTab === 'users' && (
          <div className="overflow-x-auto border border-[#E8E2D8] rounded-xs bg-[#FAF7F2]">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#F4EFE6] border-b border-[#E8E2D8] text-[10px] tracking-widest-editorial uppercase text-[#78716C]">
                <tr>
                  <th className="p-4">Client Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Skin Constitution</th>
                  <th className="p-4">Orders Placed</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E2D8]">
                {[
                  { name: 'Margaux Delacroix', email: 'margaux.delacroix@vera-client.com', skin: 'Combination', orders: 2, status: 'VIP Sanctuary' },
                  { name: 'Camilla Moreau', email: 'camilla.m@lausanne.ch', skin: 'Dry', orders: 1, status: 'Active' },
                  { name: 'Arthur Pendelton', email: 'arthur.p@harrods-london.co.uk', skin: 'Sensitive', orders: 1, status: 'Active' },
                  { name: 'Genevieve Marchand', email: 'genevieve@marchand-art.fr', skin: 'Balanced', orders: 4, status: 'VIP Sanctuary' }
                ].map((u, i) => (
                  <tr key={i} className="hover:bg-[#F4EFE6]/50">
                    <td className="p-4 font-serif text-sm text-[#1C1917]">{u.name}</td>
                    <td className="p-4 font-mono text-[11px] text-[#57534E]">{u.email}</td>
                    <td className="p-4 text-[#78716C]">{u.skin}</td>
                    <td className="p-4 text-[#1C1917]">{u.orders} acquisitions</td>
                    <td className="p-4 text-[#7D8876] font-medium">{u.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
};
