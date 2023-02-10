import Cropper from './src/component/cropper.vue'

const install = (app) => {
    app.component('cropper', Cropper)
}

export default Cropper

export {
    install
}