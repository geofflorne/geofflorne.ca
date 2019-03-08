import anime from '../lib/anime.es.js';

let dotsWrapperEl = document.querySelector('.dots-wrapper');
let dotsFragment = document.createDocumentFragment();
let staggerPlay = false;
let pulsePlay = true;

const play = (id, grid, colour) => {
    if (!staggerPlay) {
        anime({
            targets: '.stagger-visualizer .dot',
            background: [
                {
                    value: colour,
                    easing: 'easeOutSine',
                    duration: 500
                },
                {
                    value: '#1f2427',
                    easing: 'easeInOutQuad',
                    duration: 1200
                }
            ],
            delay: anime.stagger(40, { grid: grid, from: id }),
            begin: () => {
                staggerPlay = true;
            },
            complete: () => {
                staggerPlay = false;
                if (pulsePlay) {
                    document.querySelectorAll('.dot').forEach(el => {
                        el.pulse.restart();
                    });
                }
            }
        });
    }
};

const resize = () => {
    anime.remove('.stagger-visualizer .dot');
    document.querySelector('.dots-wrapper').innerHTML = '';
    staggerPlay = false;
    dotsWrapperEl = document.querySelector('.dots-wrapper');
    dotsFragment = document.createDocumentFragment();
    const grid = [
        parseInt(window.innerWidth / 47),
        parseInt(window.innerHeight / 47)
    ];
    // tfw ES6
    [...Array(grid.reduce((X, D) => X * D)).keys()].map(i => {
        const colour = i % 2 === 0 ? '#606F80' : '#7F5F6F';
        const dotEl = document.createElement('svg');
        dotEl.id = i;
        dotEl.classList.add('dot');
        dotEl.pulse = anime({
            targets: dotEl,
            background: ['#1f2427', colour],
            delay: Math.floor(Math.random() * 21 * grid[0] * grid[1]),
            easing: 'easeInOutQuad',
            loop: true,
            direction: 'alternate'
        });
        dotEl.addEventListener('click', () => {
            play(dotEl.id, grid, colour);
        });
        dotsFragment.appendChild(dotEl);
    });

    dotsWrapperEl.appendChild(dotsFragment);
};

document.querySelector('.toggle').onclick = () => {
    if (pulsePlay) {
        document.querySelectorAll('.dot').forEach(el => {
            el.pulse.restart();
            el.pulse.pause();
        });
        pulsePlay = false;
        document.querySelector('.toggle').innerHTML = 'Start Animation';
    } else {
        document.querySelectorAll('.dot').forEach(el => {
            el.pulse.restart();
        });
        pulsePlay = true;
        document.querySelector('.toggle').innerHTML = 'Stop Animation';
    }
};
resize();
window.addEventListener('resize', resize);
