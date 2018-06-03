import { Component, ElementRef, Renderer2, ComponentFactoryResolver, Injector, ApplicationRef, AfterViewInit } from '@angular/core';
import { MonsterModel } from '../monster.model';

import { AnimationSetController } from '../animation/animation-set.controller';
import { AnimationSequenceController } from '../animation/animation-sequence.controller';


// @ts-ignore: Unreachable code error
import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js';

const aniamtions = function(instance) {
  const root = Snap(instance);

  const config = {
  	pupilL: {begin: 74.18, end: 64.18},
    pupilR: {begin: 142.93, end: 132.93},
    lids: {begin: 64, end: 97.54}
  }

  return {
    getRoot: () => {
      return root;
    },
    eyes: (cb = () => {}) => {
      const eyesMovement = this.snap.eyesMovement();
      const blink = this.snap.blink();

      const timeLine = () => {
        setTimeout(blink, 0);
        setTimeout(() => {
          eyesMovement(cb);
        }, 0);
      }

      timeLine();

      return timeLine;
    },
    blink: (cb = () => {}) => {
      const lids = this.getParts(p => p.name === 'lid')
        .map(({element}) => Snap(element));

      return () => {
      	lids.forEach(l => {

          l.animate({cy: config.lids.end,}, 42, () => {
          	l.animate({cy: config.lids.begin,}, 84, cb);
          });
        })
      }
    },
    eyesMovement: (cb = () => {}) => {
      const pupils = this.getParts(p => p.name === 'pupil')
        .reduce((acc, { mod, element }) => {
          return { ...acc, [mod]: Snap(element) };
        }, {});

      const animatePupilRightForward = () => pupils.right.animate({cx: config.pupilR.end,}, 100);
      const animatePupilLeftForward = () => pupils.left.animate({cx: config.pupilL.end,}, 100);

      const animatePupilRightBackward = () => pupils.right.animate({cx: config.pupilR.begin,}, 250, cb);
      const animatePupilLeftBackward = () => pupils.left.animate({cx: config.pupilL.begin,}, 250, cb);

      return () => {
        animatePupilRightForward();
        animatePupilLeftForward();

        setTimeout(() => {
          animatePupilRightBackward();
          animatePupilLeftBackward();
        }, 588);
      };
    },
    smile: (arg) => {
      const el = this.getPart(p => p.name == 'mouth' && p.type == "element").element;
      const mouth = Snap( el );
      const value = 'M102.43,194c15.36,0,27.81-7.55,27.81-16.86H74.62C74.62,186.43,87.07,194,102.43,194Z';

      const smileForward = (cb) => {
        mouth.attr({ class: 'fadeIn '});
        mouth.animate({
          d: 'M134.5,197.76c22.39-6.56,37.32-22.88,33.34-36.45L86.76,185.05C90.74,198.63,112.11,204.31,134.5,197.76Z',
        }, 200, cb);

        return smileBackward;
      }

      const smileBackward = (cb) => {
        mouth.attr({ class: 'fadeOut'});
        mouth.animate({d: value,}, 200, cb);

        return smileForward;
      }

      return arg ? smileForward : smileBackward;
    },
    smileLids: (arg) => {
      const lids = this.getParts(p => p.name === 'lid')
        .map(({element}) => Snap(element));

      const config = {original: 64, end: 118, begin: 132};

      const smileForward = (cb = () => {}) => {
        lids.forEach(l => {
          l.attr({cy: config.begin});
          l.animate({cy: config.end}, 200, cb);
        });

        return smileBackward;
      }

      const smileBackward = (cb = () => {}) => {
        lids.forEach(l => {
          l.animate({cy: config.begin}, 200, () => {
            l.attr({cy: config.original});
            cb();
            return;
          });
        });
      }

      return arg ? smileForward : smileBackward;
    }
  }
}


@Component({
  selector: 'zombie',
  templateUrl: 'zombie.html'
})
export class ZombieComponent extends MonsterModel implements AfterViewInit {
  private snap;

  constructor(el: ElementRef, protected renderer: Renderer2,  componentFactoryResolver: ComponentFactoryResolver, injector: Injector,
  app: ApplicationRef) {
    super('zombie', el.nativeElement, componentFactoryResolver, injector, app);
  }

  ngAfterViewInit() {
    this.snap = aniamtions.bind(this)(this.getRoot().element);

    const anims = {
      lid: {
        close: (l, cb) => l.animate({cy: 97.54,}, 42, cb),
        open: (l, cb) => l.animate({cy: 64,}, 84, cb),
      },
      pupil: {
        left: (instance, cb) => {
          const { cx } = instance.attr();
          instance.animate({cx: Number(cx) - 10}, 100, cb);
          return;
        },
        right: (instance, cb) => {
          const { cx } = instance.attr();

          instance.animate({cx: Number(cx) + 10}, 250, cb);
          return;
        }
      }
    }

    this.loadAnimations(anims);

    const pupils = this.getParts(p => p.name === 'pupil');

    const scheme = [
      'pupilsGoLeft',
      'pupilsGoRight'
    ];

    const animations = {
      pupilsGoLeft: () => pupils.forEach(l => {
        l.animations.run('left');
        return l.animations;
      }),
      pupilsGoRight: (cb) => pupils.forEach(l => {
        l.animations.run('right');
        cb(l.animations);
        return;
      }),
    };

    const seq = new AnimationSequenceController(scheme, animations);

    // seq.run(1000);
    // console.time('clear');
    //
    // setTimeout(() => {
    //   seq.clear();
    //   console.timeEnd('clear');
    // }, 3200);

  }

  // isOnMonster(top, right, bootom, left) {
  //   console.log(Snap.getElementByPoint(top, left));
  //   return;
  // }

  protected loadAnimations(animations) {
    const partNames = Object.keys(animations);

    partNames.forEach(name => {
      this.getParts(part => part.name === name)
        .forEach(part => {
          return part.setAnimations(
            new AnimationSetController(
              Snap(part.element),
              animations[name]
            )
          );
        });
    });


  }

  public animate(name) {
    return name? this.snap[name] : true;
  }
}
