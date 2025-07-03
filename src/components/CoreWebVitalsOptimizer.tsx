import { useEffect } from 'react';

const CoreWebVitalsOptimizer = () => {
  useEffect(() => {
    // Preload critical images
    const preloadImages = [
      '/lovable-uploads/85110425-79bb-4796-9796-22b5b647b1ee.png'
    ];

    preloadImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });

    // Optimize images with lazy loading for non-critical images
    const images = document.querySelectorAll('img[data-lazy]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.lazy || '';
          img.classList.remove('opacity-0');
          img.classList.add('opacity-100', 'transition-opacity', 'duration-300');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));

    // Critical resource hints
    const resourceHints = [
      { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
      { rel: 'dns-prefetch', href: 'https://scottalvarez.remax.com' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' }
    ];

    resourceHints.forEach(hint => {
      const existingLink = document.querySelector(`link[rel="${hint.rel}"][href="${hint.href}"]`);
      if (!existingLink) {
        const link = document.createElement('link');
        link.rel = hint.rel;
        link.href = hint.href;
        if (hint.crossOrigin) {
          link.crossOrigin = hint.crossOrigin;
        }
        document.head.appendChild(link);
      }
    });

    // Defer non-critical JavaScript
    const deferredScripts = document.querySelectorAll('script[data-defer]');
    const scriptObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const script = entry.target as HTMLScriptElement;
          script.src = script.dataset.defer || '';
          scriptObserver.unobserve(script);
        }
      });
    });

    deferredScripts.forEach(script => scriptObserver.observe(script));

    // Cleanup
    return () => {
      imageObserver.disconnect();
      scriptObserver.disconnect();
    };
  }, []);

  return null;
};

export default CoreWebVitalsOptimizer;