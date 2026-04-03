import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout';

const Home = lazy(() => import('@/pages/Home'));
const Courses = lazy(() => import('@/pages/Courses'));
const CourseDetail = lazy(() => import('@/pages/CourseDetail'));
const Certification = lazy(() => import('@/pages/Certification'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const Loading = () => (
  <div className="h-screen flex items-center justify-center bg-background text-muted-foreground text-sm">
    加载中…
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Suspense fallback={<Loading />}><Home /></Suspense> },
      { path: 'courses', element: <Suspense fallback={<Loading />}><Courses /></Suspense> },
      { path: 'courses/:id', element: <Suspense fallback={<Loading />}><CourseDetail /></Suspense> },
      { path: 'certification', element: <Suspense fallback={<Loading />}><Certification /></Suspense> },
      { path: '*', element: <Suspense fallback={<Loading />}><NotFound /></Suspense> },
    ],
  },
]);
