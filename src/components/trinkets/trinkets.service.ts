 import { Injectable } from '@angular/core';

import { GlassComponent } from './glass/glass';
import { EyesComponent } from './eyes/eyes';
import { HoodComponent } from './hood/hood';
import { MoleComponent } from './mole/mole';
import { HeartComponent } from './heart/heart';
import { BeardComponent } from './beard/beard';
import { MoustacheComponent } from './moustache/moustache';
import { SnivelComponent } from './snivel/snivel';
import { DressComponent } from './dress/dress';
import { BraComponent } from './bra/bra';
import { WigComponent } from './wig/wig';
import { LipsComponent } from './lips/lips';
import { LollipopComponent } from './lollipop/lollipop';
import { EggComponent } from './egg/egg';
import { EarringsComponent } from './earrings/earrings';

const zombieJoyAnimBefore = (monster, repo, instance) => {
  const filtered = repo.getCopies().filter(i => {
      if(i.meta.onScreen) {
        return i.onMonster && i.meta.emotion === 'joyful';
      }

      return i.meta.emotion === 'joyful';
  });

  const onMonster = monster.isOnMonster( instance.getBoundingClientRect() );

  if(monster.animate() && filtered.length === 0 && monster.getEmotion() !== 'joyful' && onMonster) {
    monster.makeJoyjul();

    const smile = monster.animate('smile')(true)();
    const smileLids = monster.animate('smileLids')(true)();
  };

  return;
}

const zombieJoyAnimAfter = (monster, repo, instance) => {
  const filtered = repo.getCopies().filter(i => {
      if(i.meta.onScreen) {
        return i.onMonster && i.meta.emotion === 'joyful';
      }

      return i.meta.emotion === 'joyful';
  });

  if(monster.animate() && filtered.length === 0 && monster.getEmotion() === 'joyful') {
    monster.clearEmotion()

    const smile = monster.animate('smile')(false)();
    const smileLids = monster.animate('smileLids')(false)();
  }
}

