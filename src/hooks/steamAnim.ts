'use client'

import { useEffect, useRef } from 'react';

interface WaveConfig {
  amplitude?: number;
  speed?: number;
  waveFactor?: number;
  basePhase?: number;
  timeScale?: number;
}

export function SteamAnim(
  pathRefs: React.RefObject<SVGPathElement | null>[], // массив рефов на path
  config: WaveConfig = {}
) {
  // Сохраняем конфиг с дефолтными значениями
  const {
    amplitude = 5,
    speed = 0.02,
    waveFactor = 0.02,
    basePhase = 0,
    timeScale = 300,
  } = config;

  // Используем useRef для хранения ID анимации, чтобы не терять при рендерах
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Проверяем, что все рефы привязаны к элементам
    const validPaths = pathRefs
      .map(ref => ref.current)
      .filter((el): el is SVGPathElement => el !== null);

    if (validPaths.length === 0) {
      console.warn('No valid path elements found for wave animation');
      return;
    }

    // Функция анимации
    const animate = (time: number) => {
      const t = time / timeScale; // нормализованное время

      validPaths.forEach((path, index) => {
        const originalD = path.getAttribute('d');
        if (!originalD) return;

        const phase = basePhase + index * 2; // можно кастомизировать
        const newD = applyWaveToPath(originalD, t, phase);
        path.setAttribute('d', newD);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Запускаем анимацию
    animationFrameRef.current = requestAnimationFrame(animate);

    // Очистка при размонтировании
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [pathRefs, amplitude, speed, waveFactor, basePhase, timeScale]); // зависимости

  // Вспомогательная функция (можно вынести за хук, если не нужно пересоздавать)
  const applyWaveToPath = (d: string, time: number, phase: number): string => {
    const commands = d.match(/[MLHVCSQTAZ][^MLHVCSQTAZ]*/gi) || [];

    const newCommands = commands.map(cmd => {
      const command = cmd[0];
      const numbers = cmd.slice(1).trim().split(/[\s,]+/).filter(Boolean).map(Number);

      if (numbers.length === 0) return cmd;

      const newNumbers: number[] = [];
      for (let i = 0; i < numbers.length; i++) {
        if (i % 2 === 0) {
          const x = numbers[i];
          const y = numbers[i + 1];
          const offset = amplitude * Math.sin(time * speed + y * waveFactor + phase);
          newNumbers.push(x + offset);
        } else {
          newNumbers.push(numbers[i]);
        }
      }
      return command + ' ' + newNumbers.join(' ');
    });

    return newCommands.join(' ');
  };
}