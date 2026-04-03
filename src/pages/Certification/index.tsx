import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, type Variants, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle, BookOpen, BadgeCheck, Shield, TrendingUp, Globe, ChevronRight, ChevronDown, Zap, Target, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import EnrollModal from '@/components/EnrollModal';

// ─── TextPressure ───
interface TextPressureProps { text: string; textColor?: string; className?: string; }
function TextPressure({ text, textColor = '#111827', className = '' }: TextPressureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);
  const rafRef = useRef<number>(0);
  const chars = text.split('');
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => { cursorRef.current.x = e.clientX; cursorRef.current.y = e.clientY; };
    window.addEventListener('mousemove', handleMouseMove);
    if (containerRef.current) {
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = left + width / 2; mouseRef.current.y = top + height / 2;
      cursorRef.current.x = mouseRef.current.x; cursorRef.current.y = mouseRef.current.y;
    }
    const dist = (a: {x:number;y:number}, b: {x:number;y:number}) => Math.sqrt((b.x-a.x)**2 + (b.y-a.y)**2);
    const getAttr = (d: number, mx: number, mn: number, mv: number) => Math.max(mn, mv - Math.abs((mv * d) / mx) + mn);
    const animate = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;
      if (containerRef.current) {
        const r = containerRef.current.getBoundingClientRect();
        const maxDist = r.width / 2;
        spansRef.current.forEach(span => {
          if (!span) return;
          const sr = span.getBoundingClientRect();
          const d = dist(mouseRef.current, { x: sr.x + sr.width/2, y: sr.y + sr.height/2 });
          span.style.fontWeight = String(Math.floor(getAttr(d, maxDist, 100, 900)));
          span.style.letterSpacing = `${(Math.floor(getAttr(d, maxDist, 95, 100)) - 100) * 0.01}em`;
        });
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => { window.removeEventListener('mousemove', handleMouseMove); cancelAnimationFrame(rafRef.current); };
  }, []);
  return (
    <div ref={containerRef} className={className} style={{ display: 'inline-block' }}>
      {chars.map((char, i) => (
        <span key={i} ref={el => { spansRef.current[i] = el; }}
          style={{ display: 'inline-block', color: textColor, transition: 'font-weight 0.05s ease, letter-spacing 0.05s ease', whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
}

// ─── AnimatedNumber ───
function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 1800; const startTime = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1);
      setDisplay(Math.floor((1 - (1-p)**3) * value));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);
  return <span ref={ref}>{display.toLocaleString()}{suffix}</span>;
}

// ─── Color System: 智谱蓝 ───
const BLUE = '#2563EB';
const BLUE_DARK = '#1E40AF';
const CYAN = '#06B6D4';
const BLUE_BG = '#EFF6FF';
const BLUE_BORDER = '#BFDBFE';
const BLUE_GLOW = 'rgba(37,99,235,0.25)';

// ─── Data ───
const certLevels = [
  {
    level: 'L1', num: '01', label: '基础认证', title: 'AI Fundamentals', titleZh: 'AI 基础工程师',
    tagEn: 'FOUNDATION', duration: '4–6 Weeks', examFormat: 'Written + Project',
    audience: '应届生 / 转行者', careerTarget: 'AI 初级工程师 · 数据分析师',
    skills: ['Python 数据处理', 'ML 基础算法', 'AI API 集成', '模型评估调试', 'Prompt 工程'],
    prerequisites: ['无特殊前置要求', '基础编程逻辑理解'],
    accent: BLUE, accentBg: BLUE_BG, isPro: false,
  },
  {
    level: 'L2', num: '02', label: '专业认证', title: 'AI Engineering', titleZh: 'AI 应用工程师',
    tagEn: 'PROFESSIONAL', duration: '8–12 Weeks', examFormat: 'System Design + Review',
    audience: '在职工程师 / 技术负责人', careerTarget: 'AI 工程师 · 解决方案架构师',
    skills: ['LLM 应用开发', 'RAG 系统构建', '多 Agent 协作', 'AI 生产部署', '工程化测评'],
    prerequisites: ['持有 L1 证书或同等能力', '1 年以上编程经验'],
    accent: '#60A5FA', accentBg: 'rgba(37,99,235,0.12)', isPro: true,
  },
  {
    level: 'L3', num: '03', label: '专家认证', title: 'AI Research', titleZh: 'AI 研究工程师',
    tagEn: 'EXPERT', duration: '12–16 Weeks', examFormat: 'Project Review + Defense',
    audience: '高级工程师 / 研究员', careerTarget: 'AI 架构师 · 首席研究员',
    skills: ['大模型微调训练', '分布式 AI 系统', '研究方法论', '技术创新领导力', '学术成果转化'],
    prerequisites: ['持有 L2 证书或同等能力', '研究项目实战经验'],
    accent: BLUE_DARK, accentBg: BLUE_BG, isPro: false,
  },
  {
    level: 'L4', num: '04', label: '专家认证', title: 'AI Research', titleZh: 'AI 研究工程师',
    tagEn: 'EXPERT', duration: '12–16 Weeks', examFormat: 'Project Review + Defense',
    audience: '高级工程师 / 研究员', careerTarget: 'AI 架构师 · 首席研究员',
    skills: ['大模型微调训练', '分布式 AI 系统', '研究方法论', '技术创新领导力', '学术成果转化'],
    prerequisites: ['持有 L2 证书或同等能力', '研究项目实战经验'],
    accent: BLUE_DARK, accentBg: BLUE_BG, isPro: false,
  },
];

const values = [
  { icon: BadgeCheck, title: '行业权威认可', desc: '与 340+ 家科技企业联合制定标准，认证在国内 AI 行业具有广泛公信力。' },
  { icon: Shield, title: '严格评估体系', desc: '结合理论笔试与真实项目评审，确保每一位持证者具备可交付的实战能力。' },
  { icon: TrendingUp, title: '薪资溢价明显', desc: '持证者平均薪资较同级别未持证工程师高出 23%，晋升速度快 1.6 倍。' },
  { icon: Globe, title: '国际互认网络', desc: '与亚太 12 个国家 AI 认证体系建立互认机制，支持跨国就业与发展。' },
];

const steps = [
  { icon: Target, num: '01', title: '建立专属学习路径', desc: '根据个人基础和目标，智能生成最优培训方案，涵盖从理论到实战的全方位课程。' },
  { icon: BookOpen, num: '02', title: '系统备考', desc: '通过专项课程、题库和模拟测试，与业界资深导师一对一高效完成考前准备。' },
  { icon: Zap, num: '03', title: '参加考核', desc: '完成在线笔试与项目实战评审，由专家委员会综合评定，全程透明可追溯。' },
  { icon: Trophy, num: '04', title: '获得认证', desc: '颁发电子证书与区块链存证，永久有效，随时核验，接入 340+ 企业人才库。' },
];

const logos = ['华为云','阿里云','腾讯云','百度智能云','京东科技','字节跳动','美团','滴滴','快手','商汤科技'];

// ─── CertStackCards (Hero visual) ───
const certStack = [
  { level: 'L1', name: 'AI 基础工程师', summary: '掌握核心工具与基础算法', color: BLUE, border: BLUE_BORDER, tagBg: BLUE_BG, tagColor: BLUE },
  { level: 'L2', name: 'AI 应用工程师', summary: '构建 LLM 应用与 RAG 系统', color: BLUE_DARK, border: '#93C5FD', tagBg: '#DBEAFE', tagColor: BLUE_DARK },
  { level: 'L3', name: 'AI 研究工程师', summary: '主导大模型训练与分布式架构', color: BLUE_DARK, border: '#93C5FD', tagBg: '#DBEAFE', tagColor: BLUE_DARK },
];

function CertStackCards() {
    const [hovered, setHovered] = useState(false);
  return (
    <div className="relative animate-floating" style={{ width: 360, height: 440 }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="absolute left-0 right-0 rounded-[32px] transition-all duration-500"
        style={{ top: hovered ? 32 : 24, bottom: 0, marginLeft: hovered ? 22 : 16, marginRight: hovered ? 22 : 16,
          backgroundColor: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(12px)',
          border: `1px solid ${certStack[2].border}`, boxShadow: '0 2px 12px rgba(0,0,0,0.03)', zIndex: 1,
          transform: hovered ? 'rotate(2.5deg)' : 'rotate(2deg)', transformOrigin: 'bottom center', opacity: hovered ? 0.88 : 0.7 }}>
        <div className="absolute top-5 left-5">
          <span className="text-[10px] font-bold tracking-[0.14em] px-2.5 py-1 rounded-full" style={{ background: certStack[2].tagBg, color: certStack[2].tagColor }}>L3 · EXPERT</span>
        </div>
      </div>
      <div className="absolute left-0 right-0 rounded-[32px] transition-all duration-500"
        style={{ top: hovered ? 16 : 12, bottom: 0, marginLeft: hovered ? 11 : 8, marginRight: hovered ? 11 : 8,
          backgroundColor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)',
          border: `1px solid ${certStack[1].border}`, boxShadow: '0 4px 20px rgba(0,0,0,0.04)', zIndex: 2,
          transform: hovered ? 'rotate(-1.5deg)' : 'rotate(-1deg)', transformOrigin: 'bottom center', opacity: hovered ? 0.94 : 0.82 }}>
        <div className="absolute top-5 left-5">
          <span className="text-[10px] font-bold tracking-[0.14em] px-2.5 py-1 rounded-full" style={{ background: certStack[1].tagBg, color: certStack[1].tagColor }}>L2 · PRO</span>
        </div>
      </div>
      <div className="absolute inset-0 rounded-[32px] flex flex-col transition-all duration-500"
        style={{ backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)',
          border: `1px solid ${certStack[0].border}`,
          boxShadow: hovered ? `0 20px 60px rgba(37,99,235,0.12), 0 4px 16px rgba(0,0,0,0.05)` : '0 8px 32px rgba(0,0,0,0.06)',
          zIndex: 3, transform: hovered ? 'translateY(-6px)' : 'translateY(0)' }}>
        <div className="flex items-start justify-between p-6 pb-4">
          <div>
            <span className="text-[10px] font-bold tracking-[0.14em] px-2.5 py-1 rounded-full inline-block mb-3" style={{ background: certStack[0].tagBg, color: certStack[0].tagColor }}>
              L1 · FOUNDATION
            </span>
            <h3 className="text-[17px] font-extrabold tracking-[-0.02em] text-slate-900">认证路径总览</h3>
            <p className="text-[12px] mt-1 text-slate-400">三级体系 · 覆盖 AI 职业全周期</p>
          </div>
        </div>
        <div className="mx-6 h-px bg-slate-100" />
        <div className="flex-1 px-6 py-4 space-y-3">
          {certStack.map(c => (
            <div key={c.level} className="flex items-center gap-3 group/row cursor-default">
              <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-md shrink-0" style={{ backgroundColor: c.tagBg, color: c.tagColor }}>{c.level}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold truncate text-slate-900">{c.name}</p>
                <p className="text-[11px] truncate text-slate-400">{c.summary}</p>
              </div>
              <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-0 group-hover/row:opacity-100 transition-opacity text-slate-400" />
            </div>
          ))}
        </div>
        <div className="mx-6 mb-4">
          <div className="h-1.5 rounded-full overflow-hidden bg-slate-100">
            <div className="h-full rounded-full" style={{ width: '33%', background: `linear-gradient(90deg, ${BLUE}, ${CYAN})` }} />
          </div>
        </div>
        <div className="px-6 pb-6">
          <a href="#scroll-stack"
            className="w-full h-11 rounded-2xl text-[13px] font-bold inline-flex items-center justify-center gap-2 transition-all duration-300 hover:opacity-90 text-white"
            style={{ background: BLUE, boxShadow: `0 4px 16px ${BLUE_GLOW}` }}>
            查看认证路径 <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── ScrollStack Card ───
function ScrollStackCard({ cert, index, openModal }: { cert: typeof certLevels[0]; index: number; openModal: (l?: string) => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'start start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 1]);

  const dark = cert.isPro;
  const bg = dark ? '#0f172a' : 'rgba(255, 255, 255, 0.85)';
  const textMain = dark ? '#f8fafc' : '#111827';
  const textSub = dark ? '#94a3b8' : '#64748b';
  const textMuted = dark ? '#475569' : '#94a3b8';
  const borderColor = dark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.6)';
  const tagColor = dark ? '#93C5FD' : cert.accent;
  const tagBg = dark ? 'rgba(37,99,235,0.15)' : cert.accentBg;
  const skillBg = dark ? 'rgba(37,99,235,0.12)' : cert.accentBg;
  const skillColor = dark ? '#93C5FD' : cert.accent;
  const dividerColor = dark ? 'rgba(255,255,255,0.06)' : '#f1f5f9';

  return (
    <div ref={cardRef} className="mb-8 lg:mb-10" style={{ position: 'sticky', top: `${80 + index * 20}px`, zIndex: 10 + index }}>
      <motion.div
        className="relative overflow-hidden rounded-[32px] p-8 lg:p-12"
        style={{
          scale, opacity, background: bg,
          backdropFilter: dark ? 'none' : 'blur(16px)',
          border: `1px solid ${borderColor}`,
          boxShadow: dark
            ? '0 30px 60px -12px rgba(0,0,0,0.4), 0 20px 25px -5px rgba(0,0,0,0.15)'
            : '0 20px 25px -5px rgba(0,0,0,0.05), 0 10px 10px -5px rgba(0,0,0,0.02), inset 0 0 0 1px rgba(255,255,255,0.4)',
          minHeight: 480,
        }}>

        <span className="absolute -top-5 right-4 lg:right-8 font-black select-none pointer-events-none"
          style={{ fontSize: 'clamp(140px, 14vw, 200px)', lineHeight: 1, color: dark ? BLUE : BLUE, opacity: 0.05 }}>
          {cert.num}
        </span>

        <div className="relative grid lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-3 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-bold tracking-[0.16em] uppercase px-3 py-1.5 rounded-xl"
                style={{ color: tagColor, backgroundColor: tagBg, fontFamily: "'JetBrains Mono', monospace" }}>
                {cert.tagEn}
              </span>
              <span className="text-[10px] font-bold tracking-[0.12em] uppercase" style={{ color: textMuted, fontFamily: "'JetBrains Mono', monospace" }}>
                {cert.level} Certification
              </span>
            </div>

            <h3 className="font-extrabold tracking-[-0.03em] leading-tight mb-2"
              style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', color: textMain }}>
              {cert.titleZh}
            </h3>
            <p className="text-[13px] tracking-[0.04em] mb-6" style={{ color: textMuted, fontFamily: "'JetBrains Mono', monospace" }}>
              {cert.title}
            </p>

            <div className="mb-6" style={{ height: 1, backgroundColor: dividerColor }} />

            <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6">
              {[
                { k: 'DURATION', v: cert.duration }, { k: 'EXAM', v: cert.examFormat },
                { k: 'AUDIENCE', v: cert.audience }, { k: 'CAREER', v: cert.careerTarget },
              ].map(m => (
                <div key={m.k}>
                  <p className="text-[9px] font-bold tracking-[0.18em] uppercase mb-1" style={{ color: textMuted, fontFamily: "'JetBrains Mono', monospace" }}>{m.k}</p>
                  <p className="text-[12px] font-semibold leading-snug" style={{ color: textSub,
                    fontFamily: (m.k === 'DURATION' || m.k === 'EXAM') ? "'JetBrains Mono', monospace" : 'inherit' }}>
                    {m.v}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-6">
              <button type="button" onClick={() => openModal(cert.level)}
                className="inline-flex items-center gap-2 h-12 px-7 rounded-2xl text-[13px] font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-white"
                style={{ background: BLUE, boxShadow: `0 8px 30px ${BLUE_GLOW}` }}>
                报名 {cert.level} 认证 <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="rounded-[24px] p-6 flex-1"
              style={{ backgroundColor: dark ? 'rgba(255,255,255,0.04)' : 'rgba(248,250,252,0.8)',
                border: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : BLUE_BORDER + '60'}` }}>
              <p className="text-[9px] font-bold tracking-[0.18em] uppercase mb-4"
                style={{ color: textMuted, fontFamily: "'JetBrains Mono', monospace" }}>Core Skills</p>
              <div className="flex flex-wrap gap-2">
                {cert.skills.map(s => (
                  <span key={s} className="text-[11px] font-semibold px-3 py-1.5 rounded-xl transition-all duration-300 hover:scale-105"
                    style={{ color: skillColor, backgroundColor: skillBg }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] p-6"
              style={{ backgroundColor: dark ? 'rgba(255,255,255,0.04)' : 'rgba(248,250,252,0.8)',
                border: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : BLUE_BORDER + '60'}` }}>
              <p className="text-[9px] font-bold tracking-[0.18em] uppercase mb-3"
                style={{ color: textMuted, fontFamily: "'JetBrains Mono', monospace" }}>Prerequisites</p>
              <ul className="space-y-2">
                {cert.prerequisites.map(p => (
                  <li key={p} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: tagColor }} />
                    <span className="text-[12px] leading-[1.55]" style={{ color: textSub }}>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Animation variants ───
const fadeUp: Variants = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22,1,0.36,1] } } };
const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

// ─── Main ───
export default function Certification() {
  const [modalOpen, setModalOpen] = useState(false);
  const [enrollLevel, setEnrollLevel] = useState<string | undefined>();
  const openModal = useCallback((level?: string) => { setEnrollLevel(level); setModalOpen(true); }, []);

  return (
    <div className="min-h-screen relative" style={{ fontFamily: "'Inter', system-ui, sans-serif", color: '#111827' }}>

      {/* Global dot grid */}
      <div className="fixed inset-0 pointer-events-none -z-10"
        style={{ backgroundColor: '#fcfcfd',
          backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
          backgroundSize: '40px 40px' }} />

      {/* ═══ § 1  HERO ═══ */}
      <section className="relative overflow-hidden" style={{ minHeight: '92vh' }}>
        {/* Blue + cyan mesh gradient */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: `
          radial-gradient(ellipse 70% 50% at 15% 25%, rgba(37,99,235,0.06) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 85% 35%, rgba(6,182,212,0.05) 0%, transparent 55%),
          radial-gradient(ellipse 60% 35% at 50% 85%, rgba(37,99,235,0.04) 0%, transparent 50%),
          linear-gradient(180deg, #F8FBFF 0%, #EFF6FF 40%, #F8FAFC 100%)
        ` }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20 lg:pt-36 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <motion.div initial="hidden" animate="visible" variants={stagger}>
                <motion.div variants={fadeUp} className="mb-8">
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] mb-5"
                    style={{ color: BLUE, fontFamily: "'JetBrains Mono', monospace" }}>AI Certification System</p>
                  <div style={{ fontSize: 'clamp(52px, 7vw, 80px)', lineHeight: 1.02, letterSpacing: '0.09em', fontWeight: 900 }}>
                    <TextPressure text="成为经过" textColor="#111827" className="block mb-1" />
                    <TextPressure text="认证的" textColor="#111827" className="block mb-1" />
                    <span className="block" style={{ background: `linear-gradient(135deg, ${BLUE}, ${CYAN})`,
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      AI 工程师
                    </span>
                  </div>
                </motion.div>

                <motion.p variants={fadeUp} className="text-[17px] leading-[1.8] max-w-xl mb-12 text-slate-500">
                  智谱学习中心提供三级 AI 工程师认证，与 340+ 家企业联合制定标准。
                  持证工程师平均薪资溢价 23%，被国内外顶级 AI 团队广泛认可。
                </motion.p>

                <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                  <a href="#scroll-stack"
                    className="inline-flex items-center gap-2.5 px-8 rounded-2xl text-[14px] font-bold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-xl active:scale-[0.98]"
                    style={{ background: BLUE, boxShadow: `0 8px 30px ${BLUE_GLOW}`, height: 52 }}>
                    开始报名认证 <ArrowRight className="w-4 h-4" />
                  </a>
                  <a href="#how-to-certify"
                    className="inline-flex items-center gap-2 px-7 rounded-2xl text-[14px] font-semibold transition-all duration-300 hover:bg-white/80 hover:shadow-sm text-slate-600"
                    style={{ border: '1px solid #E2E8F0', backgroundColor: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)', height: 52 }}>
                    了解认证路径
                  </a>
                </motion.div>
              </motion.div>
            </div>

            <motion.div className="lg:col-span-5 hidden lg:flex items-center justify-center"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.3 } }}>
              <CertStackCards />
            </motion.div>
          </div>
        </div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
          <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-slate-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Scroll to Explore
          </span>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </motion.div>
      </section>

      {/* ═══ § 1.5  TRUST BAR ═══ */}
      <div className="border-y border-slate-200/60" style={{ backgroundColor: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
          <div className="flex items-center gap-8 overflow-x-auto scrollbar-none">
            <p className="text-[11px] font-bold tracking-[0.08em] whitespace-nowrap shrink-0 text-slate-400">联合认证企业</p>
            <div className="w-px h-4 shrink-0 bg-slate-200" />
            <div className="flex items-center gap-8 flex-nowrap">
              {logos.map(l => <span key={l} className="text-[13px] font-semibold whitespace-nowrap shrink-0 text-slate-300 transition-colors duration-300 hover:text-slate-500">{l}</span>)}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ § 2  SCROLL STACK ═══ */}
      <section id="scroll-stack" className="py-32">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <motion.div className="text-center mb-20"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-[11px] font-bold uppercase tracking-[0.24em] mb-4"
              style={{ color: BLUE, fontFamily: "'JetBrains Mono', monospace" }}>
              Certification Path
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-extrabold tracking-[-0.035em] leading-[1.05] mb-5"
              style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', color: '#111827' }}>
              三级认证体系
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[16px] leading-[1.75] text-slate-500 max-w-lg mx-auto">
              逐层递进，从基础到专家，覆盖 AI 职业全周期
            </motion.p>
          </motion.div>

          <div>
            {certLevels.map((cert, i) => (
              <ScrollStackCard key={cert.level} cert={cert} index={i} openModal={openModal} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ § 3  STATS ═══ */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {[
              { value: 15000, suffix: '+', label: '持证 AI 工程师', sub: '覆盖国内外顶级科技企业及研究机构', highlight: true },
              { value: 340, suffix: '+', label: '联合认证企业', sub: '共同制定行业标准，广泛认可认证价值', highlight: false },
              { value: 23, suffix: '%', label: '平均薪资溢价', sub: '持证者较同级别未持证工程师薪资高出', highlight: false },
            ].map(m => (
              <motion.div key={m.label} variants={fadeUp}
                className="relative rounded-[32px] p-10 lg:p-12 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                style={{
                  backgroundColor: m.highlight ? '#0f172a' : 'rgba(255,255,255,0.85)',
                  backdropFilter: m.highlight ? 'none' : 'blur(16px)',
                  border: `1px solid ${m.highlight ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.6)'}`,
                  boxShadow: m.highlight
                    ? '0 30px 60px -12px rgba(0,0,0,0.35)'
                    : '0 20px 25px -5px rgba(0,0,0,0.05), 0 10px 10px -5px rgba(0,0,0,0.02), inset 0 0 0 1px rgba(255,255,255,0.4)',
                  minHeight: 220,
                }}>
                <p className="font-extrabold tracking-[-0.04em] leading-none mb-4"
                  style={{ fontSize: 'clamp(48px, 6vw, 72px)', color: m.highlight ? '#fff' : '#111827' }}>
                  <AnimatedNumber value={m.value} suffix={m.suffix} />
                </p>
                <div className="w-20 h-[2px] mb-4 rounded-full"
                  style={{ background: m.highlight
                    ? `linear-gradient(90deg, ${BLUE}, ${CYAN}, transparent)`
                    : 'linear-gradient(90deg, #e2e8f0, #cbd5e1, transparent)' }} />
                <p className="text-[15px] font-bold mb-1" style={{ color: m.highlight ? '#e2e8f0' : '#374151' }}>{m.label}</p>
                <p className="text-[13px] leading-[1.6]" style={{ color: m.highlight ? '#64748b' : '#94a3b8' }}>{m.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ § 4  HOW TO CERTIFY ═══ */}
      <section className="pt-40 pb-32" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20 lg:gap-24 items-start">

            {/* Left — sticky title (refined) */}
            <motion.div className="lg:sticky lg:top-28"
              initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0, transition: { duration: 0.6 } }} viewport={{ once: true }}>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4"
                style={{ color: BLUE, fontFamily: "'JetBrains Mono', monospace" }}>How to Certify</p>
              <h2 className="font-bold tracking-[-0.02em] mb-5"
                style={{ fontSize: 'clamp(36px, 4vw, 44px)', lineHeight: 1.2, color: '#1a1a1a' }}>
                如何获得{' '}
                <span style={{ background: `linear-gradient(135deg, ${BLUE}, ${CYAN})`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  AI 认证
                </span>
              </h2>
              <p className="text-[15px] leading-[1.65] mb-10" style={{ color: '#666', maxWidth: 420 }}>
                根据个人基础和目标，智能生成最优培训方案，涵盖从理论到实战的全方位课程。
              </p>
              <button type="button" onClick={() => openModal()}
                className="text-white px-7 py-3 text-[14px] font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: BLUE, boxShadow: `0 6px 20px ${BLUE_GLOW}` }}>
                立即开始报名
              </button>
            </motion.div>

            {/* Right — step cards (no connecting line, pure gap spacing) */}
            <motion.div className="space-y-5"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div key={s.num} variants={fadeUp}
                    className="group relative py-5 px-7 rounded-[20px] overflow-hidden transition-all duration-300 hover:-translate-y-1"
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid rgba(0,0,0,0.04)',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                    }}>

                    {/* Watermark number — subtle, right-centered */}
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 font-extrabold select-none pointer-events-none"
                      style={{ fontSize: 80, lineHeight: 1, color: '#000', opacity: 0.03 }}>
                      {s.num}
                    </span>

                    <div className="relative z-10 flex gap-5 items-center">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105"
                        style={{
                          backgroundColor: i === 0 ? BLUE : `${BLUE}0D`,
                          border: `1px solid ${i === 0 ? BLUE : BLUE + '25'}`,
                          boxShadow: i === 0 ? `0 4px 12px ${BLUE_GLOW}` : 'none',
                        }}>
                        <Icon style={{ width: 20, height: 20, color: i === 0 ? '#fff' : BLUE }} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="text-[12px] font-bold tracking-[0.1em] uppercase block mb-1"
                          style={{ color: BLUE, fontFamily: "'JetBrains Mono', monospace" }}>
                          STEP {s.num}
                        </span>
                        <h3 className="text-[20px] font-bold text-slate-900 mb-1 tracking-[-0.01em]">
                          {s.title}
                        </h3>
                        <p className="text-[14px] leading-[1.6]" style={{ color: '#999' }}>
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ § 5  VALUE ═══ */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div className="text-center mb-16"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-[11px] font-bold uppercase tracking-[0.24em] mb-4"
              style={{ color: BLUE, fontFamily: "'JetBrains Mono', monospace" }}>Why Certify</motion.p>
            <motion.h2 variants={fadeUp} className="font-extrabold tracking-[-0.035em] leading-[1.05]"
              style={{ fontSize: 'clamp(32px, 4vw, 48px)', color: '#111827' }}>
              认证的
              <span className="ml-2" style={{ background: `linear-gradient(135deg, ${BLUE}, ${CYAN})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                真实价值
              </span>
            </motion.h2>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {values.map(v => {
              const Icon = v.icon;
              return (
                <motion.div key={v.title} variants={fadeUp}
                  className="rounded-[32px] p-8 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1 group"
                  style={{ backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.6)',
                    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05), 0 10px 10px -5px rgba(0,0,0,0.02), inset 0 0 0 1px rgba(255,255,255,0.4)' }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: BLUE_BG }}>
                    <Icon style={{ width: 22, height: 22, color: BLUE }} />
                  </div>
                  <div>
                    <h4 className="text-[16px] font-extrabold mb-2 tracking-[-0.01em] text-slate-900">{v.title}</h4>
                    <p className="text-[13.5px] leading-[1.7] text-slate-500">{v.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══ § 6  CTA ═══ */}
      <section className="py-32 pb-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22,1,0.36,1] } }}
            viewport={{ once: true }}
            className="relative rounded-[32px] overflow-hidden px-10 py-20 lg:py-24 text-center"
            style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.96) 0%, rgba(15,23,42,0.92) 50%, rgba(15,23,42,0.96) 100%)',
              backdropFilter: 'blur(20px)', border: '1px solid rgba(37,99,235,0.12)',
              boxShadow: '0 30px 60px -12px rgba(0,0,0,0.35)' }}>

            <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.06,
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

            <div className="absolute inset-0 pointer-events-none" style={{
              background: `radial-gradient(ellipse 60% 50% at 50% 40%, rgba(37,99,235,0.15) 0%, transparent 70%)` }} />

            <div className="relative z-10 max-w-2xl mx-auto">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] mb-6 text-blue-300"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}>Start Now</p>
              <h2 className="font-extrabold tracking-[-0.035em] leading-[1.05] mb-6 text-white"
                style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
                你的 AI 梦想<br />从这一步开始
              </h2>
              <p className="text-[15px] leading-[1.8] mb-12 text-blue-200/60">
                报名即获专属备考资料与学习路径规划，资深导师一对一辅导，帮助你以最高效的方式通过认证。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button type="button" onClick={() => openModal()}
                  className="inline-flex items-center justify-center gap-2.5 px-8 rounded-2xl text-[14px] font-bold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: BLUE, boxShadow: `0 8px 30px ${BLUE_GLOW}`, height: 52 }}>
                  开始备考报名 <ArrowRight className="w-4 h-4" />
                </button>
                <Link to="/courses"
                  className="inline-flex items-center justify-center gap-2 px-7 rounded-2xl text-[14px] font-semibold transition-all duration-300 hover:bg-white/10 text-blue-200/70"
                  style={{ border: '1px solid rgba(148,163,184,0.2)', height: 52 }}>
                  浏览备考课程
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <EnrollModal open={modalOpen} onClose={() => setModalOpen(false)} defaultLevel={enrollLevel} />
    </div>
  );
}