@Injectable()
export class TrinketsService {
  constructor() {
  }
  getTrinkets() {
    return [
      {
        id: 15,
        component: EarringsComponent,
        meta: {
          container: 'ears',
          uniq: true,
          before: (monster, repo, instance) => {
            monster.open('ears');
          },
          after: (monster, repo, instance) => {
            if(!['doctor', 'vampire', 'yeti', 'wolf'].includes(monster.name)) {
              monster.close('ears');
            }
          },
          attr: {
            width: {
              default: ({width}) => width * 1.5,
              skeleton: ({width}) => 150.972 * 1.4,
              zombie: ({width}) => 30.9,
              mummy: ({width}) => 182.231 * 1.1,
              yaga: ({width}) => 74.1,
              doctor: ({width}) => 121.678 * 1.2,
              spider: ({width}) => 139.306 * 1.2,
              alien: ({width}) => 179.948 * 1.05,
              vampire: ({width}) => 84.972 * 1.1,
              yeti: ({width}) => 179.827,
              ghost: ({width}) => 213.687,
              wolf: ({width}) => 104.50,
              bed: ({width}) => 79.667,
            },
            height: {
              default: ({height}) => height * 1.5,
              skeleton: ({height}) => 26.887 * 1.4,
              zombie: ({height}) => 46.233,
              mummy: ({height}) => 46.233 * 1.1,
              yaga: ({height}) => 19.844,
              doctor: ({height}) => 37.141 *1.2,
              spider: ({height}) => 100.455 * 1.2,
              alien: ({height}) => 26.887 * 1.05,
              vampire: ({height}) => 26.887 * 1.1,
              yeti: ({height}) => 37.141,
              ghost: ({height}) => 44.04,
              wolf: ({height}) => 40.501,
              bed: ({height}) => 23.187,
            },
            x: {
              default: ({x, width}) => (x - (width * 1.5) / 2) + width / 2,
              skeleton: ({x, width}) => (x - (150.972 * 1.4) / 2) + width / 2,
              zombie: ({x, width}) => (x - (30.9) / 2) + width / 2,
              mummy: ({x, width}) => (x - (74.062) / 2) + width / 2,
              yaga: ({x, width}) => ((x - (74.1 * 1.1) / 2) + width / 2) + 3,
              doctor: ({x, width}) => (x - (121.678 * 1.2) / 2) + width / 2,
              spider: ({x, width}) => (x - (139.3 * 1.2) / 2) + width / 2,
              alien: ({x, width}) => (x - (179.948 * 1.05) / 2) + width / 2,
              vampire: ({x, width}) => (x - (84.972 * 1.1) / 2) + width / 2,
              yeti: ({x, width}) => (x - (179.827) / 2) + width / 2,
              ghost: ({x, width}) => (x - (213.687) / 2) + width / 2,
              wolf: ({x, width}) => (x - (104.50) / 2) + width / 2,
              bed: ({x, width}) => (x - (79.667) / 2) + width / 2,
            },
            y: {
              default: ({y, height}) => (y - (height * 1.5) / 2) + height / 2,
              skeleton: ({y, height}) => y + 22,
              zombie: ({y, height}) => y + 20,
              mummy: ({y, height}) => y + 35,
              yaga: ({y, height}) => y + 23,
              doctor: ({y, height}) => y + 30,
              spider: ({y, height}) => y + 15,
              alien: ({y, height}) => y + 22,
              vampire: ({y, height}) => y + 30,
              yeti: ({y, height}) => y + 15,
              ghost: ({y, height}) => y + 45,
              wolf: ({y, height}) => y + 10,
              bed: ({y, height}) => y + 20,
            }
          }
        }
      },
      {
        id: 14,
        component: EggComponent,
        meta: {
          container: { name: 'outer', mod: 'forward' },
          uniq: true,
          before: (monster, repo, instance) => {

          },
          after: (monster, repo, instance) => {

          },
          attr: {
            width: {
              default: ({width}) => width * 1.5,
              skeleton: ({width}) => 225.9 * 1.1,
              zombie: ({width}) => 238.8,
              mummy: ({width}) => 210.98,
              yaga: ({width}) => 222.231,
              doctor: ({width}) => 228.369,
              spider: ({width}) => 159.738,
              alien: ({width}) => 199.879,
              vampire: ({width}) => 234.296,
              yeti: ({width}) => 241.66,
              ghost: ({width}) => 205.639,
              wolf: ({width}) => 228.77,
              bed: ({width}) => 242.647,
            },
            height: {
              default: ({height}) => height * 1.5,
              skeleton: ({height}) => 266.416 * 1.1,
              zombie: ({height}) => 220.19,
              mummy: ({height}) => 246.6,
              yaga: ({height}) => 212.065,
              doctor: ({height}) => 208.781,
              spider: ({height}) => 237.555,
              alien: ({height}) => 246.747,
              vampire: ({height}) => 235.648,
              yeti: ({height}) => 257.487,
              ghost: ({height}) => 259.417,
              wolf: ({height}) => 233.316,
              bed: ({height}) => 231.647,
            },
            x: {
              default: ({x, width}) => (x - (width * 1.5) / 2) + width / 2,
              skeleton: ({x, width}) => -25,
              zombie: ({x, width}) => -20,
              mummy: ({x, width}) => 5,
              yaga: ({x, width}) => -30,
              doctor: ({x, width}) => -40,
              spider: ({x, width}) => 70,
              alien: ({x, width}) => -20,
              vampire: ({x, width}) => -20,
              yeti: ({x, width}) => 10,
              ghost: ({x, width}) => 20,
              wolf: ({x, width}) => 5,
              bed: ({x, width}) => -20,
            },
            y: {
              default: ({y, height}) => (y - (height * 1.5) / 2) + height / 2,
              skeleton: ({y, height}) => -10,
              zombie: ({y, height}) => y,
              mummy: ({y, height}) => -10,
              yaga: ({y, height}) => 30,
              doctor: ({y, height}) => 80,
              spider: ({y, height}) => 50,
              alien: ({y, height}) => -20,
              vampire: ({y, height}) => 40,
              yeti: ({y, height}) => -20,
              ghost: ({y, height}) => -10,
              wolf: ({y, height}) => -5,
              bed: ({y, height}) => 20,
            }
          }
        }
      },
      {
        id: 13,
        component: LollipopComponent,
        meta: {
          container: 'mouth',
          uniq: true,
          before: (monster, repo, instance) => {

          },
          after: (monster, repo, instance) => {

          },
          attr: {
            width: {
              default: ({width}) => width * 1.5,
              skeleton: ({width}) => 69.96,
              zombie: ({width}) => 99.1,
              mummy: ({width}) => 101.163,
              yaga: ({width}) => 36,
              doctor: ({width}) => 36.07,
              spider: ({width}) => 113,
              alien: ({width}) => 75.84,
              vampire: ({width}) => 74.68,
              yeti: ({width}) => 91.884,
              ghost: ({width}) => 98.34,
              wolf: ({width}) => 36.06,
              bed: ({width}) => 63.77,
            },
            height: {
              default: ({height}) => height * 1.5,
              skeleton: ({height}) => 104.667,
              zombie: ({height}) => 72.6,
              mummy: ({height}) => 89.37,
              yaga: ({height}) => 124.9,
              doctor: ({height}) => 66.44,
              spider: ({height}) => 140.9,
              alien: ({height}) => 70.92,
              vampire: ({height}) => 72.17,
              yeti: ({height}) => 44.3,
              ghost: ({height}) => 64.22,
              wolf: ({height}) => 95.2,
              bed: ({height}) => 34.39,
            },
            x: {
              default: ({x, width}) => (x - (width * 1.5) / 2) + width / 2,
              skeleton: ({x, width}) => ((x - (69.96) / 2) + width / 2) + 20,
              zombie: ({x, width}) => x + 10,
              mummy: ({x, width}) => x + 25,
              yaga: ({x, width}) => x + width - 26,
              doctor: ({x, width}) => (x - 36.07 / 2) + width / 2,
              spider: ({x, width}) => ((x - 113 / 2) + width / 2) - 7,
              alien: ({x, width}) => x - 5,
              vampire: ({x, width}) => x - 55,
              yeti: ({x, width}) => x + (width / 2) - 2,
              ghost: ({x, width}) => x - 10,
              wolf: ({x, width}) => x + width - 36.06 - 5,
              bed: ({x, width}) => x - 3,
            },
            y: {
              default: ({y, height}) => (y - (height * 1.5) / 2) + height / 2,
              skeleton: ({y, height}) => y + 65,
              zombie: ({y, height}) => y + 10,
              mummy: ({y, height}) => y + 20,
              yaga: ({y, height}) => y,
              doctor: ({y, height}) => y + height - 10,
              spider: ({y, height}) => y + 15,
              alien: ({y, height}) => y + 3,
              vampire: ({y, height}) => y + 20,
              yeti: ({y, height}) => y + 10,
              ghost: ({y, height}) => y + (height / 2) + 15,
              wolf: ({y, height}) => y + height - 35,
              bed: ({y, height}) => y - 2,
            }
          }
        }
      },
      {
        id: 12,
        component: LipsComponent,
        meta: {
          container: 'mouth',
          uniq: true,
          before: (monster, repo, instance) => {
            monster.open('eyelashes');

            if(monster.name === 'skeleton') {
              monster.close('teeth');
              monster.open('hidden-jaw');
            }

            if(monster.name === 'zombie') {
              zombieJoyAnimBefore(monster, repo, instance);
            }

            if(monster.name === 'mummy') {
              monster.open('mouth-fraud');
            }

            if(monster.name === 'spider') {
              monster.close('mouth-decor');
            }

            if(monster.name === 'wolf') {
              monster.close('tongue');
              monster.close('drooling');
              monster.close('jaw');
              monster.close('teeth');
              monster.open('jaw-closed');
            }

            if(monster.name === 'vampire') {
              monster.close('mouth-figure');
              monster.close('teeth');
            }

            if(!['skeleton', 'wolf', 'vampire'].includes(monster.name)) {
              monster.close('mouth');
            }
          },
          after: (monster, repo, instance) => {
            monster.close('eyelashes');

            if(monster.name === 'skeleton') {
              monster.open('teeth');
              monster.close('hidden-jaw');
            }

            if(monster.name === 'zombie') {
              zombieJoyAnimAfter(monster, repo, instance);
            }

            if(monster.name === 'mummy') {
              monster.close('mouth-fraud');
            }

            if(monster.name === 'spider') {
              monster.open('mouth-decor');
            }

            if(monster.name === 'wolf') {
              monster.open('tongue');
              monster.open('drooling');
              monster.open('jaw');
              monster.open('teeth');
              monster.close('jaw-closed');
            }

            if(monster.name === 'vampire') {
              monster.open('mouth-figure');
              monster.open('teeth');
            }

            if(!['skeleton', 'wolf', 'vampire'].includes(monster.name)) {
              monster.open('mouth');
            }
          },
          attr: {
            width: {
              default: ({width}) => width * 1.5,
              skeleton: ({width}) => 99.84,
              zombie: ({width}) => 89.5,
              mummy: ({width}) => 122.3,
              yaga: ({width}) => 73.3,
              doctor: ({width}) => 74.8,
              spider: ({width}) => 117.876,
              alien: ({width}) => 94.78,
              vampire: ({width}) => 56.56,
              yeti: ({width}) => 93.325,
              ghost: ({width}) => 137.74,
              wolf: ({width}) => 79.76,
              bed: ({width}) => 41.571,
            },
            height: {
              default: ({height}) => height * 1.5,
              skeleton: ({height}) => 80.52,
              zombie: ({height}) => 76.5,
              mummy: ({height}) => 94.6,
              yaga: ({height}) => 73.4,
              doctor: ({height}) => 85.62,
              spider: ({height}) => 119.6,
              alien: ({height}) => 59.46,
              vampire: ({height}) => 94.4,
              yeti: ({height}) => 41.1,
              ghost: ({height}) => 90.24,
              wolf: ({height}) => 31.785,
              bed: ({height}) => 27.56,
            },
            x: {
              default: ({x, width}) => (x - (width * 1.5) / 2) + width / 2,
              skeleton: ({x, width}) => (x - (99.84) / 2) + width / 2,
              zombie: ({x, width}) => x + 10,
              mummy: ({x, width}) => ((x - (122.3) / 2) + width / 2) + 2,
              yaga: ({x, width}) => x - 20,
              doctor: ({x, width}) => (x - 74.8 / 2) + width / 2,
              spider: ({x, width}) => (x - 117.876 / 2) + width / 2,
              alien: ({x, width}) => ((x - (94.78) / 2) + width / 2) + 5,
              vampire: ({x, width}) => (x - (56.56) / 2) + width / 2,
              yeti: ({x, width}) => ((x - (93.325) / 2) + width / 2),
              ghost: ({x, width}) => ((x - (137.74) / 2) + width / 2),
              wolf: ({x, width}) => x + 50,
              bed: ({x, width}) => ((x - (41.57) / 2) + width / 2),
            },
            y: {
              default: ({y, height}) => (y - (height * 1.5) / 2) + height / 2,
              skeleton: ({y, height}) => y + 10,
              zombie: ({y, height}) => y - 45,
              mummy: ({y, height}) => y - 60,
              yaga: ({y, height}) => y - 30,
              doctor: ({y, height}) => y - 85.62 + 35,
              spider: ({y, height}) => y,
              alien: ({y, height}) => y - 15,
              vampire: ({y, height}) => y - 40,
              yeti: ({y, height}) => y,
              ghost: ({y, height}) => y + 20,
              wolf: ({y, height}) => y + 10,
              bed: ({y, height}) => y - 19,
            }
          }
        }
      },
      {
        id: 11,
        component: WigComponent,
        meta: {
          container: 'head-figure',
          uniq: true,
          emotion: 'joyful',
          before: (monster, repo, instance) => {
            zombieJoyAnimBefore(monster, repo, instance);
            if(monster.name === 'zombie') {
              monster.close('hair');
            }
          },
          after: (monster, repo, instance) => {
            zombieJoyAnimAfter(monster, repo, instance);
            if(monster.name === 'zombie') {
              monster.open('hair');
            }
          },
          attr: {
            width: {
              default: ({width}) => width * 1.5,
              skeleton: ({width}) => 200,
              zombie: ({width}) => 206.7,
              mummy: ({width}) => 178.3,
              yaga: ({width}) => 73.3,
              doctor: ({width}) => 119.6,
              spider: ({width}) => 170.7,
              alien: ({width}) => 190.6,
              vampire: ({width}) => 108.6,
              yeti: ({width}) => 188.1,
              ghost: ({width}) => 164.2,
              wolf: ({width}) => 170.5,
              bed: ({width}) => 90.1,
            },
            height: {
              default: ({height}) => height * 1.5,
              skeleton: ({height}) => 200,
              zombie: ({height}) => 203.3,
              mummy: ({height}) => 256.1,
              yaga: ({height}) => 73.4,
              doctor: ({height}) => 119.7,
              spider: ({height}) => 170.8,
              alien: ({height}) => 190.7,
              vampire: ({height}) => 186.9,
              yeti: ({height}) => 188.3,
              ghost: ({height}) => 243.8,
              wolf: ({height}) => 151.5,
              bed: ({height}) => 90.18,
            },
            x: {
              default: ({x, width}) => (x - (width * 1.5) / 2) + width / 2,
              skeleton: ({x, width}) => 0,
              zombie: ({x, width}) => (x - (206.7) / 2) + width / 2,
              mummy: ({x, width}) => ((x - (178.3) / 2) + width / 2) + 2,
              yaga: ({x, width}) => (x - (73.3) / 2) + width / 2,
              doctor: ({x, width}) => (x - 119.7 / 2) + width / 2,
              spider: ({x, width}) => x - 45,
              alien: ({x, width}) => ((x - (190.7) / 2) + width / 2) - 3.5,
              vampire: ({x, width}) => (x - (108.6) / 2) + width / 2,
              yeti: ({x, width}) => ((x - (188.1) / 2) + width / 2),
              ghost: ({x, width}) => ((x - (164.2) / 2) + width / 2) - 0.25,
              wolf: ({x, width}) => x - 15,
              bed: ({x, width}) => ((x - (90.1) / 2) + width / 2) - 10,
            },
            y: {
              default: ({y, height}) => (y - (height * 1.5) / 2) + height / 2,
              skeleton: ({y, height}) => y - 20,
              zombie: ({y, height}) => y + 10,
              mummy: ({y, height}) => y - 7,
              yaga: ({y, height}) => y + 30,
              doctor: ({y, height}) => y + 20,
              spider: ({y, height}) => y - 40,
              alien: ({y, height}) => y - 30,
              vampire: ({y, height}) => y + 30,
              yeti: ({y, height}) => y - 5,
              ghost: ({y, height}) => y - 7,
              wolf: ({y, height}) => y - 33,
              bed: ({y, height}) => y + 20,
            }
          }
        }
      },
      {
        id: 10,
        component: BraComponent,
        meta: {
          container: 'body',
          uniq: true,
          before: (monster) => {
            if(monster.name === 'bed') {
              monster.close('eyes');
            }

            return;
          },
          after: (monster) => {
            if(monster.name === 'bed') {
              monster.open('eyes');
            }

            return;
          },
          attr: {
            width: {
              default: ({width}) => width * 1.5,
              zombie: ({width}) => 160,
              mummy: ({width}) => 204,
              alien: ({width}) => 79.1,
              skeleton: ({width}) => 200.69,
              yaga: ({width}) => 139.95,
              doctor: ({width}) => 93.99,
              spider: ({width}) => 146,
              vampire: ({width}) => 70.86,
              wolf: ({width}) => 194.5,
              ghost: ({width}) => 220,
              yeti: ({width}) => 332.8,
              bed: ({width}) => 65.47,
            },
            height: {
              default: ({height}) => height * 1.5,
              zombie: ({height}) => 71,
              mummy: ({height}) => 50,
              alien: ({height}) => 58.25,
              skeleton: ({height}) => 110.29,
              yaga: ({height}) => 101.45,
              doctor: ({height}) => 47.97,
              spider: ({height}) => 173,
              vampire: ({height}) => 45.46,
              wolf: ({height}) => 69.8,
              ghost: ({height}) => 145.5,
              yeti: ({height}) => 137.75,
              bed: ({height}) => 35.973,
            },
            x: {
              default: ({x, width}) => (x - (width * 1.5) / 2) + width / 2,
              zombie: ({x, width}) => x + 10,
              mummy: ({x, width}) => ((x - (204) / 2) + width / 2) + 9,
              alien: ({x, width}) => ((x - (71.9) / 2) + width / 2) - 3.5,
              skeleton: ({x, width}) => 0,
              yaga: ({x, width}) => x,
              doctor: ({x, width}) => (x - 93.99 / 2) + width / 2,
              spider: ({x, width}) => ((x - (146) / 2) + width / 2),
              vampire: ({x, width}) => (x - (70.86) / 2) + width / 2,
              wolf: ({x, width}) => x,
              ghost: ({x, width}) => ((x - (220) / 2) + width / 2) - 0.25,
              yeti: ({x, width}) => x + 1.5,
              bed: ({x, width}) => x - 85.5,
            },
            y: {
              default: ({y, height}) => (y - (height * 1.5) / 2) + height / 2,
              ghost: ({y, height}) => y + 105,
              zombie: ({y, height}) => y + 20,
              mummy: ({y, height}) => y + 2,
              alien: ({y, height}) => y + 10,
              skeleton: ({y, height}) => y - 20,
              yaga: ({y, height}) => y,
              doctor: ({y, height}) => y + 15,
              spider: ({y, height}) => y + 80,
              vampire: ({y, height}) => y + 82,
              wolf: ({y, height}) => y,
              yeti: ({y, height}) => y + 22,
              bed: ({y, height}) => y - 60,
            }
          }
        }
      },
      {
        id: 9,
        component: DressComponent,
        meta: {
          container: 'body',
          uniq: true,
          before: (monster) => {
            if(
              ['mummy', 'yaga', 'yeti', 'doctor', 'vampire', 'zombie', 'wolf'].includes(monster.name)
            ) {
              monster.close('body');
            }

            return;
          },
          after: (monster) => {
            if(
              ['mummy', 'yaga', 'yeti', 'doctor', 'vampire', 'zombie', 'wolf'].includes(monster.name)
            ) {
              monster.open('body');
            };

            return;
          },
          attr: {
            width: {
              default: ({width}) => width * 1.5,
              zombie: ({width}) => 245,
              mummy: ({width}) => width * 0.7,
              alien: ({width}) => width * 1.3,
              skeleton: ({width}) => width * 1.3,
              yaga: ({width}) => width,
              doctor: ({width}) => width,
              spider: ({width}) => width * 1.44,
              vampire: ({width}) => 140,
              wolf: ({width}) => 217,
              ghost: ({width}) => 318.25,
              yeti: ({width}) => 326,
              bed: ({width}) => 159.49,

            },
            height: {
              default: ({height}) => height * 1.5,
              zombie: ({height}) => 210,
              mummy: ({height}) => 121.5,
              alien: ({height}) => height * 0.56,
              skeleton: ({height}) => height * 1.3,
              yaga: ({height}) => height,
              doctor: ({height}) => 190,
              spider: ({height}) => height * 1.1,
              vampire: ({height}) => 120,
              wolf: ({height}) => 274,
              ghost: ({height}) => 159.6,
              yeti: ({height}) => 237,
              bed: ({height}) => 27.637,
            },
            x: {
              default: ({x, width}) => (x - (width * 1.5) / 2) + width / 2,
              zombie: ({x, width}) => (x - (width) / 2) + width / 2,
              mummy: ({x, width}) => 25,
              alien: ({x, width}) => (x - (width * 1.3) / 2) + width / 2,
              skeleton: ({x, width}) => (x - (width * 1.3) / 2) + width / 2,
              yaga: ({x, width}) => (x - width / 2) + width / 2,
              doctor: ({x, width}) => (x - width / 2) + width / 2,
              spider: ({x, width}) => ((x - (width * 1.4) / 2) + width / 2) - 3,
              vampire: ({x, width}) => (x - (140) / 2) + width / 2,
              wolf: ({x, width}) => x,
              ghost: ({x, width}) => (x - (318.25) / 2) + width / 2,
              yeti: ({x, width}) => ((x - 326 / 2) + width / 2) + 7,
              bed: ({x, width}) => x - 37,
            },
            y: {
              default: ({y, height}) => (y - (height * 1.5) / 2) + height / 2,
              ghost: ({y, height}) => y + 220,
              zombie: ({y, height}) => y - 10,
              mummy: ({y, height}) => y - 10,
              alien: ({y, height}) => y,
              skeleton: ({y, height}) => y - 20,
              yaga: ({y, height}) => y,
              doctor: ({y, height}) => y,
              spider: ({y, height}) => y + 71,
              vampire: ({y, height}) => y + 57,
              wolf: ({y, height}) => y,
              yeti: ({y, height}) => y,
              bed: ({y, height}) => y + 8,
            }
          }
        }
      },
      {
        id: 8,
        component: SnivelComponent,
        meta: {
          container: 'nose',
          emotion: 'sad',
          attr: {
            width: {
              default: ({width}) => width * 1.5,
              zombie: ({width}) => 27,
              mummy: ({width}) => 25,
              alien: ({width}) => 11,
              skeleton: ({width}) => 22,
              yaga: ({width}) => 15,
              doctor: ({width}) => 15,
              spider: ({width}) => 28,
              vampire: ({width}) => 24,
              wolf: ({width}) => 17,
              ghost: ({width}) => 15,
              yeti: ({width}) => 24,
              bed: ({width}) => 11.64,

            },
            height: {
              default: ({height}) => height * 1.5,
              zombie: ({height}) => 47,
              mummy: ({height}) => 44,
              alien: ({height}) => 20,
              skeleton: ({height}) => 78,
              yaga: ({height}) => 26,
              doctor: ({height}) => 26,
              spider: ({height}) => 49,
              vampire: ({height}) => 42,
              wolf: ({height}) => 30,
              ghost: ({height}) => 26,
              yeti: ({height}) => 42,
              bed: ({height}) => 20.4,
            },
            x: {
              default: ({x, width}) => (x - (width * 1.5) / 2) + width / 2,
              zombie: ({x, width}) => x + 20,
              mummy: ({x, width}) => x + width + 12.5,
              alien: ({x, width}) => x + width - 7,
              skeleton: ({x, width}) => x + width - 22,
              yaga: ({x, width}) => (x - 15 / 2) + width / 2,
              doctor: ({x, width}) => (x - (15) / 2) + width / 2,
              spider: ({x, width}) => (x - (width * 6.6) / 2) + width / 2,
              vampire: ({x, width}) => (x - 24 / 2) + width / 2,
              wolf: ({x, width}) => (x - 17 / 2) + width / 2,
              ghost: ({x, width}) => (x - (width * 3.5) / 2) + width / 2,
              yeti: ({x, width}) => (x - 24 / 2) + width / 2,
              bed: ({x, width}) => (x - 11.64 / 2) + width / 2,
            },
            y: {
              default: ({y, height}) => (y - (height * 1.5) / 2) + height / 2,
              zombie: ({y, height}) => y + height,
              mummy: ({y, height}) => y + height,
              alien: ({y, height}) => y + height,
              skeleton: ({y, height}) => y + height,
              yaga: ({y, height}) => y + height,
              doctor: ({y, height}) => y + height,
              spider: ({y, height}) => y - 10,
              vampire: ({y, height}) => y + height,
              wolf: ({y, height}) => y + height - 7,
              yeti: ({y, height}) => y + height,
              bed: ({y, height}) => y + height,
            }
          }
        }
      },
      {
        id: 7,
        component: MoustacheComponent,
        meta: {
          container: 'mouth',
          attr: {
            width: {
              default: ({width}) => width * 1.5,
              zombie: ({width}) => 155,
              mummy: ({width}) => 155,
              alien: ({width}) => 50,
              skeleton: ({width}) => 75,
              yaga: ({width}) => 72,
              doctor: ({width}) => 127,
              spider: ({width}) => 50,
              vampire: ({width}) => 50,
              wolf: ({width}) => 71,
              ghost: ({width}) => 127,
              yeti: ({width}) => 127,
              bed: ({width}) => 95.74,

            },
            height: {
              default: ({height}) => height * 1.5,
              zombie: ({height}) => 63,
              mummy: ({height}) => 63,
              alien: ({height}) => 20,
              skeleton: ({height}) => 30,
              yaga: ({height}) => 29,
              doctor: ({height}) => 51,
              spider: ({height}) => 20,
              vampire: ({height}) => 20,
              wolf: ({height}) => 28,
              ghost: ({height}) => 51,
              yeti: ({height}) => 51,
              bed: ({height}) => 38.9,
            },
            x: {
              default: ({x, width}) => (x - (width * 1.5) / 2) + width / 2,
              zombie: ({x, width}) => (x - 155 / 2) + width / 2,
              mummy: ({x, width}) => (x - 155 / 2) + width / 2,
              alien: ({x, width}) => (x - 50 / 2) + width / 2,
              skeleton: ({x, width}) => (x - 75 / 2) + width / 2,
              yaga: ({x, width}) => (x - 72 / 2) + width / 2,
              doctor: ({x, width}) => (x - 127 / 2) + width / 2,
              spider: ({x, width}) => (x - 50 / 2) + width / 2,
              vampire: ({x, width}) => (x - 50 / 2) + width / 2,
              wolf: ({x, width}) => x + width - 67,
              ghost: ({x, width}) => (x - 127 / 2) + width / 2,
              yeti: ({x, width}) => (x - 127 / 2) + width / 2,
              bed: ({x, width}) => (x - 95.74 / 2) + width / 2,
            },
            y: {
              default: ({y, height}) => (y - (height * 1.5) / 2) + height / 2,
              zombie: ({y, height}) => y - 40,
              mummy: ({y, height}) => y - 30,
              alien: ({y, height}) => y - 20,
              skeleton: ({y, height}) => y + 22,
              yaga: ({y, height}) => y - 25,
              doctor: ({y, height}) => y - 30,
              spider: ({y, height}) => y - 15,
              vampire: ({y, height}) => y - 11,
              wolf: ({y, height}) => y - 10,
              yeti: ({y, height}) => y - 18,
              bed: ({y, height}) => y - 26,
            }
          }
        }
      },
      {
        id: 6,
        component: BeardComponent,
        meta: {
          container: 'mouth',
          before: (monster) => {
            if(monster.name === 'wolf') {
              monster.close('tongue');
            } else if(monster.name === 'skeleton') {
              return;
            } else {
              monster.close('mouth');
            }
            return;
          },
          after: (monster) => {
            if(monster.name === 'wolf') {
              monster.open('tongue');
            } else if(monster.name === 'skeleton') {
              return;
            } else {
              monster.open('mouth');
            }
            return;
          },
          attr: {
            width: {
              default: ({width}) => width * 1.5,
              zombie: () => 114,
              mummy: ({width}) => width * 3.5,
              alien: ({width}) => width * 9.3,
              skeleton: ({width}) => width * 1.6,
              yaga: ({width}) => width * 12.8,
              doctor: ({width}) => width * 5,
              spider: ({width}) => width * 6.6,
              vampire: ({width}) => width * 2.87,
              wolf: ({width}) => width * 1.6,
              ghost: ({width}) => width * 3.5,
              yeti: ({width}) => width * 2,
              bed: ({width}) => 58.36,

            },
            height: {
              default: ({height}) => height * 1.5,
              zombie: () => 88,
              mummy: ({height}) => height * 3.5,
              alien: ({height}) => height * 9.3,
              skeleton: ({height}) => height * 1.6,
              yaga: ({height}) => height * 12.8,
              doctor: ({height}) => height * 5,
              spider: ({height}) => height * 6.6,
              vampire: ({height}) => height * 1.83,
              wolf: ({height}) => height * 1.6,
              ghost: ({height}) => height * 1.76,
              yeti: ({height}) => height * 2,
              bed: ({height}) => 46.5,
            },
            x: {
              default: ({x, width}) => (x - (width * 1.5) / 2) + width / 2,
              zombie: ({x, width}) => (x - (114) / 2) + width / 2,
              mummy: ({x, width}) => (x - (width * 3.5) / 2) + width / 2,
              alien: ({x, width}) => (x - (width * 9.3) / 2) + width / 2,
              skeleton: ({x, width}) => (x - (width * 1.6) / 2) + width / 2,
              yaga: ({x, width}) => (x - (width * 12.8) / 2) + width / 2,
              doctor: ({x, width}) => (x - (width * 5) / 2) + width / 2,
              spider: ({x, width}) => (x - (width * 6.6) / 2) + width / 2,
              vampire: ({x, width}) => (x - (width * 2.87) / 2) + width / 2,
              wolf: ({x, width}) => x - 20,
              ghost: ({x, width}) => (x - (width * 3.5) / 2) + width / 2,
              yeti: ({x, width}) => (x - (width * 2) / 2) + width / 2,
              bed: ({x, width}) => (x - (58.36) / 2) + width / 2,

            },
            y: {
              default: ({y, height}) => (y - (height * 1.5) / 2) + height / 2,
              mummy: ({y, height}) => y,
              alien: ({y, height}) => y - 20,
              skeleton: ({y, height}) => y + 22,
              yaga: ({y, height}) => y - 30,
              doctor: ({y, height}) => y - 30,
              spider: ({y, height}) => y - 10,
              vampire: ({y, height}) => y - 30,
              wolf: ({y, height}) => y - 10,
              yeti: ({y, height}) => y,
              bed: ({y, height}) => y - 10,
            }
          }
        }
      },
      {
        id: 4,
        component: MoleComponent,
        meta: {
          onScreen: true,
          multiple: true,
          random: true,
          before: (monster, items, instance) => {
            if(monster.animate() && monster.isOnMonster( instance.getBoundingClientRect() )) {
              const smile = monster.animate('smile')(true)();
              const smileLids = monster.animate('smileLids')(true)();
            }
          },
          after: (monster, items) => {
            if(monster.animate()) {
              const smile = monster.animate('smile')(false)();
              const smileLids = monster.animate('smileLids')(false)();
            }
          },
        }
      },
      {
        id: 5,
        component: HeartComponent,
        meta: {
          before: zombieJoyAnimBefore,
          after: zombieJoyAnimAfter,
          emotion: 'joyful',
          onScreen: true,
          multiple: true,
        }
      },
      {
        id: 1,
        component: EyesComponent,
        meta: {
          container: 'eyes',
          before: (monster) => {
            monster.close('eyes');
            return;
          },
          after: (monster) => {
            monster.open('eyes');
            return;
          },
          attr: {
            width: {
              default: ({width}) => width * 1.5,
              mummy: ({width}) => width * 2.88,
              bed: ({width}) => 73.414,

            },
            height: {
              default: ({height}) => height * 1.5,
              mummy: ({height}) => height * 2.88,
              bed: ({height}) => 23.414,

            },
            x: {
              default: ({x, width}) => (x - (width * 1.5) / 2) + width / 2,
              mummy: ({x, width}) => (x - (width * 2.88) / 2) + width / 2,
              bed: ({x, width}) => ((x - (73.414) / 2) + width / 2),

            },
            y: {
              default: ({y, height}) => (y - (height * 1.5) / 2) + height / 2,
              mummy: ({y, height}) => (y - (height * 2.88) / 2) + height / 2,
              bed: ({y, height}) => ((y - (23.414) / 2) + height / 2) - 5,

            }
          }
        }
      },
      {
        id: 2,
        component: GlassComponent,
        meta: {
          container: 'eyes',
          attr: {
            width: {
              default: ({width}) => width * 2,
              skeleton: ({width}) => width * 2.113,
              mummy: ({width}) => width * 3.82,
              bed: ({width}) => 75.79,
            },
            height: {
              default: ({height}) => height * 2,
              skeleton: ({height}) => height * 2.113,
              mummy: ({height}) => height * 3.82,
              bed: ({height}) => 26.578,
            },
            x: {
              default: ({x, width}) => x - width / 2,
              skeleton: ({x, width}) => (x - width / 2) - 6,
              mummy: ({x, width}) => (x - (width * 3.82) / 2) + width / 2,
              bed: ({x, width}) => (x - (75.79) / 2) + width / 2,

            },
            y: {
              default: ({y, height}) => y - height / 2,
              skeleton: ({y, height}) => (y - height / 2) + 15,
              mummy: ({y, height}) => (y - (height * 3.82) / 2) + height / 2,
              bed: ({y, height}) => ((y - (26.578) / 2) + height / 2) + 9,

            }
          }
        }
      },
      {
        id: 3,
        component: HoodComponent,
        meta: {
          container: 'head-figure',
          emotion: 'joyful',
          uniq: true,
          before: zombieJoyAnimBefore,
          after: zombieJoyAnimAfter,
          attr: {
            width: {
              default: ({width}) => width * 1.5,
              skeleton: ({width}) => 65.45,
              zombie: ({width}) => 71.8,
              mummy: ({width}) => 76.885,
              yaga: ({width}) => 47.154,
              doctor: ({width}) => 82.414,
              spider: ({width}) => 106.668,
              alien: ({width}) => 50.625,
              vampire: ({width}) => 76.885,
              yeti: ({width}) => 78.4,
              ghost: ({width}) => 90.345,
              wolf: ({width}) => 41.735,
              bed: ({width}) => 64.59,
            },
            height: {
              default: ({height}) => height * 1.5,
              skeleton: ({height}) => 61.23,
              zombie: ({height}) => 98.59,
              mummy: ({height}) => 57.304,
              yaga: ({height}) => 64.746,
              doctor: ({height}) => 85.186,
              spider: ({height}) => 58.784,
              alien: ({height}) => 56.281,
              vampire: ({height}) => 57.304,
              yeti: ({height}) => 87.6,
              ghost: ({height}) => 76.6,
              wolf: ({height}) => 80.656,
              bed: ({height}) => 54.76,
            },
            x: {
              default: ({x, width}) => (x - (width * 1.5) / 2) + width / 2,
              skeleton: ({x, width}) => x + width - 61.23 + 10,
              zombie: ({x, width}) => x - 24,
              mummy: ({x, width}) => x - 32,
              yaga: ({x, width}) => x + 15,
              doctor: ({x, width}) => x + 49,
              spider: ({x, width}) => ((x - 106.668 / 2) + width / 2) + 4,
              alien: ({x, width}) => x + (width / 2),
              vampire: ({x, width}) => 1.5,
              yeti: ({x, width}) => x + (width / 2) - 5,
              ghost: ({x, width}) => ((x - (90.345) / 2) + width / 2) + 50,
              wolf: ({x, width}) => x - 10,
              bed: ({x, width}) => x + 34,
            },
            y: {
              default: ({y, height}) => (y - (height * 1.5) / 2) + height / 2,
              skeleton: ({y, height}) => y - 20,
              zombie: ({y, height}) => y - 16,
              mummy: ({y, height}) => y - 14,
              yaga: ({y, height}) => y + 10,
              doctor: ({y, height}) => y - 22,
              spider: ({y, height}) => y - 15,
              alien: ({y, height}) => y - 41,
              vampire: ({y, height}) => 20,
              yeti: ({y, height}) => y - 10,
              ghost: ({y, height}) => y - 30,
              wolf: ({y, height}) => -10,
              bed: ({y, height}) => y + 6,
            }
          },
        }
      },

    ]
  }
}
