'use strict';
import anime from '../lib/anime.es.js';
const resize = () => {
    document.querySelector('.dots-wrapper').innerHTML = '';
    let playing = false;
    const dotsWrapperEl = document.querySelector('.dots-wrapper');
    const dotsFragment = document.createDocumentFragment();
    const grid = [
        parseInt(window.innerWidth / 47),
        parseInt(window.innerHeight / 47)
    ];
    // tfw ES6
    [...Array(grid.reduce((x, y) => x * y)).keys()].map(i => {
        const dotEl = document.createElement('svg');
        dotEl.id = i;
        dotEl.classList.add('dot');
        dotEl.pulse = anime({
            targets: dotEl,
            background: ['#1f2427', '#413139'],
            delay: Math.floor(Math.random() * grid[0] * grid[1] * 21),
            easing: 'easeInOutQuad',
            loop: true,
            direction: 'alternate'
        });
        dotEl.addEventListener('click', function play() {
            if (!playing) {
                anime({
                    targets: '.stagger-visualizer .dot',
                    background: [
                        {
                            value: '#413139',
                            easing: 'easeOutSine',
                            duration: 500
                        },
                        {
                            value: '#1f2427',
                            easing: 'easeInOutQuad',
                            duration: 1200
                        }
                    ],
                    delay: anime.stagger(40, { grid: grid, from: this.id }),
                    begin: () => {
                        playing = true;
                        // pulse.stop();
                    },
                    complete: () => {
                        playing = false;
                        document.querySelectorAll('.dot').forEach(el => {
                            el.pulse.restart();
                        });
                    }
                });
            }
        });
        dotsFragment.appendChild(dotEl);
    });
    dotsWrapperEl.appendChild(dotsFragment);
    // document.querySelector('.start').onclick = () => {
    //     document.querySelectorAll('.dot').forEach(el => {
    //         el.pulse.play();
    //     });
    // };
    // document.querySelector('.stop').onclick = () => {
    //     document.querySelectorAll('.dot').forEach(el => {
    //         el.pulse.restart();
    //         el.pulse.pause();
    //     });
    // };
};
resize();
window.addEventListener('resize', resize);
