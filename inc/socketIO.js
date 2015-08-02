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

var connection = require('./connection');
var io = require('socket.io')();

module.exports.startListening = function () {
    io.listen(connection.config.socketio_port);

    io.on('connection', function (socket) {
        socket.on('modUpdated', function (data) {
            connection.client.sendMessage(connection.config.channel_for_socket_messages, '[' + data.minecraft_version + '] New file for mod "' + data.mod_name + '" uploaded named "' + data.name + '" (' + data.type + ')');
        });
    });
};

module.exports.stopListening = function () {
    if (typeof io == 'undefined') {
        return console.error(new Error('Cannot stop SocketIO server as it\'s not running'));
    }

    io.close();
};