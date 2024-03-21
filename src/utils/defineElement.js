import { defineCustomElement, h, createApp, getCurrentInstance } from 'vue'

export const defineCustomElementWrapped = (component, { plugins = [] } = {}) =>
  defineCustomElement({
    styles: component.styles, // <- this
    render: () => h(component),
    setup() {
      const app = createApp()

      // install plugins
      plugins.forEach(app.use)

      const inst = getCurrentInstance()
      Object.assign(inst.appContext, app._context)
      Object.assign(inst.provides, app._context.provides)
    }
  })
