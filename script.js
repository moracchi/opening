/* ファイル名: script.js */

// DOMの読み込み完了後に実行
document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================
       30秒後のリダイレクト設定
       ========================================== */
    const REDIRECT_URL = "https://moracchi.github.io/Sponsorship-List/";
    const REDIRECT_DELAY_MS = 30000; // 30秒 (ミリ秒指定)

    setTimeout(() => {
        // フェードアウト効果をつけて遷移（オプション）
        document.body.style.transition = "opacity 1s ease";
        document.body.style.opacity = "0";
        
        setTimeout(() => {
            window.location.href = REDIRECT_URL;
        }, 1000); // フェードアウト後に移動
    }, REDIRECT_DELAY_MS);


    /* ==========================================
       背景パーティクル（雪・金粉）描画処理
       ========================================== */
    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];
    
    const PARTICLE_COUNT = 180; // 少し増やしてリッチに
    const GOLD_RATIO = 0.4; // 金色の割合を増加

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
            // サイズに変化をつけて遠近感を出す
            this.size = Math.random() * 3.5 + 0.5; 
            this.speedY = Math.random() * 0.8 + 0.2;
            this.speedX = Math.random() * 0.6 - 0.3;
            
            this.isGold = Math.random() < GOLD_RATIO;
            
            if (this.isGold) {
                // より明るいゴールド
                this.color = `rgba(255, 215, 0, ${Math.random() * 0.6 + 0.3})`;
                this.shadowBlur = 15; // 輝きを強く
            } else {
                this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`;
                this.shadowBlur = 8;
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
            ctx.shadowColor = this.isGold ? '#ffdf00' : '#ffffff';
            
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
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

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
