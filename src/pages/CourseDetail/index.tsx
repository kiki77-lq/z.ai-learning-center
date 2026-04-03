import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  Users,
  Star,
  BookOpen,
  CheckCircle,
  ChevronRight,
  Award,
  CircleAlert,
  Wrench,
  MessageCircleQuestion,
  ChevronDown,
} from 'lucide-react';
import { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { courses } from '@/data/courses';

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const certLabelMap: Record<string, string> = {
  L1: 'L1 · AI 基础认证',
  L2: 'L2 · Prompt 工程认证',
  L3: 'L3 · AI 架构师认证',
};

const certColorMap: Record<string, { light: string; dark: string }> = {
  L1: { light: 'text-sky-700 bg-sky-50 border-sky-200', dark: 'text-sky-400 bg-sky-500/10 border-sky-500/20' },
  L2: { light: 'text-violet-700 bg-violet-50 border-violet-200', dark: 'text-violet-400 bg-violet-500/10 border-violet-500/20' },
  L3: { light: 'text-amber-700 bg-amber-50 border-amber-200', dark: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
};

const levelColorMap: Record<string, { light: string; dark: string }> = {
  初级: { light: 'text-emerald-700 bg-emerald-50 border-emerald-200', dark: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  中级: { light: 'text-blue-700 bg-blue-50 border-blue-200', dark: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  高级: { light: 'text-violet-700 bg-violet-50 border-violet-200', dark: 'text-violet-400 bg-violet-500/10 border-violet-500/20' },
};

function FaqItem({ q, a, isDark }: { q: string; a: string; isDark: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-b last:border-b-0 ${isDark ? 'border-border' : 'border-[#E4E7EC]'}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between gap-4 py-4 text-left text-sm font-medium transition-colors ${
          isDark ? 'text-foreground hover:text-primary' : 'text-slate-800 hover:text-blue-600'
        }`}
      >
        <span>{q}</span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''} ${
            isDark ? 'text-muted-foreground' : 'text-slate-400'
          }`}
        />
      </button>
      {open && (
        <p className={`pb-4 text-sm leading-relaxed ${isDark ? 'text-muted-foreground' : 'text-slate-500'}`}>
          {a}
        </p>
      )}
    </div>
  );
}

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const course = courses.find((c) => c.id === Number(id));
  if (!course) return <Navigate to="/courses" replace />;

  const prevCourse = courses.find((c) => c.id === course.id - 1);
  const nextCourse = courses.find((c) => c.id === course.id + 1);

  // Related courses: same certLevel, exclude current, max 3
  const relatedCourses = courses
    .filter((c) => c.certLevel === course.certLevel && c.id !== course.id)
    .slice(0, 3);

  const divider = isDark ? 'border-border' : 'border-[#E4E7EC]';
  const cardBg = isDark ? 'bg-card border-border' : 'bg-white border-[#E4E7EC]';
  const sectionBg = isDark ? 'bg-background' : 'bg-[#F6F8FB]';
  const altBg = isDark ? 'bg-card' : 'bg-white';

  const certColor = isDark ? certColorMap[course.certLevel].dark : certColorMap[course.certLevel].light;
  const levelColor = isDark ? levelColorMap[course.level]?.dark : levelColorMap[course.level]?.light;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-background text-foreground' : 'bg-[#F6F8FB] text-foreground'}`}>

      {/* ── Header / Hero ─────────────────────────────── */}
      <section className={`${altBg} border-b ${divider}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-5xl mx-auto">

            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs mb-6 flex-wrap">
              <Link to="/" className={`transition-colors ${isDark ? 'text-muted-foreground hover:text-foreground' : 'text-slate-400 hover:text-slate-600'}`}>
                首页
              </Link>
              <ChevronRight className="w-3 h-3 text-muted-foreground" />
              <Link to="/courses" className={`transition-colors ${isDark ? 'text-muted-foreground hover:text-foreground' : 'text-slate-400 hover:text-slate-600'}`}>
                课程
              </Link>
              <ChevronRight className="w-3 h-3 text-muted-foreground" />
              <span className={isDark ? 'text-foreground' : 'text-slate-600'}>{course.title}</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:gap-12 gap-8">

              {/* Left: info */}
              <div className="flex-1 min-w-0">
                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-md border ${levelColor}`}>
                    {course.level}
                  </span>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-md border ${certColor}`}>
                    {certLabelMap[course.certLevel]} 备考
                  </span>
                  {course.isPopular && (
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-md border ${
                      isDark ? 'text-rose-400 bg-rose-500/10 border-rose-500/20' : 'text-rose-600 bg-rose-50 border-rose-200'
                    }`}>
                      热门
                    </span>
                  )}
                </div>

                <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight mb-1 ${isDark ? 'text-foreground' : 'text-slate-900'}`}>
                  {course.title}
                </h1>
                <p className={`text-sm mb-4 ${isDark ? 'text-muted-foreground' : 'text-slate-400'}`}>
                  {course.subtitle}
                </p>
                <p className={`text-sm leading-relaxed mb-6 max-w-2xl ${isDark ? 'text-muted-foreground' : 'text-slate-600'}`}>
                  {course.longDescription}
                </p>

                {/* Meta row */}
                <div className={`flex flex-wrap items-center gap-5 text-sm pb-6 border-b ${divider}`}>
                  {[
                    { icon: Clock, text: course.duration },
                    { icon: Users, text: `${course.students.toLocaleString()} 名学员` },
                    { icon: Star, text: `${course.rating} 分` },
                    { icon: BookOpen, text: `${course.modules.length} 个模块` },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className={`flex items-center gap-1.5 ${isDark ? 'text-muted-foreground' : 'text-slate-500'}`}>
                      <Icon className="w-4 h-4 text-primary" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: course image card */}
              <div className="lg:w-72 xl:w-80 shrink-0">
                <div className={`rounded-xl border overflow-hidden ${cardBg}`}>
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <Link
                      to="/certification"
                      className={`w-full flex items-center justify-center gap-2 h-10 rounded-md text-sm font-semibold transition-colors mb-3 ${
                        isDark ? 'bg-primary text-white hover:bg-primary/90' : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      开始学习
                    </Link>
                    <p className={`text-xs text-center ${isDark ? 'text-muted-foreground' : 'text-slate-400'}`}>
                      完成本课程后可报考 {certLabelMap[course.certLevel]}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Main Content ─────────────────────────────── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left column: modules + faq */}
          <div className="flex-1 min-w-0 space-y-8">

            {/* Learning outcomes */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className={`rounded-xl border p-6 ${cardBg}`}
            >
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-4 h-4 text-primary" />
                <h2 className={`text-base font-semibold ${isDark ? 'text-foreground' : 'text-slate-800'}`}>
                  学习成果
                </h2>
              </div>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {course.outcomes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                    <span className={isDark ? 'text-muted-foreground' : 'text-slate-600'}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Course modules */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-4 h-4 text-primary" />
                <h2 className={`text-base font-semibold ${isDark ? 'text-foreground' : 'text-slate-800'}`}>
                  课程大纲
                </h2>
              </div>
              <div className={`rounded-xl border divide-y overflow-hidden ${cardBg} ${isDark ? 'divide-border' : 'divide-[#E4E7EC]'}`}>
                {course.modules.map((mod, idx) => (
                  <div key={mod.title} className="p-5">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-mono font-bold w-6 text-center ${isDark ? 'text-muted-foreground' : 'text-slate-400'}`}>
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className={`text-sm font-semibold ${isDark ? 'text-foreground' : 'text-slate-800'}`}>
                          {mod.title}
                        </span>
                      </div>
                      <span className={`text-xs shrink-0 ${isDark ? 'text-muted-foreground' : 'text-slate-400'}`}>
                        {mod.duration}
                      </span>
                    </div>
                    <ul className="pl-9 space-y-1.5">
                      {mod.lessons.map((lesson) => (
                        <li key={lesson} className={`flex items-center gap-2 text-xs ${isDark ? 'text-muted-foreground' : 'text-slate-500'}`}>
                          <span className={`w-1 h-1 rounded-full shrink-0 ${isDark ? 'bg-border' : 'bg-slate-300'}`} />
                          {lesson}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* FAQ */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className={`rounded-xl border p-6 ${cardBg}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <MessageCircleQuestion className="w-4 h-4 text-primary" />
                <h2 className={`text-base font-semibold ${isDark ? 'text-foreground' : 'text-slate-800'}`}>
                  常见问题
                </h2>
              </div>
              <div>
                {course.faq.map((item) => (
                  <FaqItem key={item.q} q={item.q} a={item.a} isDark={isDark} />
                ))}
              </div>
            </motion.section>

          </div>

          {/* Right sidebar */}
          <div className="lg:w-64 xl:w-72 shrink-0 space-y-5">

            {/* Prerequisites */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className={`rounded-xl border p-5 ${cardBg}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <CircleAlert className="w-4 h-4 text-primary" />
                <h3 className={`text-sm font-semibold ${isDark ? 'text-foreground' : 'text-slate-800'}`}>
                  先修要求
                </h3>
              </div>
              <ul className="space-y-2">
                {course.prerequisites.map((p) => (
                  <li key={p} className={`text-xs leading-relaxed flex items-start gap-2 ${isDark ? 'text-muted-foreground' : 'text-slate-500'}`}>
                    <span className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Tools */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className={`rounded-xl border p-5 ${cardBg}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Wrench className="w-4 h-4 text-primary" />
                <h3 className={`text-sm font-semibold ${isDark ? 'text-foreground' : 'text-slate-800'}`}>
                  使用工具
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {course.tools.map((tool) => (
                  <span
                    key={tool}
                    className={`text-xs px-2.5 py-1 rounded-md border font-medium ${
                      isDark ? 'bg-background border-border text-foreground' : 'bg-slate-50 border-[#E4E7EC] text-slate-600'
                    }`}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Cert link */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className={`rounded-xl border p-5 ${cardBg}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 text-primary" />
                <h3 className={`text-sm font-semibold ${isDark ? 'text-foreground' : 'text-slate-800'}`}>
                  对应认证
                </h3>
              </div>
              <p className={`text-xs leading-relaxed mb-3 ${isDark ? 'text-muted-foreground' : 'text-slate-500'}`}>
                完成本课程是通过 <strong>{certLabelMap[course.certLevel]}</strong> 的核心备考路径。
              </p>
              <Link
                to="/certification"
                className={`flex items-center justify-between text-xs font-medium px-3 py-2 rounded-md border transition-colors ${
                  isDark
                    ? 'border-border text-foreground hover:border-primary/40 hover:text-primary'
                    : 'border-[#E4E7EC] text-slate-600 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                查看认证要求
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>

          </div>

        </div>
      </div>

      {/* ── Related Courses ──────────────────────────── */}
      {relatedCourses.length > 0 && (
        <section className={`border-t ${divider} ${sectionBg} py-12`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className={`text-base font-semibold ${isDark ? 'text-foreground' : 'text-slate-800'}`}>
                  同认证路径课程
                </h2>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-muted-foreground' : 'text-slate-400'}`}>
                  {certLabelMap[course.certLevel]} 备考推荐
                </p>
              </div>
              <Link
                to={`/courses?level=${course.levelEn}`}
                className={`text-xs font-medium transition-colors ${isDark ? 'text-primary hover:text-primary/80' : 'text-blue-600 hover:text-blue-700'}`}
              >
                查看全部 →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedCourses.map((rc) => {
                const rcCertColor = isDark ? certColorMap[rc.certLevel].dark : certColorMap[rc.certLevel].light;
                const rcLevelColor = isDark ? levelColorMap[rc.level]?.dark : levelColorMap[rc.level]?.light;
                return (
                  <motion.div
                    key={rc.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                  >
                    <Link
                      to={`/courses/${rc.id}`}
                      className={`group block rounded-xl border overflow-hidden transition-all duration-200 h-full ${
                        isDark
                          ? 'bg-card border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5'
                          : 'bg-white border-[#E4E7EC] hover:border-blue-200 hover:shadow-md'
                      }`}
                    >
                      <div className="relative overflow-hidden h-36">
                        <img
                          src={rc.image}
                          alt={rc.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className={`absolute inset-0 ${isDark ? 'bg-black/30' : 'bg-black/10'}`} />
                        {rc.isPopular && (
                          <span className="absolute top-2 right-2 text-[10px] font-medium px-2 py-0.5 rounded-full bg-rose-500/90 text-white">
                            热门
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${rcLevelColor}`}>
                            {rc.level}
                          </span>
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${rcCertColor}`}>
                            {rc.certLevel}
                          </span>
                        </div>
                        <h3 className={`text-sm font-semibold mb-1 line-clamp-2 leading-snug transition-colors ${
                          isDark ? 'text-foreground group-hover:text-primary' : 'text-slate-800 group-hover:text-blue-600'
                        }`}>
                          {rc.title}
                        </h3>
                        <p className={`text-xs leading-relaxed line-clamp-2 mb-3 ${isDark ? 'text-muted-foreground' : 'text-slate-400'}`}>
                          {rc.description}
                        </p>
                        <div className={`flex items-center gap-3 text-xs ${isDark ? 'text-muted-foreground' : 'text-slate-400'}`}>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {rc.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-amber-400" />
                            {rc.rating}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Course Navigation ────────────────────────── */}
      {(prevCourse || nextCourse) && (
        <section className={`border-t ${divider} ${sectionBg} py-8`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 justify-between">
              {prevCourse ? (
                <Link
                  to={`/courses/${prevCourse.id}`}
                  className={`flex items-center gap-3 px-5 py-4 rounded-xl border transition-colors group flex-1 ${
                    isDark ? 'bg-card border-border hover:border-primary/30' : 'bg-white border-[#E4E7EC] hover:border-blue-200'
                  }`}
                >
                  <ArrowLeft className={`w-4 h-4 shrink-0 transition-colors ${isDark ? 'text-muted-foreground group-hover:text-primary' : 'text-slate-400 group-hover:text-blue-600'}`} />
                  <div className="min-w-0">
                    <div className={`text-xs mb-0.5 ${isDark ? 'text-muted-foreground' : 'text-slate-400'}`}>上一课程</div>
                    <div className={`text-sm font-medium truncate ${isDark ? 'text-foreground' : 'text-slate-700'}`}>{prevCourse.title}</div>
                  </div>
                </Link>
              ) : <div className="flex-1" />}

              {nextCourse && (
                <Link
                  to={`/courses/${nextCourse.id}`}
                  className={`flex items-center justify-end gap-3 px-5 py-4 rounded-xl border transition-colors group flex-1 ${
                    isDark ? 'bg-card border-border hover:border-primary/30' : 'bg-white border-[#E4E7EC] hover:border-blue-200'
                  }`}
                >
                  <div className="min-w-0 text-right">
                    <div className={`text-xs mb-0.5 ${isDark ? 'text-muted-foreground' : 'text-slate-400'}`}>下一课程</div>
                    <div className={`text-sm font-medium truncate ${isDark ? 'text-foreground' : 'text-slate-700'}`}>{nextCourse.title}</div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-colors ${isDark ? 'text-muted-foreground group-hover:text-primary' : 'text-slate-400 group-hover:text-blue-600'}`} />
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── Back link ────────────────────────────────── */}
      <div className={`border-t ${divider} ${sectionBg} py-5`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <Link
            to="/courses"
            className={`inline-flex items-center gap-1.5 text-sm transition-colors ${
              isDark ? 'text-muted-foreground hover:text-foreground' : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            返回全部课程
          </Link>
        </div>
      </div>

    </div>
  );
}
