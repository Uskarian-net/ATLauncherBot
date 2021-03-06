/*
 * ATLauncherBot - https://github.com/ATLauncher/ATLauncherBot
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

'use strict';

var format = require('string-format');
format.extend(String.prototype);

var irc = require('irc');
var _ = require('lodash');

var commands = require('./commands');
var listeners = require('./listeners');
var socketIO = require('./socketIO');

var connected = false;

// Load in the config file
var config = require('../config.json');

var client = new irc.Client(config.server, config.username, {
    channels: config.channels_to_join,
    userName: config.username,
    realName: config.username,
    showErrors: true,
    autoRejoin: true,
    autoConnect: false
});

module.exports.config = config;
module.exports.client = client;

module.exports.client.replyToMessage = function (user, channel, message) {
    client.say(channel, user + ": " + message);
};

module.exports.client.sendMessage = function (channel, message) {
    client.say(channel, message);
};

module.exports.client.sendMessageToAll = function (message) {
    _.forEach(config.channels_to_join, function (channel) {
        client.say(channel, message);
    });
};

module.exports.load = function () {
    console.log('Loading all the commands!');
    commands.loadCommands();
    console.log('Finished loading all the commands!');

    console.log('Loading all the listeners!');
    listeners.loadListeners();
    console.log('Finished loading all the listeners!');
};

module.exports.reloadCommands = function (callback) {
    commands.unload(function () {
        commands.loadCommands();
        callback();
    });
};

module.exports.connect = function () {
    if (connected) {
        return console.error(new Error('Cannot connect again as we\'re already connected!'));
    }

    this.load();

    socketIO.startListening();

    client.connect(function () {
        console.log("Connected!");
        connected = true;
    });
};

module.exports.disconnect = function (callback) {
    if (typeof client == 'undefined' || !connected) {
        console.error(new Error('Cannot disconnect as we\'re not connected!'));
        callback();
    }

    socketIO.stopListening();

    client.disconnect(function () {
        console.log("Disconnected!");
        connected = false;
        callback();
    });
};