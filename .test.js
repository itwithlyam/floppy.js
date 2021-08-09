const Floppy = require("./index.js")
const expect  = require("chai").expect;
const mocha = require("mocha")
console.log("Loading...... wooooooh")

mocha.describe("Floppy.JS Discord API Wrapper", function() {
    mocha.describe("Login", function() {
        mocha.it("login and start the bot", function() {
            const yum = new Floppy.Client("Nzg5MTM0NjAyNTc2NDYxODU1.X9to3g.zGG4Axs5iAQEUwj4llrz3KUakgs")
            yum.start()
        })
    })
})