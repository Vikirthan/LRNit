import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../supabaseClient';
import { CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';

export default function RegistrationPage() {
    const { formId } = useParams();
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const fetchForm = async () => {
            try {
                // Remove the events prefix since we're selecting from forms
                const { data, error } = await supabase
                    .from('forms')
                    .select('*, events(title, banner_color)')
                    .eq('id', formId)
                    .single();

                if (error) throw error;
                setForm(data);

                // Initialize form data
                const initial = {};
                data.fields.forEach(f => initial[f.label] = '');
                setFormData(initial);
            } catch (err) {
                console.error("Error fetching form:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchForm();
    }, [formId]);

    const handleChange = (label, value, isCheckbox = false) => {
        if (isCheckbox) {
            const current = formData[label] || [];
            const updated = current.includes(value)
                ? current.filter(v => v !== value)
                : [...current, value];
            setFormData(prev => ({ ...prev, [label]: updated }));
        } else {
            setFormData(prev => ({ ...prev, [label]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const { error } = await supabase
                .from('registrations')
                .insert([{
                    form_id: formId,
                    data: formData
                }]);

            if (error) throw error;
            setSubmitted(true);
        } catch (err) {
            alert("Error submitting registration: " + err.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-lightTechBackground">
            <Loader2 className="h-8 w-8 animate-spin text-primaryTechBlue" />
        </div>
    );

    if (!form) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-lightTechBackground p-4 text-center">
            <h1 className="text-2xl font-bold text-deepCircuitBlue mb-4">Form Not Found</h1>
            <p className="text-gray-600 mb-8">This registration link appears to be invalid or has been expired.</p>
            <Link to="/" className="text-primaryTechBlue hover:underline flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
        </div>
    );

    if (submitted) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-lightTechBackground p-4 text-center">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full"
            >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10" />
                </div>
                <h1 className="text-3xl font-display font-bold text-deepCircuitBlue mb-4">Thank You!</h1>
                <p className="text-gray-600 mb-8">Your registration for <strong>{form.events?.title || form.title}</strong> has been successfully submitted.</p>
                <Link to="/" className="inline-block px-8 py-3 bg-primaryTechBlue text-white rounded-xl font-medium hover:bg-deepCircuitBlue transition-all">
                    Return Home
                </Link>
            </motion.div>
        </div>
    );

    return (
        <div className="min-h-screen bg-lightTechBackground py-12 px-4 mt-20">
            <div className="max-w-2xl mx-auto">
                <Link to="/events" className="inline-flex items-center gap-2 text-gray-400 hover:text-primaryTechBlue mb-8 transition-colors">
                    <ArrowLeft className="h-4 w-4" /> Back to Events
                </Link>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white rounded-3xl shadow-xl overflow-hidden"
                >
                    {/* Header */}
                    <div
                        className="h-4 w-full"
                        style={{ backgroundColor: form.events?.banner_color || '#1E63FF' }}
                    />
                    <div className="p-8 md:p-12 border-b border-gray-100">
                        <h1 className="text-3xl font-display font-bold text-deepCircuitBlue mb-3">{form.title}</h1>
                        {form.description && (
                            <p className="text-gray-600 mb-4 whitespace-pre-wrap">{form.description}</p>
                        )}
                        {form.events?.title && (
                            <p className="text-gray-500 text-sm">Registering for: <span className="font-semibold text-primaryTechBlue">{form.events.title}</span></p>
                        )}
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
                        {form.fields.map(f => (
                            <div key={f.id} className="space-y-4">
                                <label className="block text-base font-semibold text-deepCircuitBlue">
                                    {f.label} {f.required && <span className="text-red-500">*</span>}
                                </label>

                                {f.type === 'textarea' && (
                                    <textarea
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primaryTechBlue/20 focus:border-primaryTechBlue outline-none transition-all"
                                        rows="4"
                                        placeholder="Your answer"
                                        required={f.required}
                                        value={formData[f.label] || ''}
                                        onChange={e => handleChange(f.label, e.target.value)}
                                    />
                                )}

                                {['text', 'email', 'number', 'tel', 'date', 'time'].includes(f.type) && (
                                    <input
                                        type={f.type}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primaryTechBlue/20 focus:border-primaryTechBlue outline-none transition-all"
                                        placeholder="Your answer"
                                        required={f.required}
                                        value={formData[f.label] || ''}
                                        onChange={e => handleChange(f.label, e.target.value)}
                                    />
                                )}

                                {f.type === 'select' && (
                                    <select
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primaryTechBlue/20 focus:border-primaryTechBlue outline-none transition-all"
                                        required={f.required}
                                        value={formData[f.label] || ''}
                                        onChange={e => handleChange(f.label, e.target.value)}
                                    >
                                        <option value="">Choose</option>
                                        {f.options?.map((opt, idx) => (
                                            <option key={idx} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                )}

                                {f.type === 'radio' && (
                                    <div className="space-y-3">
                                        {f.options?.map((opt, idx) => (
                                            <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                                                <input
                                                    type="radio"
                                                    name={f.label}
                                                    required={f.required}
                                                    className="w-5 h-5 text-primaryTechBlue border-gray-300 focus:ring-primaryTechBlue"
                                                    value={opt}
                                                    checked={formData[f.label] === opt}
                                                    onChange={e => handleChange(f.label, e.target.value)}
                                                />
                                                <span className="text-gray-700 group-hover:text-deepCircuitBlue transition-colors">{opt}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}

                                {f.type === 'checkbox' && (
                                    <div className="space-y-3">
                                        {f.options?.map((opt, idx) => (
                                            <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    className="w-5 h-5 rounded text-primaryTechBlue border-gray-300 focus:ring-primaryTechBlue"
                                                    value={opt}
                                                    checked={formData[f.label]?.includes(opt)}
                                                    onChange={e => handleChange(f.label, e.target.value, true)}
                                                />
                                                <span className="text-gray-700 group-hover:text-deepCircuitBlue transition-colors">{opt}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        <button
                            type="submit"
                            disabled={submitting}
                            className={`w-full py-4 bg-primaryTechBlue text-white rounded-xl font-bold text-lg shadow-lg shadow-primaryTechBlue/20 hover:bg-deepCircuitBlue hover:shadow-xl transition-all flex items-center justify-center gap-2 ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" /> Submitting...
                                </>
                            ) : (
                                'Submit Registration'
                            )}
                        </button>
                    </form>
                </motion.div>

                <p className="mt-8 text-center text-gray-400 text-xs">
                    This form was created via LRNit Admin. <br />
                    All data is handled securely for organization purposes.
                </p>
            </div>
        </div>
    );
}
