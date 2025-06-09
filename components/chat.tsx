'use client';

import { generate } from '@/lib/action';
import {  useRef, useState } from 'react';

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
        <div className='w-full p-2 mb-8'>
          <pre className='inline-block text-wrap'>{answer}</pre>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            className="w-[50%] p-2 mb-8 border border-gray-300 rounded shadow-xl fixed bottom-0"
            ref={inputRef}
            placeholder="Write something..."
          />
        </form>
      </div>
    </div>
  );
}