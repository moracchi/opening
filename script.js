/* ファイル名: script.js */

// DOMの読み込み完了後に実行
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];
    
    // 設定値
    const PARTICLE_COUNT = 150; // 雪と金粉の数
    const GOLD_RATIO = 0.3; // 3割を金色の粒子にする

    // リサイズ処理
    const resize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    };

    // パーティクルクラス
    class Particle {
        constructor() {
            this.init();
        }

        init() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            // 奥行きを表現するためにサイズにランダム性を
            this.size = Math.random() * 3 + 0.5; 
            // 落下速度
            this.speedY = Math.random() * 1 + 0.2;
            this.speedX = Math.random() * 0.6 - 0.3;
            
            // 種類（雪か金粉か）
            this.isGold = Math.random() < GOLD_RATIO;
            
            if (this.isGold) {
                this.color = `rgba(212, 175, 55, ${Math.random() * 0.5 + 0.2})`; // ゴールド
                this.shadowBlur = 10;
            } else {
                this.color = `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.1})`; // 白（雪）
                this.shadowBlur = 5;
            }
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;

            // 画面外に出たらリセット（上に戻す）
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
            
            // グロー効果（処理が重くなる場合はオフに調整可能）
            ctx.shadowBlur = this.shadowBlur;
            ctx.shadowColor = this.isGold ? '#ffd700' : '#ffffff';
            
            ctx.fill();
            ctx.shadowBlur = 0; // リセット
        }
    }

    // 初期化
    const initParticles = () => {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Particle());
        }
    };

    // アニメーションループ
    const animate = () => {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animate);
    };

    // イベントリスナー設定
    window.addEventListener('resize', () => {
        resize();
        initParticles(); // リサイズ時に再配置
    });

    // 実行開始
    resize();
    initParticles();
    animate();
});
