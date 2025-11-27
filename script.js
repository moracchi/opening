/* ファイル名: script.js */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================
       30秒後のリダイレクト設定
       ========================================== */
    const REDIRECT_URL = "https://moracchi.github.io/Sponsorship-List/";
    const REDIRECT_DELAY_MS = 30000; 

    setTimeout(() => {
        document.body.style.transition = "opacity 1s ease";
        document.body.style.opacity = "0";
        setTimeout(() => {
            window.location.href = REDIRECT_URL;
        }, 1000); 
    }, REDIRECT_DELAY_MS);

    /* ==========================================
       背景パーティクル描画処理（高輝度設定）
       ========================================== */
    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];
    
    const PARTICLE_COUNT = 150; 
    const GOLD_RATIO = 0.5; // 半分を金色に

    const resize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    };

    class Particle {
        constructor() {
            this.init();
        }

        init() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            // プロジェクター用にサイズを全体的に大きくする
            this.size = Math.random() * 5.0 + 1.5; 
            this.speedY = Math.random() * 0.8 + 0.2;
            this.speedX = Math.random() * 0.6 - 0.3;
            
            this.isGold = Math.random() < GOLD_RATIO;
            
            if (this.isGold) {
                // 明るいイエローゴールド
                this.color = `rgba(255, 235, 100, ${Math.random() * 0.7 + 0.3})`;
                this.shadowBlur = 20; // グローを強烈に
            } else {
                // 純白
                this.color = `rgba(255, 255, 255, ${Math.random() * 0.6 + 0.4})`;
                this.shadowBlur = 10;
            }
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;

            if (this.y > height) {
                this.y = -10;
                this.x = Math.random() * width;
            }
            if (this.x > width) this.x = 0;
            if (this.x < 0) this.x = width;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            
            ctx.shadowBlur = this.shadowBlur;
            // 影の色も明るく
            ctx.shadowColor = this.isGold ? '#ffffaa' : '#ffffff';
            
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    const initParticles = () => {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Particle());
        }
    };

    const animate = () => {
        ctx.clearRect(0, 0, width, height);
        
        // 合成モードを加算にして、重なった部分をより明るく光らせる
        ctx.globalCompositeOperation = 'lighter'; 
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        ctx.globalCompositeOperation = 'source-over'; // 戻す

        requestAnimationFrame(animate);
    };

    window.addEventListener('resize', () => {
        resize();
        initParticles();
    });

    resize();
    initParticles();
    animate();
});
