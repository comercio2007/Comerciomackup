'use client';

import { useState, useRef, type ChangeEvent, useCallback } from 'react';
import Header from './header';
import ControlPanel from './control-panel';
import PreviewArea from './preview-area';
import { useToast } from '@/hooks/use-toast';
import html2canvas from 'html2canvas';

export default function MainPage() {
  const { toast } = useToast();
  
  const [productImage, setProductImage] = useState<string | null>(null);
  const [designImage, setDesignImage] = useState<string | null>(null);
  const [productImageFileName, setProductImageFileName] = useState<string>('');
  const [designImageFileName, setDesignImageFileName] = useState<string>('');
  const [text, setText] = useState('');
  const [textColor, setTextColor] = useState('#000000');
  const [textFontSize, setTextFontSize] = useState(48);
  const [textFontFamily, setTextFontFamily] = useState('inter');
  const [activeElement, setActiveElement] = useState<string | null>(null);


  const productImageInputRef = useRef<HTMLInputElement>(null);
  const designImageInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>, type: 'product' | 'design') => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          variant: 'destructive',
          title: 'Ficheiro inválido',
          description: 'Por favor, carregue um ficheiro de imagem.',
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const result = loadEvent.target?.result as string;
        if (type === 'product') {
          setProductImage(result);
          setProductImageFileName(file.name);
        } else {
          setDesignImage(result);
          setDesignImageFileName(file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const generateImage = useCallback(async (action: 'download' | 'clipboard') => {
    if (!previewRef.current) return;
    
    // Deselect elements before capturing
    setActiveElement(null);

    // Allow time for the UI to update
    await new Promise(resolve => setTimeout(resolve, 100));


    try {
      const canvas = await html2canvas(previewRef.current, {
        allowTaint: true,
        useCORS: true,
        backgroundColor: '#ffffff',
        scale: 2, // Increase scale for better quality
      });

      // Add watermark
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'rgba(239, 68, 68, 0.7)';
        ctx.font = `bold 36px Pacifico, cursive`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(-0.45);
        ctx.fillText('Comércio Moz', 0, 0);
        ctx.restore();
      }
      
      const dataUrl = canvas.toDataURL('image/png');

      if (action === 'download') {
        const link = document.createElement('a');
        link.download = `comercio-moz-design.png`;
        link.href = dataUrl;
        link.click();
      } else {
        await navigator.clipboard.writeText(dataUrl);
        toast({ title: 'Copiado!', description: 'A imagem do mockup foi copiada para a área de transferência.' });
      }
    } catch (error) {
      console.error('Failed to generate image:', error);
      toast({ variant: 'destructive', title: 'Erro', description: 'Não foi possível gerar a imagem do mockup.' });
    }
  }, [toast]);

  const isMockupReady = !!productImage;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <input
              type="file"
              ref={productImageInputRef}
              onChange={(e) => handleFileChange(e, 'product')}
              className="hidden"
              accept="image/*"
            />
             <input
              type="file"
              ref={designImageInputRef}
              onChange={(e) => handleFileChange(e, 'design')}
              className="hidden"
              accept="image/*"
            />
            
            <div className="lg:col-span-1">
              <ControlPanel
                onProductImageUploadClick={() => productImageInputRef.current?.click()}
                onDesignImageUploadClick={() => designImageInputRef.current?.click()}
                productImageFileName={productImageFileName}
                designImageFileName={designImageFileName}
                isMockupReady={isMockupReady}
                onDownload={() => generateImage('download')}
                text={text}
                onTextChange={setText}
                textColor={textColor}
                onTextColorChange={setTextColor}
                textFontSize={textFontSize}
                onTextFontSizeChange={setTextFontSize}
                textFontFamily={textFontFamily}
                onTextFontFamilyChange={setTextFontFamily}
              />
            </div>
            
            <div className="lg:col-span-2">
              <PreviewArea
                ref={previewRef}
                productImage={productImage}
                designImage={designImage}
                text={text}
                textColor={textColor}
                textFontSize={textFontSize}
                textFontFamily={textFontFamily}
                activeElement={activeElement}
                setActiveElement={setActiveElement}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
