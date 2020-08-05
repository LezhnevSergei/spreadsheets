import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {shouldResize} from '@/components/table/table.functions';

export class Table extends ExcelComponent {
  static className = 'excel__table'
  
  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'mouseup', 'mousemove']
    });
  }
  
  toHTML() {
    return createTable()
  }
  
  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this, event)
    }
  }
  
  onMouseup(event) {
    if (event.target.dataset.resize) {
      console.log('Start resizing', event.target);
    }
  }
}