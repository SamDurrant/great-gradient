import gsap from 'gsap'
import Draggable from 'gsap/Draggable'

gsap.registerPlugin(Draggable)

export const textTimeline = (elem, onComplete) => {
  const tl = gsap.timeline()
  tl.to(elem, {
    duration: 1,
    xPercent: -150,
    opacity: 1,
    ease: 'power4.inOut',
  }).to(elem, {
    duration: 1,
    xPercent: 0,
    opacity: 0,
    ease: 'power4.inOut',
    onComplete: onComplete,
  })
}

export const setDragTarget = (target, degrees) => {
  gsap.set(target, { rotation: degrees })
}

export const setDragInstance = (target, onDragFn) => {
  return Draggable.create(target, {
    type: 'rotation',
    rotation: 90,
    onDrag: function () {
      onDragFn(this.rotation)
    },
  })
}
