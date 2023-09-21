import React, { ChangeEvent, useMemo, useState } from 'react';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { FileVideo, Upload } from 'lucide-react';

export const VideoInputForm: React.FC = () => {
  const [ videoFile, setVideoFile ] = useState<File | null>(null)

  const handeFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget

    if (!files) {
      return  
    }
    
    const selectedFile = files[0]

    setVideoFile(selectedFile)
  }

  const previewUrl = useMemo(() => {
    if (!videoFile) {
      return null
    }

    return URL.createObjectURL(videoFile)
  }, [videoFile])

  return (
    <form className="space-y-6">
      <label 
        htmlFor="video" 
        className="relative border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center hover:bg-primary/5"
      >
        {previewUrl ? (
          <video src={previewUrl} controls={false} className="pointer-events-none absolute inset-0" />
        ) : (
          <>
            <FileVideo className="w-4 h-4"/>
            Selecione um vídeo
          </>
        )}
      </label>
      <input 
        type="file" 
        id="video" 
        accept="video/mp4" 
        className="sr-only"
        onChange={handeFileSelected}
      />
  
      <Separator/>

      <div className="space-y-2">
        <Label htmlFor="transcription_prompt">
          Prompt de transcrição
        </Label>
        <Textarea 
          id="transcription_prompt" 
          className="h-20 leading-relaxed resize-none"
          placeholder="Inclua palavas-chave mencionadas no video por virgula (,)"
        />
      </div>
      <Button type="submit" className="w-full">
        Carregar vídeo 
        <Upload className="h-4 w-4 ml-2"/>
      </Button>
    </form>
  )
}