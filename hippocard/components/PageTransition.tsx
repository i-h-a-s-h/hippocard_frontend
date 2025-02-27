'use client';

import { motion, AnimatePresence } from 'node_modules/framer-motion';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <div>
      {/* Header will be outside the animated container */}
      {pathname === '/' && children.props.children[0]}
      
      <AnimatePresence mode='wait'>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* Main content will be animated */}
          {pathname === '/' ? children.props.children[1] : children}
        </motion.div>
      </AnimatePresence>
      
      {/* Footer will be outside the animated container */}
      {pathname === '/' && children.props.children[2]}
    </div>
  );
} 