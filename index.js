import Cropper from './src/component/cropper.vue'

const install = (app) => {
    app.component('cropper', Cropper)
}

Cropper.install = install

export default Cropper
export {
    Cropper
}