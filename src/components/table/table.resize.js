import {$} from '@core/dom';

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const col = $parent.data.col
  const cells = $root.$root.findAll(`[data-col="${col}"]`)
  const type = event.target.dataset.resize
  const sideProp = type === 'col' ? 'bottom' : 'right'
  let value
  
  $resizer.css({
    opacity: 1,
    [sideProp]: -2000 + 'px'
  })
  
  document.onmousemove = e => {
    if (type === 'col') {
      const delta = e.pageX - coords.right
      value = coords.width + delta
      $resizer.css({
        right: -delta + 'px'
      })
    }
    
    if (type === 'row') {
      const delta = e.pageY - coords.bottom
      value = coords.height + delta
      $resizer.css({
        bottom: -delta + 'px'
      })
    }
  }
  
  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
    
    if (type === 'col') {
      $parent.$el.style.width = value + 'px'
      cells.forEach(el => el.style.width = value + 'px')
    }
    
    if (type === 'row') {
      $parent.css({height: value + 'px'})
      cells.forEach(el => el.style.height = value + 'px')
    }
    
    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0
    })
  }
}