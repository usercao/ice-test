import { Variant, HTMLMotionProps } from 'framer-motion';

export type MotionVariants<T extends string> = Record<T, Variant>;

export const easings = {
  ease: [0.25, 0.1, 0.25, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
};

// fade
type FadeMotionVariant = MotionVariants<'enter' | 'exit'>;

const fadeVariants: FadeMotionVariant = {
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1,
      ease: easings.easeOut,
    },
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: easings.easeIn,
    },
  },
};

export const fadeConfig: HTMLMotionProps<any> = {
  initial: 'exit',
  animate: 'enter',
  exit: 'exit',
  variants: fadeVariants,
};

// scale
type ScaleMotionVariant = MotionVariants<'enter' | 'exit'>;

const scaleVariants: ScaleMotionVariant = {
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.1,
      easings: 'easeout',
    },
  },
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const scaleConfig: HTMLMotionProps<any> = {
  initial: 'exit',
  animate: 'enter',
  exit: 'exit',
  variants: scaleVariants,
};
