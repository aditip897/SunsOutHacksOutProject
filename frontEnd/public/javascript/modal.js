class BulmaModal {
    constructor(selector) {
        this.elem = document.querySelector(selector)
        this.close_data()
    }

    show() {
        this.elem.classList.toggle('is-active')
        this.on_show()
    }

    close() {
        this.elem.classList.toggle('is-active')
        this.on_close()
    }

    close_data() {
        var modalClose = this.elem.querySelectorAll("[data-bulma-modal='close'], .modal-background")
        var that = this
        modalClose.forEach(function (e) {
            e.addEventListener("click", function () {

                that.elem.classList.toggle('is-active')

                var event = new Event('modal:close')

                that.elem.dispatchEvent(event);
            })
        })
    }

    on_show() {
        var event = new Event('modal:show')

        this.elem.dispatchEvent(event);
    }

    on_close() {
        var event = new Event('modal:close')

        this.elem.dispatchEvent(event);
    }

    addEventListener(event, callback) {
        this.elem.addEventListener(event, callback)
    }
}
var mTitle = document.querySelector("#modalTitle");
var btn = document.querySelector("#addBtn");
var saveBtn = document.querySelector("#saveBtn");
var cnclBtn = document.querySelector("#cancelBtn")
var mdl = new BulmaModal("#detailsModal")

btn.addEventListener("click", function () {
    var d = new Date();
    mTitle.innerHTML = d.toDateString();
    console.log('hello world')
    mdl.show()
})

cnclBtn.addEventListener("click", function () {
    mdl.close();
    clearTxtbx()
})

mdl.addEventListener('modal:show', function () {
    console.log("opened")
})

mdl.addEventListener("modal:close", function () {
    console.log("closed")
})