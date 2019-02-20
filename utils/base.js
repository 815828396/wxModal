
function getComponent (selector) {
  const pages = getCurrentPages();
  const selec = pages[pages.length - 1];

  const component = selec.selectComponent(selector)

  if (!component) {
    throw new Error ('未获取到默认Message组件, id = message');
  }

  return component
}

function Toast (options) {
  const { selector = "$toast" } = options;

  const component = getComponent(selector);
  component.show();
}

function Message (options) {
  const { selector = '#message' } = options;

  const _component = getComponent(selector);
  _component.show(options)
}

module.exports = {
  $Message: Message,
  $Toast: Toast
}
