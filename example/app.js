capivara.controller(document.body, function(){
  const $ctrl = this;
    
  $ctrl.getClass = () => {
    return {
      ['my-class']: true
    }
  }

  $ctrl.getStyle = () => {
    return {
      ['color']: 'red'
    }
  }

  $ctrl.$onInit = () => {
    // console.log(this);
  }
})