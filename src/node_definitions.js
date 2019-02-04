const nodes = [
    // TRIGGERS
    {
        group: 'TRIGGERS',
        type: 'timer',
        inputs: [],
        outputs: [1],
        config: [{
            name: 'timer',
            type: 'select',
            values: [1, 2, 3, 4, 5, 6, 7, 8],
        }],
        indent: true,
        toString: function () { return `timer ${this.config[0].value}`; },
        toDsl: function () { return [`on Rules#Timer=${this.config[0].value} do\n%%output%%\nEndon\n`]; }
    }, {
        group: 'TRIGGERS',
        type: 'event',
        inputs: [],
        outputs: [1],
        config: [{
            name: 'name',
            type: 'text',
        }],
        indent: true,
        toString: function () { return `event ${this.config[0].value}`; },
        toDsl: function () { return [`on ${this.config[0].value} do\n%%output%%\nEndon\n`]; }
    }, {
        group: 'TRIGGERS',
        type: 'clock',
        inputs: [],
        outputs: [1],
        config: [],
        indent: true,
        toString: () => { return 'clock'; },
        toDsl: () => { return ['on Clock#Time do\n%%output%%\nEndon\n']; }
    }, {
        group: 'TRIGGERS',
        type: 'system boot',
        inputs: [],
        outputs: [1],
        config: [],
        indent: true,
        toString: function() {
            return `on boot`;
        },
        toDsl: function() {
            return [`On System#Boot do\n%%output%%\nEndon\n`];
        }
    }, {
        group: 'TRIGGERS',
        type: 'Device',
        inputs: [],
        outputs: [1],
        config: [],
        indent: true,
        toString: function() {
            return `on boot`;
        },
        toDsl: function() {
            return [`On Device#Value do\n%%output%%\nEndon\n`];
        }
    }, 
    // LOGIC
    {
        group: 'LOGIC',
        type: 'if/else',
        inputs: [1],
        outputs: [1, 2],
        config: [{
            name: 'variable',
            type: 'select',
            values: ['TEMP#Output', 'SW1#Switch']
        },{
            name: 'equality',
            type: 'select',
            values: ['=', '<', '>']
        },{
            name: 'value',
            type: 'number',
            values: [0, 1]
        }],
        indent: true,
        toString: function() {
            return `IF ${this.config[0].value}${this.config[1].value}${this.config[2].value}`;
        },
        toDsl: function() {
            return [`If [${this.config[0].value}]${this.config[1].value}${this.config[2].value}\n%%output%%\n`, `Else\n%%output%%\nEndif\n`];
        }
    }, {
        group: 'LOGIC',
        type: 'delay',
        inputs: [1],
        outputs: [1],
        config: [{
            name: 'delay',
            type: 'number',
        }],
        toString: function() {
            return `delay: ${this.config[0].value}`;
        },
        toDsl: function() {
            return [`Delay ${this.config[0].value}\n`];
        }
    },
    // ACTIONS
    {
        group: 'ACTIONS',
        type: 'GPIO',
        inputs: [1],
        outputs: [1],
        config: [{
            name: 'gpio',
            type: 'select',
            values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        }, {
            name: 'value',
            type: 'select',
            values: [0, 1],
        }],
        toString: function() {
            return `GPIO ${this.config[0].value}, ${this.config[1].value}`;
        },
        toDsl: function() {
            return [`GPIO,${this.config[0].value},${this.config[1].value}\n`];
        }
    }, {
        group: 'ACTIONS',
        type: 'fire event',
        inputs: [1],
        outputs: [1],
        config: [{
            name: 'name',
            type: 'text'
        }],
        toString: function() {
            return `event ${this.config[0].value}`;
        },
        toDsl: function() {
            return [`event,${this.config[0].value}\n`];
        }
    }, {
        group: 'ACTIONS',
        type: 'settimer',
        inputs: [1],
        outputs: [1],
        config: [{
            name: 'gpio',
            type: 'select',
            values: [1, 2, 3, 4, 5, 6, 7, 8],
        }, {
            name: 'value',
            type: 'number'
        }],
        toString: function() {
            return `timer${this.config[0].value} = ${this.config[1].value}`;
        },
        toDsl: function() {
            return [`timerSet,${this.config[0].value},${this.config[1].value}\n`];
        }
    }, {
        group: 'ACTIONS',
        type: 'MQTT',
        inputs: [1],
        outputs: [1],
        config: [],
        toString: function() {
            return 'mqtt';
        }
    }
]