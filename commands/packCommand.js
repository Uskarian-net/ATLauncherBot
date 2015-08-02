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
var functions = require('../inc/functions');
var atlauncherApi = require('atlauncher-api')();

module.exports.enabled = true;

module.exports.name = 'pack';

module.exports.flood_check = 30;

module.exports.callback = function (command_name, channel, user, message, object) {
    var parts = functions.getMessageParts(message, 2);

    if (parts.length == 2) {
        atlauncherApi.pack(parts[1].replace(/[^a-z0-9]+/gi, ""), function (err, pack) {
            if (err) {
                console.error(err);
                connection.client.replyToMessage(user, channel, err.message);
            } else {
                var timeAgo = functions.secondsToString(Math.floor(new Date().getTime() / 1000) - pack.versions[0].published);
                connection.client.replyToMessage(user, channel, pack.name + " is currently version " + pack.versions[0].version + " for Minecraft " + pack.versions[0].minecraft + " and was released " + timeAgo + " ago!");
            }
        });
    }
};