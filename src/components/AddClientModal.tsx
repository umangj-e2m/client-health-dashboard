import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, User, Mail, Globe, BarChart2, Search, Megaphone,
  MapPin, Link2, Loader2, Plus, ChevronDown
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   Form data type
 ───────────────────────────────────────────────────────────── */

export interface NewClientFormData {
  name: string;
  email: string;
  websiteUrl: string;
  ga4PrimaryId: string;
  gscPrimaryId: string;
  gAdsPrimaryId: string;
  gbpPrimaryId: string;
  clickupFolderUrl: string;
}

/* ─────────────────────────────────────────────────────────────
   Mock ID options
 ───────────────────────────────────────────────────────────── */

export const GA4_ID_OPTIONS = [
  'GA4-78219402 - exploremedia.com',
  'GA4-98213892 - staging.exploremedia.com',
  'GA4-10294829 - exploremedia.org'
];

export const GSC_ID_OPTIONS = [
  'sc-domain:exploremedia.com',
  'https://www.exploremedia.com/',
  'https://exploremedia.com/'
];

export const GADS_ID_OPTIONS = [
  '839-291-0392 (Explore Media - Master)',
  '291-039-4829 (Explore Media - Local)',
  '382-910-4820 (Explore Media - Sandbox)'
];

export const GBP_ID_OPTIONS = [
  'Loc-8291039 (Explore Media — Headquarters)',
  'Loc-3920193 (Explore Media — Chicago Branch)',
  'Loc-1029302 (Explore Media — LA Office)'
];

const DEFAULT_FORM: NewClientFormData = {
  name: '',
  email: '',
  websiteUrl: '',
  ga4PrimaryId: GA4_ID_OPTIONS[0],
  gscPrimaryId: GSC_ID_OPTIONS[0],
  gAdsPrimaryId: GADS_ID_OPTIONS[0],
  gbpPrimaryId: GBP_ID_OPTIONS[0],
  clickupFolderUrl: '',
};

/* ─────────────────────────────────────────────────────────────
   Reusable inputs
 ───────────────────────────────────────────────────────────── */

function FieldLabel({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 mb-1.5">
      <span className="text-slate-400">{icon}</span>
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</label>
    </div>
  );
}

