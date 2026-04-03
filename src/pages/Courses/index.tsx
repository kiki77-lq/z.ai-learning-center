import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, ChevronRight, Star, BookOpen, Award } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { courses, type CourseLevel } from '@/data/courses';

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

type LevelButtonValue = CourseLevel;
interface LevelButton { value: LevelButtonValue; label: string; count: number }

const levelButtons: LevelButton[] = [
  { value: 'all', label: '全部课程', count: courses.length },
  { value: 'beginner', label: '入门基础', count: courses.filter((c) => c.levelEn === 'beginner').length },
  { value: 'intermediate', label: '中级进阶', count: courses.filter((c) => c.levelEn === 'intermediate').length },
  { value: 'advanced', label: '高级实战', count: courses.filter((c) => c.levelEn === 'advanced').length },
];

export default function CoursesPage() {
  const location = useLocation();
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel>(() => {
    const params = new URLSearchParams(location.search);
    const lvl = params.get('level') as CourseLevel | null;
    const valid: CourseLevel[] = ['all', 'beginner', 'intermediate', 'advanced'];
    return lvl && valid.includes(lvl) ? lvl : 'all';
  });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Sync when URL changes (e.g. back navigation or link click)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const lvl = params.get('level') as CourseLevel | null;
    const valid: CourseLevel[] = ['all', 'beginner', 'intermediate', 'advanced'];
    if (lvl && valid.includes(lvl)) {
      setSelectedLevel(lvl);
      // Scroll to the filter section smoothly
      setTimeout(() => {
        document.getElementById('course-filter')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [location.search]);

  const filteredCourses =
    selectedLevel === 'all' ? courses : courses.filter((c) => c.levelEn === selectedLevel);

  // Theme-aware level badge config
  const levelConfig: Record<string, { color: string; bg: string; dot: string }> = isDark
    ? {
        初级: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', dot: 'bg-emerald-400' },
        中级: { color: 'text-blue-400', bg: 'bg-blue-500/10', dot: 'bg-blue-400' },
        高级: { color: 'text-violet-400', bg: 'bg-violet-500/10', dot: 'bg-violet-400' },
      }
    : {
        初级: { color: 'text-emerald-700', bg: 'bg-emerald-50', dot: 'bg-emerald-500' },
        中级: { color: 'text-blue-700', bg: 'bg-blue-50', dot: 'bg-blue-500' },
        高级: { color: 'text-violet-700', bg: 'bg-violet-50', dot: 'bg-violet-500' },
      };

  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero / Page Header ── */}
      <section
        className={`border-b border-border pt-28 pb-14 ${
          isDark ? 'bg-background' : 'bg-gradient-to-b from-[#F6F8FB] to-[#F9FAFC]'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-5xl"
          >
            {/* Breadcrumb */}
            <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-6">
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full border ${
                  isDark
                    ? 'text-primary bg-primary/8 border-primary/20'
                    : 'text-primary bg-blue-50 border-blue-200'
                }`}
              >
                学习中心
              </span>
              <ChevronRight className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">全部课程</span>
            </motion.div>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="flex-1">
                <motion.h1
                  variants={fadeInUp}
                  className="text-3xl sm:text-4xl font-bold text-foreground mb-3 tracking-tight"
                >
                  AI 系统课程
                </motion.h1>
                <motion.p variants={fadeInUp} className="text-base text-muted-foreground max-w-xl leading-relaxed">
                  从 Python 基础到大模型部署，覆盖 AI 工程师完整成长路径。
                  每门课程均由智谱 AI 研究团队设计，结合真实项目实战。
                </motion.p>
              </div>

              {/* Stats row */}
              <motion.div
                variants={fadeInUp}
                className={`flex items-center gap-6 shrink-0 ${
                  isDark
                    ? 'text-muted-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                {[
                  { icon: BookOpen, label: `${courses.length} 门课程` },
                  { icon: Users, label: '40,000+ 学员' },
                  { icon: Award, label: '官方认证' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 text-sm">
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="font-medium">{label}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Course Grid ── */}
      <section className={`py-10 ${isDark ? '' : 'bg-[#F9FAFC]'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* Filter tabs */}
          <div id="course-filter" className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 scroll-mt-24">
            <div
              className={`flex items-center gap-1 p-1 rounded-xl shadow-sm w-fit border ${
                isDark
                  ? 'bg-card border-border'
                  : 'bg-white border-border'
              }`}
            >
              {levelButtons.map((btn) => (
                <button
                  key={btn.value}
                  type="button"
                  onClick={() => setSelectedLevel(btn.value)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedLevel === btn.value
                      ? 'bg-primary text-white shadow-sm'
                      : isDark
                        ? 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                  }`}
                >
                  {btn.label}
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-md font-mono leading-none ${
                      selectedLevel === btn.value
                        ? 'bg-white/20 text-white'
                        : isDark
                          ? 'bg-secondary text-muted-foreground'
                          : 'bg-gray-100 text-muted-foreground'
                    }`}
                  >
                    {btn.count}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              显示 <span className="font-semibold text-foreground">{filteredCourses.length}</span> 门课程
            </p>
          </div>

          {/* Course cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedLevel}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredCourses.map((course) => {
                const lv = levelConfig[course.level] ?? levelConfig['中级'];
                return (
                  <motion.article
                    key={course.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className={`group rounded-2xl border overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-0.5 ${
                      isDark
                        ? 'bg-card border-border hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5'
                        : 'bg-white border-border shadow-sm hover:shadow-md hover:border-primary/20'
                    }`}
                  >
                    {/* Cover Image */}
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                      />
                      <div
                        className={`absolute inset-0 ${
                          isDark
                            ? 'bg-gradient-to-t from-card/60 via-transparent'
                            : 'bg-gradient-to-t from-black/10 via-transparent'
                        }`}
                      />
                      {course.isPopular && (
                        <span className="absolute top-3 right-3 text-xs font-semibold bg-primary text-white px-2.5 py-1 rounded-full shadow-sm">
                          热门
                        </span>
                      )}
                      {course.pathStep && (
                        <span
                          className={`absolute top-3 left-3 text-xs font-mono px-2 py-0.5 rounded border ${
                            isDark
                              ? 'bg-background/70 text-muted-foreground border-border'
                              : 'bg-white/80 text-muted-foreground border-border backdrop-blur-sm'
                          }`}
                        >
                          Step {course.pathStep}
                        </span>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex flex-col flex-1">
                      {/* Level badge + duration */}
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${lv.bg} ${lv.color}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${lv.dot}`} />
                          {course.level}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3.5 h-3.5" />
                          {course.duration}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-semibold text-foreground text-base leading-snug mb-1 group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-3 font-medium tracking-wide">
                        {course.subtitle}
                      </p>
                      <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-muted-foreground' : 'text-[#4B5563]'}`}>
                        {course.description}
                      </p>

                      {/* Outcomes */}
                      <ul className="space-y-1.5 mb-4 flex-1">
                        {course.outcomes.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>

                      {/* Footer */}
                      <div
                        className={`pt-3 mt-auto border-t flex items-center justify-between ${
                          isDark ? 'border-border' : 'border-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" />
                            <span>{course.students.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span className={`font-medium ${isDark ? 'text-foreground/80' : 'text-gray-700'}`}>
                              {course.rating}
                            </span>
                          </div>
                        </div>
                        <Link
                          to={`/courses/${course.id}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:gap-2 transition-all"
                        >
                          查看课程 <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Learning Path Banner ── */}
      <section
        className={`py-12 border-t border-border ${
          isDark ? 'bg-background' : 'bg-white'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`rounded-2xl px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6 border ${
              isDark
                ? 'bg-gradient-to-r from-primary/5 via-primary/8 to-primary/5 border-primary/15'
                : 'bg-gradient-to-r from-blue-50 via-[#EEF4FF] to-blue-50 border-blue-100'
            }`}
          >
            <div className="max-w-lg">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">推荐学习路径</span>
              </div>
              <h2
                className={`text-xl font-bold mb-2 ${
                  isDark ? 'text-foreground' : 'text-gray-900'
                }`}
              >
                按顺序学习，效果更好
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                我们为不同背景的学习者设计了系统化的课程路径。从入门基础到高级架构，
                逐步建立完整的 AI 技能体系，最终获得官方认证。
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                to="/courses/1"
                className="inline-flex items-center justify-center gap-2 h-10 px-6 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
              >
                从第一门课开始
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                to="/certification"
                className={`inline-flex items-center justify-center gap-2 h-10 px-6 text-sm font-medium border rounded-lg hover:text-primary transition-all ${
                  isDark
                    ? 'border-border bg-card text-foreground hover:border-primary/40'
                    : 'border-blue-200 bg-white text-gray-700 hover:border-primary/60'
                }`}
              >
                查看认证路径
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
