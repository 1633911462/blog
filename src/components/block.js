export default function run () {
  const box = document.getElementsByClassName('box')[0]
  box.style.top = 0
  box.style.left = Math.floor(Math.random() * ((window.innerWidth - 200) - 100 + 1)) + 100 + 'px'
  var x = 1
  var y = 1
  var align = 3

  function runBox (box) {
    const left = box.offsetLeft
    const top = box.offsetTop
    // console.log(top)
    // 撞右边
    if (left + 100 > window.innerWidth && (align === 3 || align === 2)) {
      x = -1
      if (align === 3) {
        align = 4
      }
      if (align === 2) {
        align = 1
      }
    }
    // 撞左边
    if ((left + window.innerWidth) < window.innerWidth && (align === 1 || align === 4)) {
      x = 1
      if (align === 1) {
        align = 2
      }
      if (align === 4) {
        align = 3
      }
    }

    // 撞上边
    if ((top + window.innerHeight) < window.innerHeight && (align === 1 || align === 2)) {
      y = 1
      if (align === 1) {
        align = 4
      }
      if (align === 2) {
        align = 3
      }
    }

    // 撞下边
    if (top + 100 > window.innerHeight && ((align === 3 || align === 4))) {
      y = -1
      if (align === 3) {
        align = 2
        console.log(1)
      }
      if (align === 4) {
        align = 1
      }
    }
    box.style.left = left + x + 'px'
    box.style.top = top + y + 'px'
  }

  setInterval(function () {
    runBox(box)
  }, 10)
}
