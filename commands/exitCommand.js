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

var connection = require('../inc/connection');
var exitHandler = require('../inc/exitHandler');

module.exports.enabled = true;

module.exports.name = 'exit';

module.exports.callback = function (command_name, channel, user, message, object) {
    //if (!connection.isBroadcaster(user)) {
    //    return console.error(new Error('The start command can only be run by the broadcaster!'));
    //}

    connection.client.sendMessageToAll('I\'m leaving now! Goodbye!');

    exitHandler();
};