const animations = {
  lid: {
    close: (l, cb) => {
      l.attr({cy: 64});
      l.animate({cy: 97.54,}, 42, cb)
    },
    open: (l, cb) => {
      l.attr({cy: 97.54});
      l.animate({cy: 64,}, 84, cb)
    },
    smileIn: (l, cb) => {
      l.attr({cy: 132});
      l.animate({cy: 118}, 200, cb);
    },
    smileOut: (l, cb) => {
      l.attr({cy: 118}),
      l.animate({cy: 132}, 200, () => {
        l.attr({cy: 64});

        return cb();
      })
    },
    sadIn: (l, cb) => {
      l.attr({cy: 64});
      l.animate({cy: 79,}, 200, cb);
    },
    sadOut: (l, cb) => {
      l.attr({cy: 79});
      l.animate({cy: 64,}, 200, cb);
    }
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
  },
  mouth: {
    smileIn: (instance, cb) => {
      instance.attr({ class: 'fadeIn '});
      instance.animate({
        d: 'M134.5,197.76c22.39-6.56,37.32-22.88,33.34-36.45L86.76,185.05C90.74,198.63,112.11,204.31,134.5,197.76Z',
      }, 200, cb);
    },
    smileOut: (instance, cb) => {
      instance.attr({ class: 'fadeOut'});
      instance.animate({d: 'M102.43,194c15.36,0,27.81-7.55,27.81-16.86H74.62C74.62,186.43,87.07,194,102.43,194Z',}, 200, cb);
    },
    sadIn: (instance, cb) => {
      instance.attr({ class: 'fadeOut'});
      instance.animate({
        d: 'M107.57,177.68c-14.42,5.29-23.51,16.66-20.3,25.4l52.21-19.15C136.27,175.19,122,172.39,107.57,177.68Z',
      }, 200, cb);
    },
    sadOut: (instance, cb) => {
      instance.animate({d: 'M102.43,194c15.36,0,27.81-7.55,27.81-16.86H74.62C74.62,186.43,87.07,194,102.43,194Z',}, 200, cb);
    },
  }
};

const sequances = {
  joyful: function(lids, mouth, isForward, cb) {
    const config = {
      lids: isForward? 'smileIn' : 'smileOut',
      mouth: isForward? 'smileIn' : 'smileOut',
    }

    let finished = 0;

    const afterFinish = () => {
      finished++;

      if(finished === 2) {
        return cb();
      }

      return;
    };

    lids[0].animations.onDisengage(afterFinish);
    lids.forEach(l => {
      l.animations.run(config.lids);
    })

    mouth.animations.onDisengage(afterFinish);
    mouth.animations.run(config.mouth);

    return;
  },
  sad: function(lids, mouth, isForward, cb) {
    const config = {
      lids: isForward? 'sadIn' : 'sadOut',
      mouth: isForward? 'sadIn' : 'sadOut',
    }

    let finished = 0;

    const afterFinish = () => {
      finished++;

      if(finished === 2) {
        return cb();
      }

      return;
    };

    lids[0].animations.onDisengage(afterFinish);
    lids.forEach(l => {
      l.animations.run(config.lids);
    })

    mouth.animations.onDisengage(afterFinish);
    mouth.animations.run(config.mouth);

    return;
  },
  default: function(pupils, lids, cb) {
    let finished = 0;

    const afterFinish = () => {
      finished++;

      if(finished === 2) {
        return cb();
      }

      return;
    };

    pupils.forEach(l => {
      l.animations.run('left');
      return;
    });

    setTimeout(() => {
      let count = 0;

      lids.forEach(l => {
        l.animations.onDisengage(() => {
          count++;

          if(count === lids.length) {
            lids.forEach(l => {
              l.animations.run('open');
            });
          } else if(count === lids.length * 2) {
            afterFinish();
          }

          return;
        });
        l.animations.run('close');

        return;
      });
    });

    setTimeout(() => {
      pupils[0].animations.onDisengage(afterFinish);
      pupils.forEach(l => {
        l.animations.run('right');
        return;
      });
    }, 500);

  },
};


export { animations, sequances };
