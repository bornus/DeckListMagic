import React, { useRef } from 'react';
import classnames from 'classnames';
import { motion, useMotionValue, useAnimation } from 'framer-motion';

import { RightArrowIcon, CheckIcon } from 'components/SVGs';
import { Spinner } from 'components/Spinner';

import styles from './slider.module.scss';

interface Props {
  loading?: boolean;
  succeeded?: boolean;
  onReachEnd?: () => any;
  [attributes: string]: any;
}

export default function Slider({ loading, succeeded, onReachEnd, className = '' }: Props) {
  const constraintsRef = useRef(null);
  const circleRef = useRef(null);
  const circleControls = useAnimation();
  const x = useMotionValue(0);

  async function handleDragEnd(event: any, info: any) {
    const offset = info.offset.x;
    // @ts-ignore
    const zoneWidth = constraintsRef.current.clientWidth;
    // @ts-ignore
    const circleWidth = circleRef.current.clientWidth;
    // if the slider has reached the end, lock it and trigger the event
    if (offset >= zoneWidth - circleWidth && onReachEnd) {
      await circleControls.set({
        x: `${zoneWidth - circleWidth}px`,
        transition: { duration: 0.2 },
      });
      onReachEnd();
    } else {
      circleControls.start({ x: 0, opacity: 1, transition: { duration: 0.5 } });
    }
  }

  let circleContent = <RightArrowIcon width="20px" height="22px" />;
  let circleBgc = '#DA0F0F';
  let sliderMessage = 'Slide to confirm deletion';

  if (succeeded) {
    circleContent = <CheckIcon width="22px" height="22px" />;
    circleBgc = '#88c648';
    sliderMessage = 'Successfully deleted!';
  } else if (loading) {
    circleContent = <Spinner />;
    circleBgc = '#005464';
    sliderMessage = 'Loading...';
  }

  return (
    <div className={classnames(styles.container, className)}>
      <motion.div ref={constraintsRef} className={styles.slidableZone}>
        <span>{sliderMessage}</span>
        <motion.div
          ref={circleRef}
          onDragEnd={handleDragEnd}
          animate={circleControls}
          className={styles.circle}
          drag="x"
          dragConstraints={constraintsRef}
          dragElastic={0}
          dragMomentum={false}
          whileHover={{
            scale: loading ? 1 : 1.1,
            transition: { duration: 0.2, ease: 'easeInOut' },
          }}
          whileTap={{ scale: 1 }}
          style={{
            x,
            backgroundColor: circleBgc,
            transition: '.2s ease-in-out background-color',
          }}
        >
          {circleContent}
        </motion.div>
      </motion.div>
    </div>
  );
}
