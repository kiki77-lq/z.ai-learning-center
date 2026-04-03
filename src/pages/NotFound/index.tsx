import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-9xl font-bold text-foreground/10">404</h1>
      <h2 className="text-2xl font-bold mt-4 mb-2">页面未找到</h2>
      <p className="text-muted-foreground mb-8">抱歉，您访问的页面不存在或已被移除。</p>
      <Link 
        to="/" 
        className="px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
      >
        返回首页
      </Link>
    </div>
  );
}