function TextInput({
  id, placeholder, value, onChange, type = 'text',
}: {
  id: string; placeholder: string; value: string;
  onChange: (v: string) => void; type?: string;
}) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm text-[#142f45] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#142f45]/15 focus:border-[#142f45] focus:bg-white transition-all shadow-sm"
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   Integration Row Component
 ───────────────────────────────────────────────────────────── */

interface IntegrationRowProps {
  label: string;
  icon: React.ReactNode;
  color: string;
  primaryId: string;
  onPrimaryIdChange: (id: string) => void;
  idOptions: string[];
  isLast?: boolean;
}

function IntegrationRow({
  label,
  icon,
  color,
  primaryId,
  onPrimaryIdChange,
  idOptions,
  isLast = false,
}: IntegrationRowProps) {
  return (
    <div className={`px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
      isLast ? '' : 'border-b border-slate-100'
    }`}>
      {/* Tool info */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-slate-50 border border-slate-100 text-[#142f45] shadow-sm">
          {icon}
        </div>
        <span className="font-bold text-xs text-[#142f45] uppercase tracking-wider">{label}</span>
      </div>

      {/* Connection Dropdown */}
      <div className="relative w-full sm:w-80">
        <select
          value={primaryId}
          onChange={e => onPrimaryIdChange(e.target.value)}
          className="w-full text-xs font-semibold pl-3.5 pr-9 py-2.5 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#142f45]/10 focus:border-[#142f45] transition-all cursor-pointer text-[#142f45] appearance-none"
        >
          {idOptions.map(opt => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main modal component
 ───────────────────────────────────────────────────────────── */

interface AddClientModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: NewClientFormData) => void;
}

export default function AddClientModal({ open, onClose, onSave }: AddClientModalProps) {
  const [form, setForm] = useState<NewClientFormData>(DEFAULT_FORM);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof NewClientFormData, string>>>({});

  useEffect(() => {
    if (open) { setForm(DEFAULT_FORM); setErrors({}); setSaving(false); }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const setField = <K extends keyof NewClientFormData>(key: K, val: NewClientFormData[K]) => {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const errs: typeof errors = {};
    if (!form.name.trim())        errs.name       = 'Client name is required';
    if (!form.email.trim())       errs.email      = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.websiteUrl.trim())  errs.websiteUrl = 'Website URL is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    await new Promise(r => setTimeout(r, 400));
    onSave(form);
    setSaving(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-slate-900/20 backdrop-blur-[2px]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: 'spring', stiffness: 420, damping: 38 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none px-4 py-6"
          >
            <div
              className="pointer-events-auto w-full max-w-2xl bg-white rounded-3xl shadow-[0_20px_50px_rgba(20,47,69,0.15)] border border-slate-100 overflow-hidden flex flex-col"
              style={{ maxHeight: '90vh' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-[#f8fafc]/50 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#142f45] flex items-center justify-center shadow-md">
                    <Plus size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold text-[#142f45] tracking-tight">Add New Client</h2>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">Initialize a client account and configure connected data channels</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:text-[#142f45] hover:bg-slate-50 transition-all cursor-pointer border-0 bg-transparent"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body (scrollable) */}
              <form id="add-client-form" onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-6 py-5 space-y-6">

                {/* Section: Client Info */}
                <div>
                  <div className="flex items-center gap-2 text-xs md:text-sm font-extrabold text-[#142f45] uppercase tracking-wider mb-3.5">
                    <User size={12} />
                    Client Profile Information
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <FieldLabel icon={<User size={12} />} label="Client Name" />
                      <TextInput id="field-client-name" placeholder="e.g. Pure Air Solutions"
                        value={form.name} onChange={v => setField('name', v)} />
                      {errors.name && <p className="text-xs text-rose-600 mt-1 font-semibold">{errors.name}</p>}
                    </div>
                    <div>
                      <FieldLabel icon={<Mail size={12} />} label="Contact Email Address" />
                      <TextInput id="field-client-email" type="email" placeholder="contact@client.com"
                        value={form.email} onChange={v => setField('email', v)} />
                      {errors.email && <p className="text-xs text-rose-600 mt-1 font-semibold">{errors.email}</p>}
                    </div>
                    <div>
                      <FieldLabel icon={<Globe size={12} />} label="Website Domain URL" />
                      <TextInput id="field-client-website" placeholder="https://client.com"
                        value={form.websiteUrl} onChange={v => setField('websiteUrl', v)} />
                      {errors.websiteUrl && <p className="text-xs text-rose-600 mt-1 font-semibold">{errors.websiteUrl}</p>}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-100" />

                {/* Section: Dashboard Integrations */}
                <div>
                  <div className="flex items-center gap-2 text-xs md:text-sm font-extrabold text-[#142f45] uppercase tracking-wider mb-1.5">
                    <BarChart2 size={12} />
                    Active Connection Channels
                  </div>
                  <p className="text-xs text-slate-400 mb-4 font-medium">
                    Map connected properties and accounts for standard metric reports
                  </p>

                  <div className="rounded-2xl border border-slate-100 bg-white overflow-hidden shadow-[0_4px_20px_rgba(20,47,69,0.02)]">
                    {/* GA4 */}
                    <IntegrationRow
                      label="GA4 — Google Analytics"
                      icon={<BarChart2 size={16} />}
                      color="#e8710a"
                      primaryId={form.ga4PrimaryId}
                      onPrimaryIdChange={id => setField('ga4PrimaryId', id)}
                      idOptions={GA4_ID_OPTIONS}
                    />

                    {/* GSC */}
                    <IntegrationRow
                      label="GSC — Search Console"
                      icon={<Search size={16} />}
                      color="#1a73e8"
                      primaryId={form.gscPrimaryId}
                      onPrimaryIdChange={id => setField('gscPrimaryId', id)}
                      idOptions={GSC_ID_OPTIONS}
                    />

                    {/* Google Ads */}
                    <IntegrationRow
                      label="Google Ads"
                      icon={<Megaphone size={16} />}
                      color="#34a853"
                      primaryId={form.gAdsPrimaryId}
                      onPrimaryIdChange={id => setField('gAdsPrimaryId', id)}
                      idOptions={GADS_ID_OPTIONS}
                    />

                    {/* GBP */}
                    <IntegrationRow
                      label="GBP — Business Profile"
                      icon={<MapPin size={16} />}
                      color="#ea4335"
                      primaryId={form.gbpPrimaryId}
                      onPrimaryIdChange={id => setField('gbpPrimaryId', id)}
                      idOptions={GBP_ID_OPTIONS}
                      isLast={true}
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-100" />

                {/* Section: ClickUp */}
                <div>
                  <div className="flex items-center gap-2 text-xs md:text-sm font-extrabold text-[#142f45] uppercase tracking-wider mb-3.5">
                    <Link2 size={12} />
                    Project Management Workspace
                  </div>
                  <FieldLabel icon={<Link2 size={12} />} label="ClickUp Folder Directory URL" />
                  <TextInput id="field-clickup-url" placeholder="https://app.clickup.com/…"
                    value={form.clickupFolderUrl} onChange={v => setField('clickupFolderUrl', v)} />
                </div>

              </form>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/30 flex-shrink-0">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4.5 py-2 text-xs md:text-sm font-semibold text-slate-500 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-slate-800 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="add-client-form"
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2 text-xs md:text-sm font-bold text-white bg-[#142f45] rounded-xl hover:bg-[#0d1f2d] disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-sm cursor-pointer border-0"
                >
                  {saving ? (
                    <><Loader2 size={14} className="animate-spin" />Saving Account…</>
                  ) : (
                    <><Plus size={14} />Add Client</>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
