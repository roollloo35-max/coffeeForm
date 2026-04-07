// hooks/useSteamAnim.ts
'use client';

import { useEffect, useRef, useCallback } from 'react';

interface WaveConfig {
  amplitude?: number;
  speed?: number;
  waveFactor?: number;
  basePhase?: number;
  timeScale?: number;
  fps?: number;
}

// Парсинг команд (один раз)
function parsePathCommands(d: string): Array<{ type: string; numbers: number[] }> {
  const commands: Array<{ type: string; numbers: number[] }> = [];
  const regex = /([MLHVCSQTAZ])([^MLHVCSQTAZ]*)/gi;
  let match;
  while ((match = regex.exec(d)) !== null) {
    const type = match[1];
    const numbers = match[2].trim().split(/[\s,]+/).filter(Boolean).map(Number);
    if (numbers.length) commands.push({ type, numbers });
  }
  return commands;
}

function buildPathFromCommands(
  commands: Array<{ type: string; numbers: number[] }>,
  time: number,
  amplitude: number,
  speed: number,
  waveFactor: number,
  phaseOffset: number
): string {
  const newCommands = commands.map(cmd => {
    const { type, numbers } = cmd;
    const newNumbers = [...numbers];
    for (let i = 0; i < numbers.length; i += 2) {
      const x = numbers[i];
      const y = numbers[i + 1];
      const offset = amplitude * Math.sin(time * speed + y * waveFactor + phaseOffset);
      newNumbers[i] = x + offset;
    }
    return type + ' ' + newNumbers.join(' ');
  });
  return newCommands.join(' ');
}

export function SteamAnim(
  pathRefs: React.RefObject<SVGPathElement | null>[],
  config: WaveConfig = {}
) {
  const {
    amplitude = 5,
    speed = 0.02,
    waveFactor = 0.02,
    basePhase = 0,
    timeScale = 300,
    fps = 30,
  } = config;

  const frameInterval = 1000 / fps;
  const animationRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number>(0);
  // Храним кэшированные команды и оригинальные строки
  const cacheRef = useRef<Array<{
    element: SVGPathElement;
    commands: ReturnType<typeof parsePathCommands>;
    originalD: string;
  }>>([]);
  // Флаг, жив ли компонент
  const isMountedRef = useRef(true);

  useEffect(() => {
    // Сбрасываем флаг при монтировании
    isMountedRef.current = true;

    // Собираем актуальные элементы
    const elements = pathRefs
      .map(ref => ref.current)
      .filter((el): el is SVGPathElement => el !== null);

    if (elements.length === 0) {
      console.warn('No SVGPathElement found for animation');
      return;
    }

    // Кэшируем исходные данные
    cacheRef.current = elements.map(el => ({
      element: el,
      commands: parsePathCommands(el.getAttribute('d') || ''),
      originalD: el.getAttribute('d') || '',
    }));

    // Проверяем корректность fps
    if (frameInterval <= 0) {
      console.error('Invalid fps, must be >0');
      return;
    }

    const animate = (timestamp: number) => {
      // Если компонент размонтирован, прекращаем анимацию
      if (!isMountedRef.current) return;

      const delta = timestamp - lastTimestampRef.current;
      if (delta >= frameInterval) {
        const t = timestamp / timeScale;
        cacheRef.current.forEach(({ element, commands }, idx) => {
          const phase = basePhase + idx * 2;
          const newD = buildPathFromCommands(
            commands,
            t,
            amplitude,
            speed,
            waveFactor,
            phase
          );
          element.setAttribute('d', newD);
        });
        lastTimestampRef.current = timestamp;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    lastTimestampRef.current = performance.now();
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      // Убираем флаг, чтобы остановить новые кадры
      isMountedRef.current = false;
      // Отменяем анимационный цикл
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      // Восстанавливаем оригинальные d атрибуты
      cacheRef.current.forEach(({ element, originalD }) => {
        if (originalD) element.setAttribute('d', originalD);
      });
      // Очищаем кэш
      cacheRef.current = [];
    };
  }, [amplitude, speed, waveFactor, basePhase, timeScale, frameInterval]);

}