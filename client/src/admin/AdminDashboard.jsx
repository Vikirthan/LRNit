import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, Calendar, Users, Image, LogOut, Plus, Trash2, Edit3,
    Upload, X, Save, Cpu, Menu, ChevronDown
} from 'lucide-react';
import { supabase } from '../supabaseClient';

// ─── Dashboard Overview ──────────────────────────────
function Overview() {
    const [stats, setStats] = useState({ events: 0, team: 0, gallery: 0, announcements: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [
                    { count: eventsCount },
                    { count: teamCount },
                    { count: galleryCount },
                    { count: announcementsCount }
                ] = await Promise.all([
                    supabase.from('events').select('*', { count: 'exact', head: true }),
                    supabase.from('team').select('*', { count: 'exact', head: true }),
                    supabase.from('gallery').select('*', { count: 'exact', head: true }),
                    supabase.from('announcements').select('*', { count: 'exact', head: true }),
                ]);

                setStats({
                    events: eventsCount || 0,
                    team: teamCount || 0,
                    gallery: galleryCount || 0,
                    announcements: announcementsCount || 0,
                });
            } catch (err) {
                console.error("Error fetching stats:", err);
            }
        };
        fetchStats();
    }, []);

    const cards = [
        { label: 'Events', count: stats.events, icon: <Calendar className="h-6 w-6" />, color: 'bg-blue-500', path: '/lrnit-admin/dashboard/events' },
        { label: 'Team Members', count: stats.team, icon: <Users className="h-6 w-6" />, color: 'bg-purple-500', path: '/lrnit-admin/dashboard/team' },
        { label: 'Gallery Images', count: stats.gallery, icon: <Image className="h-6 w-6" />, color: 'bg-green-500', path: '/lrnit-admin/dashboard/gallery' },
        { label: 'Announcements', count: stats.announcements, icon: <LayoutDashboard className="h-6 w-6" />, color: 'bg-orange-500', path: '/lrnit-admin/dashboard/announcements' },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map(c => (
                    <Link key={c.label} to={c.path} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all group">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${c.color} p-3 rounded-lg text-white`}>{c.icon}</div>
                            <span className="text-3xl font-bold text-white">{c.count}</span>
                        </div>
                        <p className="text-gray-400 group-hover:text-gray-300">{c.label}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

// ─── Image Upload Helper ──────────────────────────────
function ImageUpload({ onUploaded }) {
    const [uploading, setUploading] = useState(false);

    const handleFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            let { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage
                .from('images')
                .getPublicUrl(filePath);

            onUploaded(data.publicUrl);
        } catch (err) {
            console.error('Error uploading image:', err);
            alert('Upload failed: ' + err.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <label className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:bg-white/10 transition text-sm text-gray-300">
            <Upload className="h-4 w-4" />
            {uploading ? 'Uploading...' : 'Upload Image'}
            <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </label>
    );
}

// ─── Events Manager ──────────────────────────────
function EventsManager() {
    const [events, setEvents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ title: '', category: 'Technical', date: '', description: '', status: 'Upcoming', image_url: '', is_featured: false, banner_color: '#0B3D91' });

    const load = async () => {
        const { data, error } = await supabase.from('events').select('*').order('date', { ascending: false });
        if (!error) setEvents(data);
    };

    useEffect(() => { load(); }, []);

    const resetForm = () => {
        setForm({ title: '', category: 'Technical', date: '', description: '', status: 'Upcoming', image_url: '', is_featured: false, banner_color: '#0B3D91' });
        setEditing(null);
        setShowForm(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editing) {
            const { error } = await supabase.from('events').update(form).eq('id', editing);
            if (error) alert(error.message);
        } else {
            const { error } = await supabase.from('events').insert([form]);
            if (error) alert(error.message);
        }
        resetForm();
        load();
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this event?')) return;
        const { error } = await supabase.from('events').delete().eq('id', id);
        if (error) alert(error.message);
        load();
    };

    const startEdit = (ev) => {
        setForm({
            title: ev.title,
            category: ev.category,
            date: ev.date ? new Date(ev.date).toISOString().split('T')[0] : '',
            description: ev.description,
            status: ev.status,
            image_url: ev.image_url || '',
            is_featured: ev.is_featured,
            banner_color: ev.banner_color || '#0B3D91'
        });
        setEditing(ev.id);
        setShowForm(true);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white">Events</h1>
                <button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-2 px-4 py-2 bg-primaryTechBlue text-white rounded-lg hover:bg-blue-600 transition text-sm">
                    <Plus className="h-4 w-4" /> Add Event
                </button>
            </div>

            {showForm && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-white">{editing ? 'Edit Event' : 'New Event'}</h2>
                        <button onClick={resetForm} className="text-gray-400 hover:text-white"><X className="h-5 w-5" /></button>
                    </div>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input className="admin-input" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
                        <select className="admin-input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                            {['Technical', 'Non-Technical', 'Workshops', 'Competitions', 'Campus Activities'].map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <input className="admin-input" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
                        <select className="admin-input" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                            {['Upcoming', 'Live', 'Past'].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <textarea className="admin-input md:col-span-2" placeholder="Description" rows="3" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
                        <div className="flex items-center gap-4">
                            <ImageUpload onUploaded={(url) => setForm({ ...form, image_url: url })} />
                            {form.image_url && <span className="text-xs text-green-400 truncate max-w-[200px]">✓ Image set</span>}
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="featured" checked={form.is_featured} onChange={e => setForm({ ...form, is_featured: e.target.checked })} className="rounded" />
                            <label htmlFor="featured" className="text-gray-300 text-sm border-r border-gray-600 pr-4">Featured</label>

                            <label className="text-gray-300 text-sm ml-2">Banner Color</label>
                            <input type="color" className="p-0 border-none rounded cursor-pointer h-8 w-12 bg-transparent" value={form.banner_color} onChange={e => setForm({ ...form, banner_color: e.target.value })} />
                        </div>
                        <div className="md:col-span-2">
                            <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-primaryTechBlue text-white rounded-lg hover:bg-blue-600 transition">
                                <Save className="h-4 w-4" /> {editing ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="space-y-3">
                {events.map(ev => (
                    <div key={ev.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                        <div>
                            <h3 className="text-white font-medium">{ev.title}</h3>
                            <div className="flex gap-3 mt-1">
                                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300">{ev.category}</span>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${ev.status === 'Live' ? 'bg-green-500/20 text-green-300' : ev.status === 'Upcoming' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-gray-500/20 text-gray-400'}`}>{ev.status}</span>
                                <span className="text-xs text-gray-500">{ev.date ? new Date(ev.date).toLocaleDateString() : ''}</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => startEdit(ev)} className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition"><Edit3 className="h-4 w-4" /></button>
                            <button onClick={() => handleDelete(ev.id)} className="p-2 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-400 transition"><Trash2 className="h-4 w-4" /></button>
                        </div>
                    </div>
                ))}
                {events.length === 0 && <p className="text-gray-500 text-center py-8">No events yet. Click "Add Event" to get started.</p>}
            </div>
        </div>
    );
}

// ─── Team Manager ──────────────────────────────
function TeamManager() {
    const [members, setMembers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ name: '', role: '', team_name: 'Tech Team', photo_url: '', display_order: 0 });

    const load = async () => {
        const { data, error } = await supabase.from('team').select('*').order('display_order', { ascending: true });
        if (!error) setMembers(data);
    };

    useEffect(() => { load(); }, []);

    const resetForm = () => { setForm({ name: '', role: '', team_name: 'Tech Team', photo_url: '', display_order: 0 }); setEditing(null); setShowForm(false); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editing) {
            const { error } = await supabase.from('team').update(form).eq('id', editing);
            if (error) alert(error.message);
        } else {
            const { error } = await supabase.from('team').insert([form]);
            if (error) alert(error.message);
        }
        resetForm();
        load();
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this member?')) return;
        const { error } = await supabase.from('team').delete().eq('id', id);
        if (error) alert(error.message);
        load();
    };

    const startEdit = (m) => {
        setForm({ name: m.name, role: m.role, team_name: m.team_name, photo_url: m.photo_url || '', display_order: m.display_order || 0 });
        setEditing(m.id);
        setShowForm(true);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white">Team Members</h1>
                <button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-2 px-4 py-2 bg-primaryTechBlue text-white rounded-lg hover:bg-blue-600 transition text-sm">
                    <Plus className="h-4 w-4" /> Add Member
                </button>
            </div>

            {showForm && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-white">{editing ? 'Edit Member' : 'New Member'}</h2>
                        <button onClick={resetForm} className="text-gray-400 hover:text-white"><X className="h-5 w-5" /></button>
                    </div>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input className="admin-input" placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                        <input className="admin-input" placeholder="Role / Title" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} required />
                        <select className="admin-input" value={form.team_name} onChange={e => setForm({ ...form, team_name: e.target.value })}>
                            {['Tech Team', 'Website Enthusiasts', 'Event Planning & Management', 'Media Team', 'Marketing Team', 'PR Team', 'Sponsorship Team', 'HR Team'].map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <input className="admin-input" type="number" placeholder="Display Order" value={form.display_order} onChange={e => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })} />
                        <div className="flex items-center gap-4">
                            <ImageUpload onUploaded={(url) => setForm({ ...form, photo_url: url })} />
                            {form.photo_url && <span className="text-xs text-green-400 truncate max-w-[200px]">✓ Photo set</span>}
                        </div>
                        <div className="md:col-span-2">
                            <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-primaryTechBlue text-white rounded-lg hover:bg-blue-600 transition">
                                <Save className="h-4 w-4" /> {editing ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {members.map(m => (
                    <div key={m.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                {m.photo_url ? (
                                    <img src={m.photo_url} alt={m.name} className="h-12 w-12 rounded-full object-cover" />
                                ) : (
                                    <div className="h-12 w-12 rounded-full bg-primaryTechBlue/20 flex items-center justify-center text-primaryTechBlue font-bold">{m.name?.charAt(0)}</div>
                                )}
                                <div>
                                    <h3 className="text-white font-medium">{m.name}</h3>
                                    <p className="text-gray-400 text-sm">{m.role}</p>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 mt-1 inline-block">{m.team_name}</span>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                <button onClick={() => startEdit(m)} className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition"><Edit3 className="h-3.5 w-3.5" /></button>
                                <button onClick={() => handleDelete(m.id)} className="p-1.5 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-400 transition"><Trash2 className="h-3.5 w-3.5" /></button>
                            </div>
                        </div>
                    </div>
                ))}
                {members.length === 0 && <p className="text-gray-500 text-center py-8 col-span-full">No team members yet.</p>}
            </div>
        </div>
    );
}

// ─── Gallery Manager ──────────────────────────────
function GalleryManager() {
    const [images, setImages] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ title: '', category: 'Events', customCategory: '', url: '' });

    const load = async () => {
        const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
        if (!error) setImages(data);
    };

    useEffect(() => { load(); }, []);

    const resetForm = () => { setForm({ title: '', category: 'Events', customCategory: '', url: '' }); setShowForm(false); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.url) { alert('Please upload an image first.'); return; }

        const submitData = {
            caption: form.title,
            category: form.category === 'Other' ? form.customCategory : form.category,
            url: form.url,
        };

        const { error } = await supabase.from('gallery').insert([submitData]);
        if (error) alert(error.message);

        resetForm();
        load();
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this image?')) return;
        const { error } = await supabase.from('gallery').delete().eq('id', id);
        if (error) alert(error.message);
        load();
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white">Gallery</h1>
                <button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-2 px-4 py-2 bg-primaryTechBlue text-white rounded-lg hover:bg-blue-600 transition text-sm">
                    <Plus className="h-4 w-4" /> Add Image
                </button>
            </div>

            {showForm && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-white">Add Gallery Image</h2>
                        <button onClick={resetForm} className="text-gray-400 hover:text-white"><X className="h-5 w-5" /></button>
                    </div>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input className="admin-input" placeholder="Title/Caption" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
                        <div className="flex gap-2">
                            <select className="admin-input flex-1" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                                {['Events', 'Team Moments', 'Workshops', 'Technical Activities', 'Community Activities', 'Other'].map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            {form.category === 'Other' && (
                                <input className="admin-input flex-1" placeholder="New Category" value={form.customCategory} onChange={e => setForm({ ...form, customCategory: e.target.value })} required />
                            )}
                        </div>
                        <div className="flex items-center gap-4 md:col-span-2">
                            <ImageUpload onUploaded={(url) => setForm({ ...form, url: url })} />
                            {form.url && <span className="text-xs text-green-400">✓ Image uploaded</span>}
                        </div>
                        <div className="md:col-span-2">
                            <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-primaryTechBlue text-white rounded-lg hover:bg-blue-600 transition">
                                <Save className="h-4 w-4" /> Add to Gallery
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map(img => (
                    <div key={img.id} className="relative group rounded-xl overflow-hidden border border-white/10">
                        <img src={img.url} alt={img.caption} className="w-full h-40 object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                            <p className="text-white text-sm font-medium">{img.caption}</p>
                            <button onClick={() => handleDelete(img.id)} className="flex items-center gap-1 px-3 py-1 bg-red-500/80 text-white text-xs rounded-lg hover:bg-red-600 transition">
                                <Trash2 className="h-3 w-3" /> Delete
                            </button>
                        </div>
                    </div>
                ))}
                {images.length === 0 && <p className="text-gray-500 text-center py-8 col-span-full">No gallery images yet.</p>}
            </div>
        </div>
    );
}

// ─── Announcements Manager ──────────────────────────────
function AnnouncementsManager() {
    const [announcements, setAnnouncements] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ title: '', content: '', priority: 'Normal' });

    const load = async () => {
        const { data, error } = await supabase.from('announcements').select('*').order('created_at', { ascending: false });
        if (!error) setAnnouncements(data);
    };

    useEffect(() => { load(); }, []);

    const resetForm = () => { setForm({ title: '', content: '', priority: 'Normal' }); setEditing(null); setShowForm(false); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editing) {
            const { error } = await supabase.from('announcements').update(form).eq('id', editing);
            if (error) alert(error.message);
        } else {
            const { error } = await supabase.from('announcements').insert([form]);
            if (error) alert(error.message);
        }
        resetForm();
        load();
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this announcement?')) return;
        const { error } = await supabase.from('announcements').delete().eq('id', id);
        if (error) alert(error.message);
        load();
    };

    const startEdit = (a) => {
        setForm({ title: a.title, content: a.content, priority: a.priority });
        setEditing(a.id);
        setShowForm(true);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white">Announcements</h1>
                <button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-2 px-4 py-2 bg-primaryTechBlue text-white rounded-lg hover:bg-blue-600 transition text-sm">
                    <Plus className="h-4 w-4" /> Add Announcement
                </button>
            </div>

            {showForm && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-white">{editing ? 'Edit Announcement' : 'New Announcement'}</h2>
                        <button onClick={resetForm} className="text-gray-400 hover:text-white"><X className="h-5 w-5" /></button>
                    </div>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input className="admin-input" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
                        <select className="admin-input" value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
                            {['Low', 'Normal', 'High'].map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                        <textarea className="admin-input md:col-span-2" placeholder="Announcement Content" rows="4" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required />
                        <div className="md:col-span-2">
                            <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-primaryTechBlue text-white rounded-lg hover:bg-blue-600 transition">
                                <Save className="h-4 w-4" /> {editing ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="space-y-3">
                {announcements.map(a => (
                    <div key={a.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start justify-between">
                        <div>
                            <h3 className="text-white font-medium">{a.title}</h3>
                            <p className="text-gray-400 text-sm mt-1">{a.content}</p>
                            <div className="flex gap-3 mt-2">
                                <span className={`text-xs px-2 py-0.5 rounded-full ${a.priority === 'High' ? 'bg-red-500/20 text-red-300' : a.priority === 'Normal' ? 'bg-blue-500/20 text-blue-300' : 'bg-gray-500/20 text-gray-400'}`}>{a.priority} Priority</span>
                                <span className="text-xs text-gray-500">{new Date(a.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                            <button onClick={() => startEdit(a)} className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition"><Edit3 className="h-4 w-4" /></button>
                            <button onClick={() => handleDelete(a.id)} className="p-2 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-400 transition"><Trash2 className="h-4 w-4" /></button>
                        </div>
                    </div>
                ))}
                {announcements.length === 0 && <p className="text-gray-500 text-center py-8">No announcements yet.</p>}
            </div>
        </div>
    );
}

// ─── Main Dashboard Layout ──────────────────────────────
export default function AdminDashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate('/lrnit-admin');
            }
            setLoading(false);
        };
        checkAuth();
    }, [navigate]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        localStorage.removeItem('lrnit_user');
        navigate('/lrnit-admin');
    };

    const navItems = [
        { path: '/lrnit-admin/dashboard', label: 'Overview', icon: <LayoutDashboard className="h-5 w-5" /> },
        { path: '/lrnit-admin/dashboard/events', label: 'Events', icon: <Calendar className="h-5 w-5" /> },
        { path: '/lrnit-admin/dashboard/team', label: 'Team', icon: <Users className="h-5 w-5" /> },
        { path: '/lrnit-admin/dashboard/gallery', label: 'Gallery', icon: <Image className="h-5 w-5" /> },
        { path: '/lrnit-admin/dashboard/announcements', label: 'Announcements', icon: <LayoutDashboard className="h-5 w-5" /> },
    ];

    const isActive = (path) => location.pathname === path;

    if (loading) return <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center text-white">Loading...</div>;

    return (
        <div className="min-h-screen bg-[#0a0f1a] flex">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0d1420] border-r border-white/5 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6 border-b border-white/5">
                    <Link to="/" className="flex items-center gap-2">
                        <Cpu className="h-7 w-7 text-primaryTechBlue" />
                        <span className="text-xl font-bold text-white">LRN<span className="text-innovationPurple">it</span></span>
                    </Link>
                    <p className="text-xs text-gray-500 mt-1">Admin Panel</p>
                </div>

                <nav className="p-4 space-y-1">
                    {navItems.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setSidebarOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive(item.path) ? 'bg-primaryTechBlue/10 text-primaryTechBlue' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
                    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all w-full">
                        <LogOut className="h-5 w-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Mobile overlay */}
            {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

            {/* Main content */}
            <main className="flex-1 lg:ml-64">
                {/* Top bar */}
                <header className="sticky top-0 z-30 bg-[#0a0f1a]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
                    <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(true)}>
                        <Menu className="h-6 w-6" />
                    </button>
                    <div className="text-sm text-gray-400">
                        Welcome, <span className="text-white font-medium">{localStorage.getItem('lrnit_user') || 'Admin'}</span>
                    </div>
                </header>

                <div className="p-6">
                    <Routes>
                        <Route index element={<Overview />} />
                        <Route path="events" element={<EventsManager />} />
                        <Route path="team" element={<TeamManager />} />
                        <Route path="gallery" element={<GalleryManager />} />
                        <Route path="announcements" element={<AnnouncementsManager />} />
                    </Routes>
                </div>
            </main>

            {/* Global admin styles */}
            <style>{`
        .admin-input {
          width: 100%;
          padding: 0.625rem 1rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 0.5rem;
          color: white;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.15s;
        }
        .admin-input:focus {
          border-color: #1E63FF;
        }
        .admin-input::placeholder {
          color: #6b7280;
        }
        .admin-input option {
          background: #1a2332;
          color: white;
        }
      `}</style>
        </div>
    );
}
