import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Code, Trophy, Sparkles, Cpu, GraduationCap, Rocket, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function HomePage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="relative">

      {/* ── Hero Section ─────────────────────────────── */}
      {isDark ? (
        /* Dark mode: cinematic image overlay */
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background z-10" />
            <img
              src="https://cdn.wegic.ai/assets/onepage/agent/images/1770227934151.jpg?imageMogr2/format/webp"
              alt="AI Learning"
              className="w-full h-full object-cover opacity-40"
            />
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="container mx-auto px-4 relative z-20 text-center max-w-5xl"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-8 border border-primary/20">
              <Sparkles className="w-4 h-4" />
              智谱 AI 官方学习中心
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight tracking-tight"
            >
              让 AI 学习
              <br />
              <span className="text-foreground">清晰且可达成</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              结构化的学习路径，助你掌握 AI 模型、编程技能与实战应用
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link
                to="/courses"
                className="group inline-flex items-center justify-center gap-2 h-14 px-10 text-lg font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300"
              >
                探索学习路径
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/certification"
                className="inline-flex items-center justify-center h-14 px-10 text-lg font-medium border-2 border-border rounded-lg hover:border-primary/50 hover:bg-card transition-all duration-300"
              >
                查看认证体系
              </Link>
            </motion.div>

            {/* Trust signals */}
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-8 mt-16 pt-16 border-t border-border/40">
              {[
                { label: '在学人数', value: '50,000+' },
                { label: '课程数量', value: '6 门' },
                { label: '认证等级', value: 'L1 / L2 / L3' },
                { label: '平均评分', value: '4.8 分' },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-bold text-foreground">{value}</div>
                  <div className="text-sm text-muted-foreground mt-0.5">{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>
      ) : (
        /* Light mode: clean structured layout */
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white">
          {/* Subtle geometric background */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full -translate-y-1/4 translate-x-1/4 opacity-80" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-50 rounded-full translate-y-1/4 -translate-x-1/4 opacity-60" />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'radial-gradient(circle, #E2E8F0 1px, transparent 1px)',
                backgroundSize: '32px 32px',
                opacity: 0.4,
              }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10 max-w-6xl py-24 pt-32">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Left: text */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-8 border border-blue-100">
                  <Sparkles className="w-3.5 h-3.5" />
                  智谱 AI 官方学习中心
                </motion.div>

                <motion.h1
                  variants={fadeInUp}
                  className="text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight text-slate-900"
                >
                  让 AI 学习
                  <br />
                  <span className="text-blue-600">清晰且可达成</span>
                </motion.h1>

                <motion.p
                  variants={fadeInUp}
                  className="text-lg text-slate-500 mb-10 max-w-xl leading-relaxed"
                >
                  结构化的学习路径，从零基础到 AI 架构师，助你掌握 AI 模型、编程技能与实战应用
                </motion.p>

                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 mb-12">
                  <Link
                    to="/courses"
                    className="group inline-flex items-center justify-center gap-2 h-12 px-8 text-base font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md shadow-blue-200"
                  >
                    探索学习路径
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/certification"
                    className="inline-flex items-center justify-center h-12 px-8 text-base font-medium border border-slate-200 rounded-lg text-slate-700 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                  >
                    查看认证体系
                  </Link>
                </motion.div>

                {/* Highlights */}
                <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-3">
                  {[
                    '50,000+ 名学员在学',
                    '6 门系统课程',
                    'L1 / L2 / L3 三级认证',
                    '官方认证备考路径',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-blue-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right: image card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.9, delay: 0.2 } }}
                className="relative hidden lg:block"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-100/50">
                  <img
                    src="https://cdn.wegic.ai/assets/onepage/agent/images/1770227934151.jpg?imageMogr2/format/webp"
                    alt="AI Learning"
                    className="w-full h-[480px] object-cover"
                  />
                  {/* Overlay gradient for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />

                  {/* Floating stat cards */}
                  <div className="absolute bottom-5 left-5 right-5 flex gap-3">
                    <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                      <div className="text-2xl font-bold text-slate-900">4.8</div>
                      <div className="text-xs text-slate-500 mt-0.5">平均评分</div>
                    </div>
                    <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                      <div className="text-2xl font-bold text-blue-600">L1~L3</div>
                      <div className="text-xs text-slate-500 mt-0.5">认证等级</div>
                    </div>
                    <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                      <div className="text-2xl font-bold text-slate-900">50K+</div>
                      <div className="text-xs text-slate-500 mt-0.5">在学人数</div>
                    </div>
                  </div>
                </div>

                {/* Decorative badge */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-600 rounded-2xl flex flex-col items-center justify-center shadow-lg rotate-3">
                  <GraduationCap className="w-7 h-7 text-white mb-0.5" />
                  <span className="text-white text-xs font-semibold">官方认证</span>
                </div>
              </motion.div>

            </div>
          </div>
        </section>
      )}

      {/* Learning Stages - Image + Text Grid */}
      <section className="py-32 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6">
              三阶段学习体系
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground max-w-2xl mx-auto">
              从零基础到实战应用，系统性的技能提升路径
            </motion.p>
          </motion.div>

          {/* Stage 1 - Beginner */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="grid md:grid-cols-2 gap-12 items-center mb-32"
          >
            <div className="order-2 md:order-1">
              <div className="inline-block px-4 py-1.5 bg-foreground/10 text-foreground/90 rounded-full text-sm font-medium mb-4">
                阶段 01
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">初学者</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                通过引导式讲解和示例，学习核心 AI 与编程概念。从基础理论到实践操作，建立扎实的知识体系。
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-foreground/80" />
                  </div>
                  <span className="text-foreground/80">AI 基础概念与应用场景</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-foreground/80" />
                  </div>
                  <span className="text-foreground/80">Python 编程入门与数据处理</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-foreground/80" />
                  </div>
                  <span className="text-foreground/80">机器学习基础理论</span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://cdn.wegic.ai/assets/onepage/agent/images/1770227935654.jpg?imageMogr2/format/webp"
                  alt="Neural Network"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </motion.div>

          {/* Stage 2 - Intermediate */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="grid md:grid-cols-2 gap-12 items-center mb-32"
          >
            <div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://cdn.wegic.ai/assets/onepage/agent/images/1770227934953.jpg?imageMogr2/format/webp"
                  alt="Coding Practice"
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div>
              <div className="inline-block px-4 py-1.5 bg-foreground/10 text-foreground/90 rounded-full text-sm font-medium mb-4">
                阶段 02
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">进阶者</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                通过动手练习和模型应用，提升工程技能。深入理解模型原理，掌握实际应用开发方法。
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-foreground/80" />
                  </div>
                  <span className="text-foreground/80">深度学习框架与模型训练</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-foreground/80" />
                  </div>
                  <span className="text-foreground/80">大语言模型 API 调用与集成</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-foreground/80" />
                  </div>
                  <span className="text-foreground/80">提示工程与模型优化</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Stage 3 - Expert */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="order-2 md:order-1">
              <div className="inline-block px-4 py-1.5 bg-foreground/10 text-foreground/90 rounded-full text-sm font-medium mb-4">
                阶段 03
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">专家级</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                设计并部署生产级 AI 系统，掌握多模态模型、推理优化与 MLOps 全流程，达到 AI 架构师水平。
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-foreground/80" />
                  </div>
                  <span className="text-foreground/80">多模态大模型构建与微调</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-foreground/80" />
                  </div>
                  <span className="text-foreground/80">生产级推理部署与性能优化</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-foreground/80" />
                  </div>
                  <span className="text-foreground/80">MLOps 全流程与系统架构设计</span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://cdn.wegic.ai/assets/onepage/agent/images/1770227935654.jpg?imageMogr2/format/webp"
                  alt="AI Architecture"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6">
              为什么选择智谱学习中心
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground max-w-2xl mx-auto">
              专为 AI 时代的学习者和开发者打造
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: BookOpen,
                title: '结构化课程',
                description: '精心设计的课程体系，从入门到专家，每一步都有明确的学习目标和成果'
              },
              {
                icon: Code,
                title: '实战项目驱动',
                description: '每门课程包含真实场景的动手项目，确保你能将理论知识转化为实际能力'
              },
              {
                icon: Trophy,
                title: '官方认证背书',
                description: '完成学习路径后可参加官方认证考试，获得行业认可的 AI 工程师资格'
              },
              {
                icon: Cpu,
                title: '前沿技术覆盖',
                description: '紧跟大模型发展前沿，课程内容持续更新，确保你学到最新的 AI 技术'
              }
            ].map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                className="group p-8 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-b from-card/30 to-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 bg-foreground/5 text-foreground/80 rounded-full text-sm font-medium mb-8">
              <Rocket className="w-4 h-4" />
              开启 AI 学习之旅
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6">
              准备好开始了吗？
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground mb-12 leading-relaxed">
              加入数十万开发者的行列，利用智谱 AI 强大的模型和工具构建未来
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/courses"
                className="group inline-flex items-center justify-center gap-2 h-14 px-10 text-lg font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300"
              >
                探索课程
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://open.bigmodel.cn/dev/api"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-14 px-10 text-lg font-medium border-2 border-border rounded-lg hover:border-primary/50 hover:bg-card transition-all duration-300"
              >
                阅读开发者文档
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
