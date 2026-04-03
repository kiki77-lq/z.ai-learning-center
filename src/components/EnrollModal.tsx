import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface EnrollModalProps {
  open: boolean;
  onClose: () => void;
  /** Pre-filled certification level label, e.g. "L1 · AI 基础工程师" */
  defaultLevel?: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

const LEVELS = [
  { value: 'L1', label: 'L1 · AI 基础工程师（基础认证）' },
  { value: 'L2', label: 'L2 · Prompt 工程师（专项认证）' },
  { value: 'L3', label: 'L3 · AI 解决方案架构师（高级认证）' },
  { value: '', label: '暂未确定，稍后选择' },
];

export default function EnrollModal({ open, onClose, defaultLevel = '' }: EnrollModalProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [level, setLevel] = useState(defaultLevel);
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const nameRef = useRef<HTMLInputElement>(null);

  // Sync defaultLevel when prop changes
  useEffect(() => {
    setLevel(defaultLevel);
  }, [defaultLevel]);

  // Focus first field when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => nameRef.current?.focus(), 80);
    }
  }, [open]);

  // Reset on close
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setName('');
        setEmail('');
        setLevel(defaultLevel);
        setStatus('idle');
        setErrors({});
      }, 300);
    }
  }, [open, defaultLevel]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  function validate() {
    const errs: { name?: string; email?: string } = {};
    if (!name.trim()) errs.name = '请填写您的姓名';
    if (!email.trim()) {
      errs.email = '请填写邮箱地址';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = '请输入有效的邮箱格式';
    }
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus('submitting');

    try {
      const formData = new FormData();
      formData.append('姓名', name.trim());
      formData.append('邮箱', email.trim());
      formData.append('认证等级', level || '暂未确定');
      formData.append('提交时间', new Date().toLocaleString('zh-CN'));
      // FormSubmit: _subject, _captcha=false, _template=table for readable emails
      formData.append('_subject', `新报名：${name.trim()} · ${level || '等级待定'}`);
      formData.append('_captcha', 'false');
      formData.append('_template', 'table');

      const res = await fetch('https://formsubmit.co/YOUR_EMAIL_HERE', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  const inputBase = `w-full h-10 px-3 text-sm rounded-md border outline-none transition-colors focus:ring-2 ${
    isDark
      ? 'bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20'
      : 'bg-white border-[#D1D5DB] text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/15'
  }`;

  const labelBase = `block text-xs font-medium mb-1.5 ${isDark ? 'text-foreground' : 'text-slate-700'}`;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="enroll-title"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed z-50 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 top-[10vh] sm:w-[480px] rounded-xl shadow-xl border ${
              isDark
                ? 'bg-card border-border'
                : 'bg-white border-[#E4E7EC]'
            }`}
          >

            {/* Header */}
            <div className={`flex items-start justify-between px-6 pt-6 pb-4 border-b ${isDark ? 'border-border' : 'border-[#F0F2F5]'}`}>
              <div>
                <h2 id="enroll-title" className={`text-base font-semibold ${isDark ? 'text-foreground' : 'text-slate-800'}`}>
                  报名备考
                </h2>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-muted-foreground' : 'text-slate-500'}`}>
                  填写信息后，学习中心将发送备考资料与报名指引至您的邮箱
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="关闭"
                className={`ml-4 mt-0.5 p-1 rounded-md transition-colors ${
                  isDark ? 'text-muted-foreground hover:text-foreground hover:bg-secondary' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="py-8 flex flex-col items-center text-center gap-3"
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDark ? 'bg-emerald-500/15' : 'bg-emerald-50'}`}>
                      <CheckCircle className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${isDark ? 'text-foreground' : 'text-slate-800'}`}>
                        报名信息已提交
                      </p>
                      <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-muted-foreground' : 'text-slate-500'}`}>
                        我们将在 1—2 个工作日内向 <span className="font-medium text-blue-500">{email}</span> 发送备考资料与后续指引，请留意查收。
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className={`mt-2 h-9 px-5 text-sm font-medium rounded-md border transition-colors ${
                        isDark
                          ? 'border-border text-foreground hover:bg-background'
                          : 'border-[#D1D5DB] text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      关闭
                    </button>
                  </motion.div>
                ) : status === 'error' ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="py-8 flex flex-col items-center text-center gap-3"
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDark ? 'bg-red-500/15' : 'bg-red-50'}`}>
                      <AlertCircle className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${isDark ? 'text-foreground' : 'text-slate-800'}`}>
                        提交失败，请稍后重试
                      </p>
                      <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-muted-foreground' : 'text-slate-500'}`}>
                        网络出现问题，您也可以直接发送邮件联系我们完成报名。
                      </p>
                    </div>
                    <button
                      onClick={() => setStatus('idle')}
                      className={`mt-2 h-9 px-5 text-sm font-medium rounded-md transition-colors ${
                        isDark
                          ? 'bg-primary text-white hover:bg-primary/90'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      重新填写
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    noValidate
                    className="space-y-4"
                  >
                    {/* Name */}
                    <div>
                      <label htmlFor="enroll-name" className={labelBase}>
                        姓名 <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="enroll-name"
                        ref={nameRef}
                        type="text"
                        placeholder="请输入您的真实姓名"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        className={`${inputBase} ${errors.name ? (isDark ? 'border-red-500/60' : 'border-red-400') : ''}`}
                        autoComplete="name"
                      />
                      {errors.name && (
                        <p className="flex items-center gap-1 mt-1 text-xs text-red-500">
                          <AlertCircle className="w-3 h-3" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="enroll-email" className={labelBase}>
                        邮箱 <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="enroll-email"
                        type="email"
                        placeholder="用于接收备考资料和报名确认"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        className={`${inputBase} ${errors.email ? (isDark ? 'border-red-500/60' : 'border-red-400') : ''}`}
                        autoComplete="email"
                      />
                      {errors.email && (
                        <p className="flex items-center gap-1 mt-1 text-xs text-red-500">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Level */}
                    <div>
                      <label htmlFor="enroll-level" className={labelBase}>
                        报考等级
                      </label>
                      <select
                        id="enroll-level"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        className={`${inputBase} cursor-pointer`}
                      >
                        {LEVELS.map((l) => (
                          <option key={l.value} value={l.value}>
                            {l.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Privacy note */}
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-muted-foreground' : 'text-slate-400'}`}>
                      提交即表示您同意智谱学习中心通过上述邮箱与您联系。我们不会将您的信息用于任何商业推广。
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-2 pt-1">
                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className={`flex-1 h-10 text-sm font-semibold rounded-md transition-colors disabled:opacity-60 ${
                          isDark
                            ? 'bg-primary text-white hover:bg-primary/90'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {status === 'submitting' ? '提交中…' : '提交报名信息'}
                      </button>
                      <button
                        type="button"
                        onClick={onClose}
                        className={`h-10 px-5 text-sm font-medium rounded-md border transition-colors ${
                          isDark
                            ? 'border-border text-foreground hover:bg-background'
                            : 'border-[#D1D5DB] text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        取消
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
