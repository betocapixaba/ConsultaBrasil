import React from 'react';
import { Monitor } from 'lucide-react';

interface AdSpaceProps {
  height?: string;
  label?: string;
  width?: string;
  slot?: string;
}

const AdSpace: React.FC<AdSpaceProps> = ({ 
  height = '88px', 
  label = 'Anúncio Google AdSense', 
  width = 'max-w-[1100px]', 
  slot = "" 
}) => {
  const adClientId = (import.meta as any).env.VITE_ADSENSE_CLIENT_ID;
  const adContainerRef = React.useRef<HTMLModElement>(null);
  const adPushed = React.useRef(false);

  React.useEffect(() => {
    if (!adClientId || adPushed.current) return;

    // Load AdSense script dynamically if not already present
    const scriptId = 'adsense-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClientId}`;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }

    const pushAd = () => {
      if (adPushed.current) return;
      
      const container = adContainerRef.current;
      if (container && container.offsetWidth > 0) {
        try {
          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          adPushed.current = true;
        } catch (e) {
          console.error("AdSense error:", e);
        }
      }
    };

    // Use ResizeObserver to wait for the element to have a width
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          pushAd();
          observer.disconnect(); // Only push once
        }
      }
    });

    if (adContainerRef.current) {
      observer.observe(adContainerRef.current);
    }

    // Fallback: check immediately (e.g. if it already has width)
    pushAd();

    return () => {
      observer.disconnect();
    };
  }, [adClientId, slot]);

  if (adClientId) {
    return (
      <div 
        className={`flex justify-center my-4 ${width} mx-auto overflow-hidden`} 
        style={{ minHeight: height }}
      >
        <ins 
          ref={adContainerRef}
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: height }}
          data-ad-client={adClientId}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  return (
    <div 
      className={`flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded bg-[#fafafa] my-4 ${width} mx-auto`} 
      style={{ height }}
    >
      <Monitor className="text-gray-300 mb-2" size={32} />
      <span className="text-gray-400 text-sm font-medium tracking-tight">
        {label}
      </span>
    </div>
  );
};

export default AdSpace;
