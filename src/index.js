import anime from '../lib/anime.es.js';

let dotsWrapperEl = document.querySelector('.dots-wrapper');
let dotsFragment = document.createDocumentFragment();
let staggerPlaying = false;
let pulsePlaying = true;

const grey = '#1f2427';
const blue = '#606F80';
const pink = '#7F5F6F';

const playStagger = (id, grid, colour) => {
    if (!staggerPlaying) {
        anime({
            targets: '.stagger-visualizer .dot',
            background: [
                {
                    value: colour,
                    easing: 'easeOutSine',
                    duration: 500
                },
                {
                    value: grey,
                    easing: 'easeInOutQuad',
                    duration: 1200
                }
            ],
            delay: anime.stagger(40, { grid: grid, from: id }),
            begin: () => {
                staggerPlaying = true;
            },
            complete: () => {
                staggerPlaying = false;
                if (pulsePlaying) {
                    document.querySelectorAll('.dot').forEach(el => {
                        el.pulse.restart();
                    });
                }
            }
        });
    }
};

const resizeHandler = () => {
    anime.remove('.stagger-visualizer .dot');
    document.querySelector('.dots-wrapper').innerHTML = '';
    staggerPlaying = false;
    dotsWrapperEl = document.querySelector('.dots-wrapper');
    dotsFragment = document.createDocumentFragment();
    const grid = [parseInt(window.innerWidth / 47), parseInt(window.innerHeight / 47)];
    // tfw ES6
    [...Array(grid.reduce((X, D) => X * D)).keys()].map(i => {
        const colour = Math.floor(Math.random() * 2) % 2 === 0 ? blue : pink;
        const dotEl = document.createElement('svg');
        dotEl.id = i;
        dotEl.classList.add('dot');
        dotEl.pulse = anime({
            targets: dotEl,
            background: [grey, colour],
            delay: Math.floor(Math.random() * 21 * grid[0] * grid[1]),
            easing: 'easeInOutQuad',
            loop: true,
            direction: 'alternate'
        });
        dotEl.addEventListener('click', () => {
            playStagger(dotEl.id, grid, colour);
        });
        dotsFragment.appendChild(dotEl);
    });

    dotsWrapperEl.appendChild(dotsFragment);
};

document.querySelector('.toggle').onclick = () => {
    if (pulsePlaying) {
        document.querySelectorAll('.dot').forEach(el => {
            el.pulse.restart();
            el.pulse.pause();
        });
        pulsePlaying = false;
        document.querySelector('.toggle').innerHTML = 'Start Animation';
    } else {
        document.querySelectorAll('.dot').forEach(el => {
            el.pulse.restart();
        });
        pulsePlaying = true;
        document.querySelector('.toggle').innerHTML = 'Stop Animation';
    }
};
resizeHandler();
window.addEventListener('resize', resizeHandler);
