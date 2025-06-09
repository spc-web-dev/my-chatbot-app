'use client';

import { generate } from '@/lib/action';
import {  useRef, useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';

export default function Chat() {
  const [answer,setAnswer] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await generate(inputRef.current?.value || '');
      if (response.textStream) {
        for await (const chunk of response.textStream) {
          setAnswer(prev => prev + chunk);
        }
      }
    inputRef.current!.value = '';
    inputRef.current!.focus();
  }
  return (
    <div className="w-full h-screen flex justify-center p-10">
      <div className='w-[90%] relative h-full'>
        <div className='fixed top-0 left-0 w-full h-16 flex items-center justify-center'>
          <h1 className='py-2 px-5 bg-neutral-400 rounded-md'>Chat with AI. this ai chatbot created by ressann.</h1>
        </div>
        <div className='w-full p-2 mb-8 pb-30'>
          <pre className='inline-block text-wrap'>{answer}</pre>
        </div>

        <form onSubmit={handleSubmit} className='fixed bottom-0 backdrop-blur-sm w-full'>
          <input
            className="w-[50%] p-2 mb-8 border border-gray-300 rounded shadow-xl "
            ref={inputRef}
            placeholder="Write something..."
          />
          <Button type='submit'><Search/></Button>
        </form>
      </div>
    </div>
  );
}