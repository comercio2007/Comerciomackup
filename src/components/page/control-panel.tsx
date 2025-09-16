'use client';

import type { FC } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Download, Share2, Type, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const fontColors = ['#ffffff', '#000000', '#ef4444', '#f97316', '#84cc16', '#22c55e', '#3b82f6', '#8b5cf6'];
const fontStyles = [
  { id: 'inter', name: 'Inter' },
  { id: 'arial', name: 'Arial' },
  { id: 'times new roman', name: 'Times' },
  { id: 'monospace', name: 'Monospace' },
];


interface ControlPanelProps {
  onProductImageUploadClick: () => void;
  onDesignImageUploadClick: () => void;
  productImageFileName: string;
  designImageFileName: string;
  isMockupReady: boolean;
  onDownload: () => void;
  text: string;
  onTextChange: (text: string) => void;
  textColor: string;
  onTextColorChange: (color: string) => void;
  textFontSize: number;
  onTextFontSizeChange: (size: number) => void;
  textFontFamily: string;
  onTextFontFamilyChange: (font: string) => void;
}

const ControlPanel: FC<ControlPanelProps> = ({
  onProductImageUploadClick,
  onDesignImageUploadClick,
  productImageFileName,
  designImageFileName,
  isMockupReady,
  onDownload,
  text,
  onTextChange,
  textColor,
  onTextColorChange,
  textFontSize,
  onTextFontSizeChange,
  textFontFamily,
  onTextFontFamilyChange,
}) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Personalize o seu produto</CardTitle>
        <CardDescription>Carregue um produto, um design e adicione texto.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">1. Carregue a Imagem do Produto</h3>
          <Button variant="outline" className="w-full justify-start" onClick={onProductImageUploadClick}>
            <Upload className="mr-2 h-4 w-4" />
            {productImageFileName ? 'Alterar imagem do produto...' : 'Escolha a imagem do produto'}
          </Button>
          {productImageFileName && (
            <div className="flex items-center text-sm text-muted-foreground bg-muted p-2 rounded-md">
              <span className="truncate">{productImageFileName}</span>
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">2. Carregue o Design</h3>
          <Button variant="outline" className="w-full justify-start" onClick={onDesignImageUploadClick}>
            <Upload className="mr-2 h-4 w-4" />
            {designImageFileName ? 'Alterar imagem de design...' : 'Escolha uma imagem de design'}
          </Button>
          {designImageFileName && (
            <div className="flex items-center text-sm text-muted-foreground bg-muted p-2 rounded-md">
              <span className="truncate">{designImageFileName}</span>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">3. Adicionar Texto</h3>
          <div className="space-y-2">
            <Label htmlFor="custom-text">Texto</Label>
            <Textarea 
              id="custom-text"
              placeholder="Escreva algo..."
              value={text}
              onChange={(e) => onTextChange(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Cor da Fonte</Label>
            <div className="flex flex-wrap gap-2">
              {fontColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={cn(
                    'w-8 h-8 rounded-full border-2 transition-transform transform hover:scale-110',
                    textColor === color ? 'border-primary ring-2 ring-primary' : 'border-transparent'
                  )}
                  style={{ backgroundColor: color }}
                  onClick={() => onTextColorChange(color)}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="font-size">Tamanho da Fonte</Label>
            <Input 
              id="font-size"
              type="number"
              value={textFontSize}
              onChange={(e) => onTextFontSizeChange(Number(e.target.value))}
              className="w-24"
              min="8"
              max="128"
            />
          </div>
          <div className="space-y-2">
            <Label>Estilo da Fonte</Label>
            <div className="grid grid-cols-2 gap-2">
              {fontStyles.map(style => (
                 <Button
                  key={style.id}
                  variant={textFontFamily === style.id ? 'default' : 'outline'}
                  onClick={() => onTextFontFamilyChange(style.id)}
                  className="text-xs"
                >
                  {style.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

      </CardContent>
      {isMockupReady && (
        <CardFooter className="flex flex-col gap-2">
           <Button
            size="lg"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={onDownload}
          >
            <Download className="mr-2 h-4 w-4" />
            Baixar mockup
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ControlPanel;
