import { Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X, Github, Twitter, Linkedin, Sun, Moon } from 'lucide-react';
import ScrollToTop from './ScrollToTop';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: '首页', path: '/' },
    { name: '课程', path: '/courses' },
    { name: '认证', path: '/certification' },
    { name: '模型', path: 'https://open.bigmodel.cn/', external: true },
    { name: '文档', path: 'https://open.bigmodel.cn/dev/api', external: true },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/92 backdrop-blur-md border-b border-border shadow-sm'
            : 'bg-background/80 backdrop-blur-sm'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative w-8 h-8 md:w-10 md:h-10 overflow-hidden">
                <img
                  src="https://cdn.wegic.ai/assets/onepage/agent/images/1770227411601_edited.png?imageMogr2/format/webp"
                  alt="Zhipu AI Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-base md:text-lg font-bold text-foreground tracking-tight">
                智谱<span className="text-primary">学习中心</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.path}
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative px-3 py-2 text-sm font-medium transition-colors hover:text-primary text-muted-foreground rounded-md hover:bg-primary/5"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-primary/5 hover:text-primary ${
                      location.pathname === link.path
                        ? 'text-primary bg-primary/8'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {link.name}
                    {location.pathname === link.path && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full" />
                    )}
                  </Link>
                )
              )}
            </nav>

            {/* Right: CTA + Theme Toggle + Mobile Menu */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === 'light' ? '切换到深色模式' : '切换到浅色模式'}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/8 border border-border/60 transition-all duration-200"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === 'light' ? (
                    <motion.span
                      key="moon"
                      initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
                      transition={{ duration: 0.18 }}
                    >
                      <Moon className="w-4 h-4" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="sun"
                      initial={{ opacity: 0, rotate: 30, scale: 0.8 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: -30, scale: 0.8 }}
                      transition={{ duration: 0.18 }}
                    >
                      <Sun className="w-4 h-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* CTA Button - Desktop */}
              <a
                href="https://open.bigmodel.cn/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center justify-center h-9 px-5 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
              >
                开始学习
              </a>

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isMenuOpen ? (
                    <motion.span
                      key="x"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden fixed top-16 left-0 right-0 z-40 bg-background border-b border-border shadow-lg overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4">
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) =>
                    link.external ? (
                      <a
                        key={link.path}
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-base font-medium py-2.5 px-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`block text-base font-medium py-2.5 px-3 rounded-lg transition-colors ${
                          location.pathname === link.path
                            ? 'text-primary bg-primary/8'
                            : 'text-foreground hover:bg-secondary'
                        }`}
                      >
                        {link.name}
                      </Link>
                    )
                  )}
                </nav>
                <div className="mt-4 pt-4 border-t border-border">
                  <a
                    href="https://open.bigmodel.cn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center h-10 leading-10 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    开始学习
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 overflow-hidden">
                  <img
                    src="https://cdn.wegic.ai/assets/onepage/agent/images/1770227411601_edited.png?imageMogr2/format/webp"
                    alt="Zhipu AI"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-bold text-foreground">智谱<span className="text-primary">学习中心</span></span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                智谱 AI 官方学习平台，提供系统化的 AI 学习路径、专业认证与实战项目，助力每一位学习者掌握 AI 核心技术。
              </p>
              <div className="flex gap-3 mt-5">
                <a href="#" aria-label="GitHub" className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all">
                  <Github className="w-4 h-4" />
                </a>
                <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">学习资源</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li><Link to="/courses" className="hover:text-primary transition-colors">全部课程</Link></li>
                <li><Link to="/certification" className="hover:text-primary transition-colors">认证体系</Link></li>
                <li><a href="https://open.bigmodel.cn/dev/api" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">API 文档</a></li>
                <li><a href="https://open.bigmodel.cn/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">开放平台</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">关于我们</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">加入我们</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">联系方式</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">隐私政策</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2026 Zhipu AI Learning Center. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground transition-colors">条款</a>
              <a href="#" className="hover:text-foreground transition-colors">隐私</a>
              <a href="#" className="hover:text-foreground transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
