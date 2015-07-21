/*
 * AllmightyBot - https://github.com/ATLauncher/AllmightyBot
 * Copyright (C) 2015 ATLauncher
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

// Load in the .env file
var config = require('./config.json');

// The IRC library
var irc = require('irc');
var commandManager = require('./inc/commandManager.js');

var client = new irc.Client(config.server, config.username, {
    channels: ['#ATLauncher-Test'],
    userName: config.username,
    realName: config.username,
    showErrors: true,
    autoRejoin: true,
    autoConnect: true
});

client.addListener('message#', function (from, to, message) {
    if (message[0] == '!') {
        commandManager.act({
            username: from,
            channel: to,
            message: message
        });
    }
    console.log(from + ' => ' + to + ': ' + message);
});

client.addListener('registered', function () {
    client.send("/msg nickserv identify " + config.nickserv_password);
});

client.addListener('raw', function (message) {
    console.log(message);
});

client.addListener('error', function (message) {
    console.log('error: ', message);
});