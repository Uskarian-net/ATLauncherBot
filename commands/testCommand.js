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
var irc = require('irc');

module.exports.enabled = true;

module.exports.name = 'test';

module.exports.flood_check = 5;

module.exports.callback = function (command_name, channel, user, message, object) {
    connection.client.replyToMessage(user, channel, irc.colors.wrap('light_red', 'Testing!'));
};