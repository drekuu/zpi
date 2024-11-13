'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

export default function PhotographerCard() {

  const t = useTranslations('Profile');

    return (
        <header className="flex overflow-hidden z-0 flex-wrap gap-8 justify-center items-start self-center px-4 py-5 max-md:max-w-full">
        <div className="flex overflow-hidden flex-col rounded-[62px] w-[162px]">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/249cd5c96dc56d8e681e7b0738b1bea85626c4857f6555d86b703780286d76f2?placeholderIfAbsent=true&apiKey=3db36c7a47f0421d9f87c365488106cc"
            alt="Profile picture"
            className="object-contain aspect-square w-[162px]"
          />
        </div>
        <div className="flex overflow-hidden flex-col items-start px-16 pt-1.5 pb-9 text-xs text-black min-w-[240px] w-[558px] max-md:px-5 max-md:max-w-full">
          <h1 className="text-3xl font-bold">John Smith</h1>
          <div className="flex gap-3.5 mt-9 whitespace-nowrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/42e2e8b41e97357bcf762e7b3bad1764079651fc52e658834c0d5cc37d611aaa?placeholderIfAbsent=true&apiKey=3db36c7a47f0421d9f87c365488106cc"
              alt=""
              className="object-contain shrink-0 w-4 aspect-square"
            />
            <span className="basis-auto">john.smith@gmail.com</span>
          </div>
          <h2 className="mt-6 text-neutral-400">About Me</h2>
          <p className="mt-3">Photographer from NY</p>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/15aa52452845a2276342ff034070a4a21de03c1e64e32649061193e993637cfd?placeholderIfAbsent=true&apiKey=3db36c7a47f0421d9f87c365488106cc"
          alt=""
          className="object-contain shrink-0 w-6 aspect-square"
        />
      </header>
    );
  };
