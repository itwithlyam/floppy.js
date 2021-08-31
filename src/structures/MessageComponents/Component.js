'use strict';

class Component {
    constructor(data) {
        switch (data.type) {
            case 1:
                this.components = data.components
                this.options = []
                this.type = 1
                break;
            case 2:
                this.custom_id = data.custom_id
                this.disabled = data.disabled
                this.style = data.style
                this.label = data.label
                this.emoji = data.emoji
                this.url = data.url
                this.options = []
                this.type = 2
                break;
            case 3:
                this.custom_id = data.custom_id
                this.disabled = data.disabled
                this.options = data.options
                this.placeholder = data.placeholder
                this.min_values = data.min_values
                this.max_values = data.max_values
                this.type = 3
                break;
        }     
        console.log(this)   
    }
}

module.exports = {Component}