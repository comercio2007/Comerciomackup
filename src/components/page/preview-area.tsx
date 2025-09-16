'use client';

import React, { forwardRef, MouseEvent } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { Rnd } from 'react-rnd';
import { cn } from '@/lib/utils';

interface PreviewAreaProps {
  productImage: string | null;
  designImage: string | null;
  text: string;
  textColor: string;
  textFontSize: number;
  textFontFamily: string;
  activeElement: string | null;
  setActiveElement: (id: string | null) => void;
}

const ResizeHandle = () => (
    <div className="w-3 h-3 bg-white rounded-full border-2 border-primary" />
);

const PreviewArea = forwardRef<HTMLDivElement, PreviewAreaProps>(
  ({ productImage, designImage, text, textColor, textFontSize, textFontFamily, activeElement, setActiveElement }, ref) => {
    
    const handleElementClick = (e: MouseEvent, id: string) => {
      e.stopPropagation();
      setActiveElement(id);
    };

    return (
      <Card className="shadow-lg">
        <CardContent className="p-4 bg-white">
          <div
            ref={ref}
            className="relative aspect-square w-full rounded-lg overflow-hidden bg-gray-100"
            onClick={() => setActiveElement(null)}
          >
            {productImage ? (
              <Image
                src={productImage}
                alt="Product background"
                fill
                className="object-contain"
                priority
              />
            ) : (
               <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-muted-foreground p-8">
                <ImageIcon className="w-16 h-16 mb-4" />
                <h3 className="text-lg font-semibold">A sua tela espera</h3>
                <p className="text-sm">Carregue a imagem de um produto para começar a criar o seu mockup.</p>
              </div>
            )}

            {designImage && (
              <Rnd
                default={{
                  x: 100,
                  y: 150,
                  width: 200,
                  height: 200,
                }}
                bounds="parent"
                lockAspectRatio
                onDragStart={() => setActiveElement('design')}
                onResizeStart={() => setActiveElement('design')}
                onClick={(e) => handleElementClick(e, 'design')}
                className={cn(
                  'flex items-center justify-center',
                  activeElement === 'design' && 'border-2 border-dashed border-primary'
                )}
                style={{
                  backgroundImage: `url(${designImage})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}
                resizeHandleComponent={{
                    topLeft: <ResizeHandle />,
                    topRight: <ResizeHandle />,
                    bottomLeft: <ResizeHandle />,
                    bottomRight: <ResizeHandle />,
                }}
                enableResizing={activeElement === 'design' ? undefined : {
                  top:false, right:false, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false
                }}
              >
                <div className="w-full h-full" />
              </Rnd>
            )}

            {text && (
               <Rnd
                default={{
                  x: 150,
                  y: 100,
                  width: 'auto',
                  height: 'auto'
                }}
                bounds="parent"
                onDragStart={() => setActiveElement('text')}
                onResizeStart={() => setActiveElement('text')}
                onClick={(e) => handleElementClick(e, 'text')}
                className={cn(
                  activeElement === 'text' && 'border-2 border-dashed border-primary'
                )}
                resizeHandleComponent={ activeElement === 'text' ? {
                    topLeft: <ResizeHandle />,
                    topRight: <ResizeHandle />,
                    bottomLeft: <ResizeHandle />,
                    bottomRight: <ResizeHandle />,
                } : {}}
                enableResizing={activeElement === 'text' ? {
                  top:true, right:true, bottom:true, left:true, topRight:true, bottomRight:true, bottomLeft:true, topLeft:true
                } : {
                  top:false, right:false, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false
                }}
               >
                 <div
                    style={{
                      color: textColor,
                      fontSize: `${textFontSize}px`,
                      fontFamily: textFontFamily,
                      whiteSpace: 'pre-wrap',
                      lineHeight: 1.2
                    }}
                    className="p-1" // Add padding to not cut off resize handles
                 >
                    {text}
                 </div>
               </Rnd>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);

PreviewArea.displayName = 'PreviewArea';

export default PreviewArea;
