'use client';

import { useEffect, useRef } from 'react';

interface HeroCanvasProps {
    colors?: string[];
    density?: number;
    speed?: number;
    className?: string;
}

interface StreamParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    hue: number;
    life: number;
    maxLife: number;
}

export default function HeroCanvas({
    colors = ['#f472b6', '#818cf8', '#22d3ee', '#fcd34d'],
    density = 160,
    speed = 1.15,
    className,
}: HeroCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        resizeCanvas();

        const particles: StreamParticle[] = [];
        const createParticle = () => {
            const angle = Math.random() * Math.PI * 2;
            const speedFactor = speed * (Math.random() * 0.6 + 0.4);

            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: Math.cos(angle) * speedFactor,
                vy: Math.sin(angle) * speedFactor,
                radius: Math.random() * 2 + 1,
                hue: Math.random() * 360,
                life: 0,
                maxLife: Math.random() * 120 + 60,
            };
        };

        const targetCount = Math.floor((canvas.width * canvas.height) / (8000 / (density / 100)));
        for (let i = 0; i < targetCount; i++) {
            particles.push(createParticle());
        }

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        colors.forEach((color, index) => {
            gradient.addColorStop(index / Math.max(colors.length - 1, 1), color);
        });

        let animationId: number;
        const animate = () => {
            ctx.fillStyle = 'rgba(8, 16, 40, 0.28)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle, idx) => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.life += 1;

                if (particle.x < -50) particle.x = canvas.width + 50;
                if (particle.x > canvas.width + 50) particle.x = -50;
                if (particle.y < -50) particle.y = canvas.height + 50;
                if (particle.y > canvas.height + 50) particle.y = -50;

                if (particle.life >= particle.maxLife) {
                    particles[idx] = createParticle();
                    return;
                }

                const fade = 1 - particle.life / particle.maxLife;

                ctx.beginPath();
                ctx.fillStyle = `hsla(${particle.hue}, 85%, 68%, ${0.65 * fade})`;
                ctx.shadowColor = `hsla(${particle.hue}, 90%, 75%, 0.4)`;
                ctx.shadowBlur = 12;
                ctx.arc(particle.x, particle.y, particle.radius * (1 + fade), 0, Math.PI * 2);
                ctx.fill();

                ctx.beginPath();
                ctx.strokeStyle = `hsla(${particle.hue}, 70%, 60%, ${0.2 * fade})`;
                ctx.lineWidth = 1.2;
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(particle.x - particle.vx * 12, particle.y - particle.vy * 12);
                ctx.stroke();
            });

            ctx.lineWidth = 0.6;
            particles.forEach((particle, i) => {
                for (let j = i + 1; j < particles.length; j++) {
                    const other = particles[j];
                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        const connectionAlpha = 1 - distance / 150;
                        ctx.strokeStyle = `rgba(129, 140, 248, ${connectionAlpha * 0.55})`;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.stroke();
                    }
                }
            });

            ctx.fillStyle = gradient;
            ctx.globalCompositeOperation = 'overlay';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = 'source-over';

            animationId = requestAnimationFrame(animate);
        };

        animate();

        window.addEventListener('resize', resizeCanvas);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [colors, density, speed]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 h-full w-full pointer-events-none mix-blend-screen opacity-80 ${className || ''}`}
        />
    );
}

